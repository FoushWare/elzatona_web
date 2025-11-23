// Comprehensive script to fix ALL malformed HTML patterns in questions
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kiycimlsatwfqxtfprlr.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// Comprehensive cleaning function
function cleanText(text) {
  if (!text || typeof text !== 'string') return text || '';
  
  let cleaned = text;
  
  // Fix ALL malformed HTML tag patterns (most specific first)
  cleaned = cleaned.replace(/<pr<codee<cod/gi, '<pre><code>');
  cleaned = cleaned.replace(/<pr<code<cod/gi, '<pre><code>');
  cleaned = cleaned.replace(/<pr<codee/gi, '<pre><code>');
  cleaned = cleaned.replace(/<pr<code/gi, '<pre><code>');
  cleaned = cleaned.replace(/<pr<cod/gi, '<pre><code>');
  cleaned = cleaned.replace(/<\/pree/gi, '</pre>');
  cleaned = cleaned.replace(/<\/codee/gi, '</code>');
  cleaned = cleaned.replace(/e<\/pr/gi, '</pre>');
  cleaned = cleaned.replace(/e<\/code/gi, '</code>');
  cleaned = cleaned.replace(/<\/pr/gi, '</pre>');
  cleaned = cleaned.replace(/<\/code>e>e/gi, '</code></pre>');
  cleaned = cleaned.replace(/<\/code>e>/gi, '</code></pre>');
  cleaned = cleaned.replace(/<\/pre>e>e/gi, '</pre>');
  cleaned = cleaned.replace(/<\/pre>e>/gi, '</pre>');
  
  // Fix ALL malformed code tags merged with words (comprehensive list)
  const codeTagPatterns = [
    ['<codclass', 'class'],
    ['<codthis\\.newColorwColor', 'this.newColor'],
    ['<codthis\\.', 'this.'],
    ['<codnew', 'new'],
    ['<codTypeError', 'TypeError'],
    ['<codexport', 'export'],
    ['</cod defaultefault', ' default'],
    ['<codeexport', 'export'],
    ['<codconst', 'const'],
    ['<codimport', 'import'],
    ['<codfunction', 'function'],
    ['<codif', 'if'],
    ['<codeelse', 'else'],
    ['<codelse', 'else'],
    ['<codreturn', 'return'],
    ['<codas', 'as'],
    ['<codfrom', 'from'],
    ['<codvar', 'var'],
    ['<codlet', 'let'],
    ['<codfor', 'for'],
    ['<codwhile', 'while'],
    ['<codasync', 'async'],
    ['<codawait', 'await'],
    ['<codof', 'of'],
    ['<codin', 'in'],
    ['<codobject', 'object'],
    ['<codMath', 'Math'],
    ['<codconsole', 'console'],
    ['<codsetTimeout', 'setTimeout'],
    ['<codsetInterval', 'setInterval'],
    ['<codesetInterval', 'setInterval'],
    ['<codPromise', 'Promise'],
    ['<codArray', 'Array'],
    ['<codString', 'String'],
    ['<codNumber', 'Number'],
    ['<codBoolean', 'Boolean'],
    ['<codundefined', 'undefined'],
    ['<codnull', 'null'],
    ['<codtrue', 'true'],
    ['<codfalse', 'false'],
    ['<codApp', 'App'],
    ['<codUserInfo', 'UserInfo'],
    ['<codChatList', 'ChatList'],
    ['<codChatInput', 'ChatInput'],
    ['<codEmojiPicker', 'EmojiPicker'],
    ['<codComponent', 'Component'],
    ['<codLogProps', 'LogProps'],
    ['<codforwardRef', 'forwardRef'],
    ['<codPropTypes', 'PropTypes'],
    ['<codDog', 'Dog'],
    ['<codanimalFunctionality', 'animalFunctionality'],
    ['<coddogFunctionality', 'dogFunctionality'],
    ['<codbark', 'bark'],
    ['<codwalk', 'walk'],
    ['<codcheckAge', 'checkAge'],
    ['<cod[id]', '[id]'],
    ['<cod/posts', '/posts'],
    ['<cod/users', '/users'],
    ['</cod', ''],
  ];
  
  for (const [pattern, replacement] of codeTagPatterns) {
    cleaned = cleaned.replace(new RegExp(pattern, 'gi'), replacement);
  }
  
  // Fix other malformed patterns
  cleaned = cleaned.replace(/NaNe>NaN/g, 'NaN');
  cleaned = cleaned.replace(/NaNe>/g, 'NaN');
  cleaned = cleaned.replace(/NaN>/g, 'NaN');
  cleaned = cleaned.replace(/diameterameter/g, 'diameter');
  cleaned = cleaned.replace(/perimeterimeter/g, 'perimeter');
  cleaned = cleaned.replace(/consoleonsole\.log/g, 'console.log');
  cleaned = cleaned.replace(/console\.loge>/g, 'console.log');
  cleaned = cleaned.replace(/console\.log>/g, 'console.log');
  cleaned = cleaned.replace(/console\.loge\.log/g, 'console.log');
  cleaned = cleaned.replace(/console\.log\.log/g, 'console.log');
  cleaned = cleaned.replace(/newColorwColor/g, 'newColor');
  
  // Fix e> artifact pattern
  cleaned = cleaned.replace(/(\w+)e>/g, '$1');
  
  // Fix common word duplications
  cleaned = cleaned.replace(/thisthis/g, 'this');
  cleaned = cleaned.replace(/windowindow/g, 'window');
  cleaned = cleaned.replace(/undefinede>ined/g, 'undefined');
  cleaned = cleaned.replace(/Math<\/code>\.PIe>\.PI/g, 'Math.PI');
  cleaned = cleaned.replace(/Math\.PIe>/g, 'Math.PI');
  
  // Decode HTML entities
  cleaned = cleaned.replace(/&lt;/g, '<');
  cleaned = cleaned.replace(/&gt;/g, '>');
  cleaned = cleaned.replace(/&amp;/g, '&');
  cleaned = cleaned.replace(/&quot;/g, '"');
  cleaned = cleaned.replace(/&#39;/g, "'");
  cleaned = cleaned.replace(/&apos;/g, "'");
  cleaned = cleaned.replace(/&nbsp;/g, ' ');
  
  // Fix general patterns
  cleaned = cleaned.replace(/(\w+)e>(\w+)/g, '$1$2');
  cleaned = cleaned.replace(/(\w+)>(\w+)/g, '$1 $2');
  cleaned = cleaned.replace(/(\w+)>/g, '$1');
  
  return cleaned.trim();
}

// Clean options JSONB
function cleanOptions(options) {
  if (!options || !Array.isArray(options)) return options;
  
  return options.map(opt => {
    if (typeof opt === 'string') {
      return cleanText(opt);
    } else if (opt && typeof opt === 'object' && opt.text) {
      return {
        ...opt,
        text: cleanText(opt.text),
      };
    }
    return opt;
  });
}

async function fixAllQuestions() {
  console.log('🔍 Fetching all questions...');
  
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, content, options, correct_answer, explanation, hints');
  
  if (error) {
    console.error('❌ Error fetching questions:', error);
    return;
  }
  
  console.log(`📝 Found ${questions.length} questions to process`);
  
  let fixed = 0;
  let errors = 0;
  
  for (const question of questions) {
    try {
      const updates = {};
      let hasChanges = false;
      
      // Clean content
      if (question.content) {
        const cleaned = cleanText(question.content);
        if (cleaned !== question.content) {
          updates.content = cleaned;
          hasChanges = true;
        }
      }
      
      // Clean options
      if (question.options) {
        const cleaned = cleanOptions(question.options);
        if (JSON.stringify(cleaned) !== JSON.stringify(question.options)) {
          updates.options = cleaned;
          hasChanges = true;
        }
      }
      
      // Clean correct_answer
      if (question.correct_answer) {
        const cleaned = cleanText(question.correct_answer);
        if (cleaned !== question.correct_answer) {
          updates.correct_answer = cleaned;
          hasChanges = true;
        }
      }
      
      // Clean explanation
      if (question.explanation) {
        const cleaned = cleanText(question.explanation);
        if (cleaned !== question.explanation) {
          updates.explanation = cleaned;
          hasChanges = true;
        }
      }
      
      // Clean hints
      if (question.hints && Array.isArray(question.hints)) {
        const cleaned = question.hints.map(hint => cleanText(hint));
        if (JSON.stringify(cleaned) !== JSON.stringify(question.hints)) {
          updates.hints = cleaned;
          hasChanges = true;
        }
      }
      
      if (hasChanges) {
        updates.updated_at = new Date().toISOString();
        
        const { error: updateError } = await supabase
          .from('questions')
          .update(updates)
          .eq('id', question.id);
        
        if (updateError) {
          console.error(`❌ Error updating question ${question.id}:`, updateError);
          errors++;
        } else {
          fixed++;
          if (fixed % 100 === 0) {
            console.log(`✅ Fixed ${fixed} questions...`);
          }
        }
      }
    } catch (err) {
      console.error(`❌ Error processing question ${question.id}:`, err);
      errors++;
    }
  }
  
  console.log(`\n✅ Complete! Fixed ${fixed} questions, ${errors} errors`);
}

fixAllQuestions().catch(console.error);



