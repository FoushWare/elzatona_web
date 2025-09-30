#!/usr/bin/env node

/**
 * Script to populate the sectors collection from existing question data
 * This will create sectors for each learning path based on the current sector distribution
 */

const BASE_URL = 'http://localhost:3001';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function createSector(sectorData) {
  try {
    const response = await fetch(`${BASE_URL}/api/sectors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sectorData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error creating sector:`, error.message);
    return null;
  }
}

async function addQuestionsToSector(sectorId, questionIds) {
  try {
    const response = await fetch(`${BASE_URL}/api/sectors/${sectorId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ questionIds }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error adding questions to sector:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting sector population process...');

  // 1. Fetch all learning paths
  console.log('📚 Fetching learning paths...');
  const learningPathsData = await fetchData(`${BASE_URL}/api/questions/learning-paths`);
  if (!learningPathsData?.success) {
    console.error('❌ Failed to fetch learning paths');
    return;
  }

  const learningPaths = learningPathsData.data;
  console.log(`✅ Found ${learningPaths.length} learning paths`);

  // 2. For each learning path, fetch questions and group by sector
  for (const learningPath of learningPaths) {
    console.log(`\n🔄 Processing learning path: ${learningPath.id}`);

    // Fetch questions for this learning path
    const questionsData = await fetchData(
      `${BASE_URL}/api/questions/unified?learningPath=${learningPath.id}&isActive=true`
    );

    if (!questionsData?.success || !questionsData.data) {
      console.log(`⚠️  No questions found for ${learningPath.id}`);
      continue;
    }

    const questions = questionsData.data;
    console.log(`📝 Found ${questions.length} questions for ${learningPath.id}`);

    // Group questions by sector
    const sectorGroups = {};
    questions.forEach((question) => {
      const sectorName = question.sector || 'General';
      if (!sectorGroups[sectorName]) {
        sectorGroups[sectorName] = [];
      }
      sectorGroups[sectorName].push(question.id);
    });

    console.log(`📊 Found ${Object.keys(sectorGroups).length} sectors in ${learningPath.id}`);

    // 3. Create sectors and add questions
    let sectorOrder = 1;
    for (const [sectorName, questionIds] of Object.entries(sectorGroups)) {
      console.log(`  📦 Creating sector: ${sectorName} (${questionIds.length} questions)`);

      const sectorData = {
        name: sectorName,
        description: `${sectorName} concepts for ${learningPath.title}`,
        learningPathId: learningPath.id,
        order: sectorOrder++,
        difficulty: 'intermediate',
        estimatedTime: Math.ceil(questionIds.length * 2), // 2 minutes per question
        prerequisites: [],
      };

      const createResult = await createSector(sectorData);
      if (!createResult?.success) {
        console.error(`❌ Failed to create sector ${sectorName} for ${learningPath.id}`);
        continue;
      }

      const sectorId = createResult.data.sectorId;
      console.log(`  ✅ Created sector ${sectorName} with ID: ${sectorId}`);

      // Add questions to the sector
      const addQuestionsResult = await addQuestionsToSector(sectorId, questionIds);
      if (!addQuestionsResult?.success) {
        console.error(`❌ Failed to add questions to sector ${sectorName}`);
        continue;
      }

      console.log(`  ✅ Added ${questionIds.length} questions to sector ${sectorName}`);
    }
  }

  console.log('\n🎉 Sector population completed!');
}

// Run the script
main().catch(console.error);
