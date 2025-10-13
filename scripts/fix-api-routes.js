#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Find all API route files with dynamic parameters
function findApiRoutes(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Check if it's a dynamic route (contains [])
      if (item.includes('[') && item.includes(']')) {
        const routeFile = path.join(fullPath, 'route.ts');
        if (fs.existsSync(routeFile)) {
          files.push(routeFile);
        }
      }
      // Recursively search subdirectories
      files.push(...findApiRoutes(fullPath));
    }
  }
  
  return files;
}

// Update API route files to use Next.js 15 parameter structure
function updateApiRoute(filePath) {
  console.log(`Updating ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace parameter destructuring patterns
  const patterns = [
    // Function parameters
    {
      from: /{ params }: { params: { ([^}]+): string } }/g,
      to: '{ params }: { params: Promise<{ $1: string }> }'
    },
    // Parameter usage
    {
      from: /const { ([^}]+) } = params;/g,
      to: 'const { $1 } = await params;'
    }
  ];
  
  let updated = false;
  for (const pattern of patterns) {
    const newContent = content.replace(pattern.from, pattern.to);
    if (newContent !== content) {
      content = newContent;
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.log(`⏭️  No changes needed for ${filePath}`);
  }
}

// Main execution
const apiDir = path.join(__dirname, '..', 'src', 'app', 'api');
const apiRouteFiles = findApiRoutes(apiDir);

console.log(`Found ${apiRouteFiles.length} API route files to check:`);
apiRouteFiles.forEach(file => console.log(`  - ${file}`));

apiRouteFiles.forEach(updateApiRoute);

console.log('\n🎉 API route update complete!');
