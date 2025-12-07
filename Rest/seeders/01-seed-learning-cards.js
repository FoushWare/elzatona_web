const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

/**
 * Seeder for Learning Cards
 * Updates existing cards or creates new ones based on type
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error(
    '   Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Learning Cards data based on the structure
const learningCards = [
  {
    title: 'Core Technologies',
    type: 'core-technologies',
    description: 'Fundamental web technologies: HTML, CSS, and JavaScript',
    icon: '💻',
    color: '#3498DB',
    order_index: 1,
  },
  {
    title: 'Framework Questions',
    type: 'framework-questions',
    description: 'React, Next.js, and Design Patterns',
    icon: '⚛️',
    color: '#61DAFB',
    order_index: 2,
  },
  {
    title: 'System Design',
    type: 'system-design',
    description:
      'System architecture, performance, rendering, and security patterns',
    icon: '🏗️',
    color: '#9B59B6',
    order_index: 3,
  },
  {
    title: 'Frontend Tasks',
    type: 'frontend-tasks',
    description: 'Practical frontend implementation tasks and challenges',
    icon: '🎯',
    color: '#E67E22',
    order_index: 4,
  },
  {
    title: 'Problem Solving',
    type: 'problem-solving',
    description:
      'Algorithm and data structure problems for frontend developers',
    icon: '🧩',
    color: '#1ABC9C',
    order_index: 5,
  },
];

async function seedLearningCards() {
  console.log('🔄 Seeding Learning Cards...\n');
  console.log(
    '⚠️  Note: If "frontend-tasks" type fails, you may need to update the schema constraint\n'
  );

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const card of learningCards) {
    try {
      // Check if card exists by type
      const { data: existing } = await supabase
        .from('learning_cards')
        .select('id, title, type')
        .eq('type', card.type)
        .maybeSingle();

      if (existing) {
        // Update existing card
        const { error } = await supabase
          .from('learning_cards')
          .update({
            title: card.title,
            description: card.description,
            icon: card.icon,
            color: card.color,
            order_index: card.order_index,
            updated_at: new Date().toISOString(),
          })
          .eq('type', card.type);

        if (error) throw error;
        console.log(`  ✅ Updated: ${card.title} (${card.type})`);
        updated++;
      } else {
        // Create new card
        const { error } = await supabase.from('learning_cards').insert({
          ...card,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (error) throw error;
        console.log(`  ✅ Created: ${card.title} (${card.type})`);
        created++;
      }
    } catch (error) {
      console.error(`  ❌ Error with ${card.title}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Created: ${created}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Errors: ${errors}`);
  console.log(`\n✅ Learning Cards seeding completed!\n`);
}

// Run seeder
seedLearningCards()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
