const fetch = require('node-fetch');

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

async function removeSoftSkillsData() {
  try {
    console.log('🧹 Removing Soft Skills & Interview Prep data...');
    
    // First, get all topics in the Soft Skills category
    const topicsResponse = await fetch(`${BASE_URL}/api/topics`);
    const topicsData = await topicsResponse.json();
    
    if (topicsData.success) {
      const softSkillsTopics = topicsData.data.filter(topic => 
        topic.category === 'Soft Skills & Interview Prep'
      );
      
      console.log(`Found ${softSkillsTopics.length} soft skills topics to delete:`);
      for (const topic of softSkillsTopics) {
        console.log(`- ${topic.name}`);
      }
      
      // Delete soft skills topics
      for (const topic of softSkillsTopics) {
        const response = await fetch(`${BASE_URL}/api/topics/${topic.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          console.log(`✅ Deleted topic: ${topic.name}`);
        } else {
          console.error(`❌ Failed to delete topic: ${topic.name}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // Get all sections in the Soft Skills category
    const sectionsResponse = await fetch(`${BASE_URL}/api/admin/sections`);
    const sectionsData = await sectionsResponse.json();
    
    if (sectionsData.success) {
      const softSkillsSections = sectionsData.data.filter(section => 
        section.category === 'Soft Skills & Interview Prep'
      );
      
      console.log(`\nFound ${softSkillsSections.length} soft skills sections to delete:`);
      for (const section of softSkillsSections) {
        console.log(`- ${section.name}`);
      }
      
      // Delete soft skills sections
      for (const section of softSkillsSections) {
        const response = await fetch(`${BASE_URL}/api/admin/sections`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionId: section.id }),
        });
        
        if (response.ok) {
          console.log(`✅ Deleted section: ${section.name}`);
        } else {
          console.error(`❌ Failed to delete section: ${section.name}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    // Finally, delete the Soft Skills category
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    
    if (categoriesData.success) {
      const softSkillsCategory = categoriesData.data.find(category => 
        category.name === 'Soft Skills & Interview Prep'
      );
      
      if (softSkillsCategory) {
        const response = await fetch(`${BASE_URL}/api/categories/${softSkillsCategory.id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          console.log(`\n✅ Deleted category: Soft Skills & Interview Prep`);
        } else {
          console.error(`❌ Failed to delete category: Soft Skills & Interview Prep`);
        }
      } else {
        console.log('⚠️  Soft Skills & Interview Prep category not found');
      }
    }
    
    console.log('\n🎉 Soft Skills & Interview Prep data removal completed!');
    
    // Verify the removal
    console.log('\n📊 Verifying removal...');
    
    const finalCategoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    const finalCategoriesData = await finalCategoriesResponse.json();
    console.log(`Categories remaining: ${finalCategoriesData.data.length}`);
    
    const finalTopicsResponse = await fetch(`${BASE_URL}/api/topics`);
    const finalTopicsData = await finalTopicsResponse.json();
    console.log(`Topics remaining: ${finalTopicsData.data.length}`);
    
    const finalSectionsResponse = await fetch(`${BASE_URL}/api/admin/sections`);
    const finalSectionsData = await finalSectionsResponse.json();
    console.log(`Sections remaining: ${finalSectionsData.data.length}`);
    
  } catch (error) {
    console.error('❌ Error removing soft skills data:', error);
    process.exit(1);
  }
}

// Run the script
removeSoftSkillsData().then(() => {
  console.log('✨ Script completed successfully!');
  process.exit(0);
});
