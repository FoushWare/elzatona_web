import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Question {
  id: string;
  title: string;
  question: string;
  answer: string;
  explanation?: string;
  codeExample?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  tags?: string[];
  options?: string[];
  correctAnswer?: number;
}

interface QuestionGroup {
  id: string;
  title: string;
  questions: Question[];
  totalQuestions: number;
}

interface QuestionsData {
  groups: QuestionGroup[];
  totalQuestions: number;
}

interface QuestionsFile {
  questions: Question[];
  metadata: {
    totalQuestions: number;
    categories: string[];
    difficulties: string[];
    lastUpdated: string;
  };
}

// Mapping from learning path IDs to QuestionsBank directories
const pathToQuestionsMap: Record<string, string> = {
  'frontend-basics': 'frontend-basics',
  'advanced-css': 'advanced-css',
  'javascript-deep-dive': 'javascript-deep-dive',
  'react-mastery': 'react-mastery',
  'typescript-essentials': 'typescript-essentials',
  'performance-optimization': 'web-performance',
  'security-essentials': 'security',
  'system-design': 'system-design',
  'api-integration': 'api-design',
  'testing-strategies': 'testing-strategies',
  'build-tools-mastery': 'deployment-devops',
  accessibility: 'accessibility',
  'git-version-control': 'git-version-control',
  'english-learning': 'english-learning',
};

function loadQuestionsFromJSON(filePath: string): Question[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questionsFile: QuestionsFile = JSON.parse(content);
    return questionsFile.questions;
  } catch (error) {
    console.error(`Error loading questions from ${filePath}:`, error);
    return [];
  }
}

// Fallback markdown parsing (simplified)
function parseMarkdownQuestions(filePath: string): Question[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const questions: Question[] = [];

    // Split content by question headers (## Question)
    const questionSections = content.split(/^## Question \d+:/m);
    questionSections.shift(); // Remove first empty section

    questionSections.forEach((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0]?.trim() || `Question ${index + 1}`;

      // Simple parsing - extract question and answer
      let questionContent = '';
      let answerContent = '';
      let inAnswer = false;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('**Answer:**')) {
          inAnswer = true;
          answerContent = line.replace('**Answer:**', '').trim();
        } else if (line.startsWith('**Question:**')) {
          inAnswer = false;
          questionContent = line.replace('**Question:**', '').trim();
        } else if (inAnswer) {
          answerContent += '\n' + line;
        } else if (!inAnswer && line.trim() && !line.startsWith('---')) {
          questionContent += '\n' + line;
        }
      }

      if (questionContent.trim() && answerContent.trim()) {
        questions.push({
          id: `q${index + 1}`,
          title,
          question: questionContent.trim(),
          answer: answerContent.trim(),
          difficulty: 'intermediate',
          category: 'Frontend Basics',
          tags: ['frontend', 'basics'],
          options: [
            answerContent.substring(0, 100) +
              (answerContent.length > 100 ? '...' : ''),
            'The code will throw an error',
            'The output will be different from expected',
            'The code will not execute',
          ],
          correctAnswer: 0,
        });
      }
    });

    return questions;
  } catch (error) {
    console.error(`Error parsing questions from ${filePath}:`, error);
    return [];
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ pathId: string }> }
) {
  try {
    const { pathId } = await params;

    // Get the QuestionsBank path for this learning path
    const questionsBankPath = pathToQuestionsMap[pathId];
    console.log('QuestionsBank path:', questionsBankPath);

    if (!questionsBankPath) {
      console.log('Learning path not found in mapping');
      return NextResponse.json(
        { error: 'Learning path not found' },
        { status: 404 }
      );
    }

    // Construct the file path - try JSON first, fallback to markdown
    const jsonFilePath = path.join(
      process.cwd(),
      'QuestionsBank',
      questionsBankPath,
      'questions.json'
    );
    const markdownFilePath = path.join(
      process.cwd(),
      'QuestionsBank',
      questionsBankPath,
      'questions.md'
    );

    let questions: Question[] = [];

    // Try to load from JSON first
    if (fs.existsSync(jsonFilePath)) {
      console.log('Loading from JSON file:', jsonFilePath);
      questions = loadQuestionsFromJSON(jsonFilePath);
    } else if (fs.existsSync(markdownFilePath)) {
      console.log('Loading from Markdown file:', markdownFilePath);
      questions = parseMarkdownQuestions(markdownFilePath);
    } else {
      console.log('No questions file found for path:', questionsBankPath);
      return NextResponse.json(
        { error: 'Questions file not found' },
        { status: 404 }
      );
    }

    console.log('Loaded questions count:', questions.length);

    // Group questions into groups of 20
    const questionsPerGroup = 20;
    const groups = [];

    for (let i = 0; i < questions.length; i += questionsPerGroup) {
      const groupQuestions = questions.slice(i, i + questionsPerGroup);
      const groupNumber = Math.floor(i / questionsPerGroup) + 1;
      const startQuestion = i + 1;
      const endQuestion = Math.min(i + questionsPerGroup, questions.length);

      groups.push({
        id: `group-${groupNumber}`,
        title: `Questions ${startQuestion}-${endQuestion} (${groupQuestions.length} questions)`,
        questions: groupQuestions,
        totalQuestions: groupQuestions.length,
      });
    }

    const questionsData: QuestionsData = {
      groups: groups,
      totalQuestions: questions.length,
    };

    return NextResponse.json(questionsData);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
