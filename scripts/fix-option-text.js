// Script to fix malformed option text in the database
// Run with: node scripts/fix-option-text.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kiycimlsatwfqxtfprlr.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY_HERE.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeWNpbWxzYXR3ZnF4dGZwcmxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMzc3ODQsImV4cCI6MjA3ODgxMzc4NH0.bDQhRHzNH09BE8w9qdRXjtl7bGdGO3JslrmkffhqXAc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Utility function to clean option text (same as in the codebase)
const cleanOptionText = (text) => {
  if (!text || typeof text !== 'string') return text || '';

  const decodeHtmlEntities = (text) => {
    if (!text) return '';
    const entityMap = {
      '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"',
      '&#39;': "'", '&#x27;': "'", '&#x2F;': '/', '&nbsp;': ' ',
      '&#160;': ' ', '&apos;': "'",
    };
    let decoded = text;
    for (const [entity, char] of Object.entries(entityMap)) {
      decoded = decoded.replace(new RegExp(entity, 'gi'), char);
    }
    decoded = decoded.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)));
    decoded = decoded.replace(/&#x([0-9a-fA-F]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    return decoded;
  };

  let cleaned = decodeHtmlEntities(text);
  cleaned = cleaned.replace(/<code[^>]*>([^<]+)<\/code>/gi, (_, codeContent) => {
    return `\`${decodeHtmlEntities(codeContent).trim()}\``;
  });
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  
  // First, handle the specific e> artifact pattern
  cleaned = cleaned.replace(/(\w+)e>/g, '$1');
  
  // Apply multiple passes
  for (let i = 0; i < 3; i++) {
    cleaned = cleaned
      .replace(/NaNe>NaN/gi, 'NaN')
      .replace(/NaNe>/gi, 'NaN')
      .replace(/NaN>/gi, 'NaN')
      .replace(/NaN\s*e>/gi, 'NaN')
      .replace(/NaN\s*>/gi, 'NaN')
      .replace(/diameterameter/g, 'diameter')
      .replace(/perimeterimeter/g, 'perimeter')
      .replace(/consoleonsole\.log/g, 'console.log')
      .replace(/console\.loge>/g, 'console.log')
      .replace(/console\.log>/g, 'console.log')
      .replace(/console\.loge\.log/g, 'console.log')
      .replace(/console\.log\.log/g, 'console.log')
      .replace(/([a-zA-Z]+)e>([a-zA-Z]+)/g, '$1$2')
      .replace(/([a-zA-Z]+)e>/g, '$1')
      .replace(/([a-zA-Z]+)>([a-zA-Z]+)/g, '$1 $2')
      .replace(/([a-zA-Z]+)>/g, '$1')
      .replace(/(\w+)\s*>\s*(\w+)/g, '$1 $2')
      .replace(/(\w+)\s*>/g, '$1');
  }
  
  cleaned = cleaned
    .replace(/\s+>\s+/g, ' ')
    .replace(/([a-zA-Z0-9])>\s*([a-zA-Z0-9])/g, '$1 $2')
    .trim();
  
  return cleaned;
};

async function fixOptions() {
  console.log('🔍 Fetching all questions with options...');
  
  // Fetch all questions
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, title, options')
    .not('options', 'is', null);
  
  if (error) {
    console.error('❌ Error fetching questions:', error);
    return;
  }
  
  console.log(`📊 Found ${questions.length} questions with options`);
  
  let updatedCount = 0;
  let fixedCount = 0;
  
  for (const question of questions) {
    if (!question.options) continue;
    
    let parsedOptions = question.options;
    
    // Parse if string
    if (typeof question.options === 'string') {
      try {
        parsedOptions = JSON.parse(question.options);
      } catch (e) {
        console.error(`⚠️ Failed to parse options for question ${question.id}:`, e);
        continue;
      }
    }
    
    if (!Array.isArray(parsedOptions)) continue;
    
    let needsUpdate = false;
    const cleanedOptions = parsedOptions.map((opt) => {
      if (typeof opt === 'string') {
        const cleaned = cleanOptionText(opt);
        if (cleaned !== opt) {
          needsUpdate = true;
          fixedCount++;
        }
        return cleaned;
      } else if (opt && typeof opt === 'object' && opt.text) {
        const cleanedText = cleanOptionText(opt.text);
        if (cleanedText !== opt.text) {
          needsUpdate = true;
          fixedCount++;
          return {
            ...opt,
            text: cleanedText,
          };
        }
        return opt;
      }
      return opt;
    });
    
    if (needsUpdate) {
      console.log(`🔧 Fixing question: ${question.id} - "${question.title}"`);
      console.log(`   Options fixed: ${fixedCount}`);
      
      const { error: updateError } = await supabase
        .from('questions')
        .update({ options: cleanedOptions })
        .eq('id', question.id);
      
      if (updateError) {
        console.error(`❌ Error updating question ${question.id}:`, updateError);
      } else {
        updatedCount++;
        console.log(`✅ Updated question ${question.id}`);
      }
    }
  }
  
  console.log(`\n✨ Done! Updated ${updatedCount} questions, fixed ${fixedCount} option texts`);
}

// Run the fix
fixOptions().catch(console.error);



