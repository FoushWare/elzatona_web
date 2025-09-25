#!/usr/bin/env node

/**
 * Script to clean up duplicate and empty sectors
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

async function deleteSector(sectorId) {
  try {
    const response = await fetch(`${BASE_URL}/api/sectors/${sectorId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error deleting sector ${sectorId}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🧹 Starting sector cleanup process...');

  // 1. Fetch all learning paths
  console.log('📚 Fetching learning paths...');
  const learningPathsData = await fetchData(`${BASE_URL}/api/questions/learning-paths`);
  if (!learningPathsData?.success) {
    console.error('❌ Failed to fetch learning paths');
    return;
  }

  const learningPaths = learningPathsData.data;
  console.log(`✅ Found ${learningPaths.length} learning paths`);

  // 2. For each learning path, clean up sectors
  for (const learningPath of learningPaths) {
    console.log(`\n🔄 Cleaning up sectors for: ${learningPath.id}`);

    // Fetch sectors for this learning path
    const sectorsData = await fetchData(
      `${BASE_URL}/api/sectors?learningPathId=${learningPath.id}`
    );

    if (!sectorsData?.success || !sectorsData.data) {
      console.log(`⚠️  No sectors found for ${learningPath.id}`);
      continue;
    }

    const sectors = sectorsData.data;
    console.log(`📝 Found ${sectors.length} sectors for ${learningPath.id}`);

    // Group sectors by name
    const sectorGroups = {};
    sectors.forEach((sector) => {
      const sectorName = sector.name;
      if (!sectorGroups[sectorName]) {
        sectorGroups[sectorName] = [];
      }
      sectorGroups[sectorName].push(sector);
    });

    // For each sector name, keep the one with questions and delete empty ones
    for (const [sectorName, sectorList] of Object.entries(sectorGroups)) {
      if (sectorList.length <= 1) {
        console.log(`  ✅ Sector ${sectorName} has no duplicates`);
        continue;
      }

      console.log(`  🔍 Found ${sectorList.length} sectors named ${sectorName}`);

      // Find the sector with questions
      const sectorWithQuestions = sectorList.find(s => s.totalQuestions > 0);
      const emptySectors = sectorList.filter(s => s.totalQuestions === 0);

      if (sectorWithQuestions) {
        console.log(`  ✅ Keeping sector ${sectorName} with ${sectorWithQuestions.totalQuestions} questions`);
        
        // Delete empty sectors
        for (const emptySector of emptySectors) {
          console.log(`  🗑️  Deleting empty sector ${emptySector.id}`);
          const deleteResult = await deleteSector(emptySector.id);
          if (deleteResult?.success) {
            console.log(`  ✅ Deleted empty sector ${emptySector.id}`);
          } else {
            console.log(`  ❌ Failed to delete empty sector ${emptySector.id}`);
          }
        }
      } else {
        // All sectors are empty, keep the first one and delete the rest
        console.log(`  ⚠️  All sectors named ${sectorName} are empty, keeping the first one`);
        const sectorsToDelete = sectorList.slice(1);
        
        for (const sectorToDelete of sectorsToDelete) {
          console.log(`  🗑️  Deleting duplicate empty sector ${sectorToDelete.id}`);
          const deleteResult = await deleteSector(sectorToDelete.id);
          if (deleteResult?.success) {
            console.log(`  ✅ Deleted duplicate empty sector ${sectorToDelete.id}`);
          } else {
            console.log(`  ❌ Failed to delete duplicate empty sector ${sectorToDelete.id}`);
          }
        }
      }
    }
  }

  console.log('\n🎉 Sector cleanup completed!');
}

// Run the script
main().catch(console.error);
