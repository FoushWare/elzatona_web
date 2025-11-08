#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const diagramsDir = path.join(__dirname, '..', 'docs', 'diagrams');
const outputDir = path.join(diagramsDir, 'images');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to extract Mermaid diagrams from markdown
function extractDiagrams(markdownFile) {
  const content = fs.readFileSync(markdownFile, 'utf8');
  const diagrams = [];
  const regex = /```mermaid\n([\s\S]*?)```/g;
  let match;
  let index = 0;

  while ((match = regex.exec(content)) !== null) {
    const diagramCode = match[1].trim();

    // Find the heading before this diagram (look backwards from match index)
    const beforeMatch = content.substring(0, match.index);
    // Find all headings and get the last one before this diagram
    const headingMatches = beforeMatch.matchAll(/^##+\s+(.+)$/gm);
    let lastHeading = null;
    for (const headingMatch of headingMatches) {
      lastHeading = headingMatch[1];
    }

    // Clean up the title
    const title = lastHeading
      ? lastHeading
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase()
      : `diagram-${index}`;

    diagrams.push({
      title: title || `diagram-${index}`,
      code: diagramCode,
      index: index++,
    });
  }

  return diagrams;
}

// Function to convert Mermaid to PNG
function convertToPNG(mmdFile, pngFile) {
  try {
    const mmdcPath = path.join(__dirname, '..', 'node_modules', '.bin', 'mmdc');
    execSync(
      `${mmdcPath} -i "${mmdFile}" -o "${pngFile}" -w 2400 -H 1800 -b transparent`,
      {
        stdio: 'inherit',
      }
    );
    return true;
  } catch (error) {
    console.error(`Error converting ${mmdFile}:`, error.message);
    return false;
  }
}

// Process all markdown files in diagrams directory
const markdownFiles = fs
  .readdirSync(diagramsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => path.join(diagramsDir, file));

console.log('📊 Generating diagram images...\n');

let totalDiagrams = 0;
let successCount = 0;

markdownFiles.forEach(mdFile => {
  const fileName = path.basename(mdFile, '.md');
  console.log(`Processing: ${fileName}`);

  const diagrams = extractDiagrams(mdFile);
  console.log(`  Found ${diagrams.length} diagram(s)`);

  diagrams.forEach((diagram, idx) => {
    totalDiagrams++;
    const mmdFile = path.join(
      outputDir,
      `${fileName}-${diagram.title}-${diagram.index}.mmd`
    );
    const pngFile = path.join(
      outputDir,
      `${fileName}-${diagram.title}-${diagram.index}.png`
    );

    // Write Mermaid file
    fs.writeFileSync(mmdFile, diagram.code);

    // Convert to PNG
    console.log(`  Converting: ${diagram.title}...`);
    if (convertToPNG(mmdFile, pngFile)) {
      successCount++;
      // Clean up .mmd file after successful conversion
      fs.unlinkSync(mmdFile);
      console.log(`  ✅ Created: ${path.basename(pngFile)}`);
    } else {
      console.log(`  ❌ Failed: ${diagram.title}`);
    }
  });

  console.log('');
});

console.log(`\n📈 Summary:`);
console.log(`   Total diagrams: ${totalDiagrams}`);
console.log(`   Successfully converted: ${successCount}`);
console.log(`   Failed: ${totalDiagrams - successCount}`);
console.log(`\n📁 Images saved to: ${outputDir}`);
