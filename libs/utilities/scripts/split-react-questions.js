const fs = require("fs");
const path = require("path");

const REACT_QUESTIONS_FILE = path.join(__dirname, "../../../apps/website/lib/reactQuestions.ts");
const QUESTIONS_DIR = path.join(__dirname, "../../../apps/website/lib/questions");

/**
 * Split reactQuestions.ts into smaller files
 * Each file will contain ~50 questions
 */
function splitReactQuestions() {
  console.log("📦 Splitting reactQuestions.ts into smaller files...\n");
  
  const content = fs.readFileSync(REACT_QUESTIONS_FILE, "utf8");
  
  // Extract the interface
  const interfaceMatch = content.match(/export interface ReactQuestion[\s\S]*?^}/m);
  const interfaceCode = interfaceMatch ? interfaceMatch[0] : "";
  
  // Extract the array
  const arrayMatch = content.match(/export const reactQuestions: ReactQuestion\[\] = \[([\s\S]*)\];/);
  if (!arrayMatch) {
    console.error("❌ Could not find reactQuestions array");
    return;
  }
  
  const arrayContent = arrayMatch[1];
  
  // Split by question objects (each starts with { id:)
  const questionMatches = arrayContent.match(/\{\s*id:\s*\d+,[\s\S]*?(?=\{\s*id:\s*\d+|$)/g);
  
  if (!questionMatches || questionMatches.length === 0) {
    console.error("❌ Could not parse questions");
    return;
  }
  
  console.log(`Found ${questionMatches.length} questions\n`);
  
  // Create questions directory
  if (!fs.existsSync(QUESTIONS_DIR)) {
    fs.mkdirSync(QUESTIONS_DIR, { recursive: true });
  }
  
  // Split into chunks of 50
  const chunkSize = 50;
  const chunks = [];
  for (let i = 0; i < questionMatches.length; i += chunkSize) {
    chunks.push(questionMatches.slice(i, i + chunkSize));
  }
  
  console.log(`Splitting into ${chunks.length} files (${chunkSize} questions each)\n`);
  
  // Generate index file
  let indexContent = `${interfaceCode}\n\n`;
  indexContent += `import { ReactQuestion } from './types';\n\n`;
  
  // Create each chunk file
  const imports = [];
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const startId = parseInt(chunk[0].match(/id:\s*(\d+)/)?.[1] || "0");
    const endId = parseInt(chunk[chunk.length - 1].match(/id:\s*(\d+)/)?.[1] || "0");
    const fileName = `questions-${startId}-${endId}.ts`;
    const importName = `questions${i}`;
    
    const fileContent = `import { ReactQuestion } from './types';\n\n`;
    const fileContent2 = `export const ${importName}: ReactQuestion[] = [\n${chunk.join(",\n")}\n];\n`;
    
    fs.writeFileSync(
      path.join(QUESTIONS_DIR, fileName),
      fileContent + fileContent2
    );
    
    imports.push(`import { ${importName} } from './questions/${fileName.replace('.ts', '')}';\n`);
    indexContent += `import { ${importName} } from './questions/${fileName.replace('.ts', '')}';\n`;
    
    console.log(`✅ Created ${fileName} (${chunk.length} questions)`);
  }
  
  // Create types file
  fs.writeFileSync(
    path.join(QUESTIONS_DIR, "types.ts"),
    interfaceCode + "\n"
  );
  
  // Create index file that exports all
  indexContent += `\nexport const reactQuestions: ReactQuestion[] = [\n`;
  for (let i = 0; i < chunks.length; i++) {
    indexContent += `  ...questions${i},\n`;
  }
  indexContent += `];\n`;
  
  fs.writeFileSync(
    path.join(QUESTIONS_DIR, "index.ts"),
    indexContent
  );
  
  console.log(`\n✅ Created index.ts`);
  console.log(`\n📝 Next steps:`);
  console.log(`  1. Update imports to use: import { reactQuestions } from '@/lib/questions'`);
  console.log(`  2. Test that everything still works`);
  console.log(`  3. Remove original reactQuestions.ts`);
}

splitReactQuestions();

