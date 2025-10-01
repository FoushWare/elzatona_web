// v1.0 - Markdown Question Parser
// Parses markdown content to extract questions in various formats

import { BulkQuestionData } from './unified-question-schema';

export interface MarkdownQuestion {
  title: string;
  content: string;
  type: 'single' | 'multiple';
  difficulty: 'easy' | 'medium' | 'hard';
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
  correctAnswers: string[];
  explanation?: string;
  category?: string; // Made optional
  learningPath?: string; // Added learning path
  topic?: string; // Added topic field
  tags?: string[];
  points?: number;
}

export interface ParseResult {
  questions: MarkdownQuestion[];
  errors: string[];
  warnings: string[];
}

export class MarkdownQuestionParser {
  private static readonly QUESTION_PATTERNS = {
    // Multiple choice with options
    multipleChoice: /^(\d+\.?\s*.*?)\n((?:[a-zA-Z]\)\s*.*\n?)+)/gms,
    // True/False questions
    trueFalse: /^(\d+\.?\s*.*?)\n(?:True|False|T|F)/gms,
    // Open-ended questions
    openEnded: /^(\d+\.?\s*.*?)\n(?:Explain|Describe|What|How|Why)/gms,
  };

  private static readonly OPTION_PATTERN =
    /^([a-zA-Z])\)\s*(.*?)(?:\s*\[(?:correct|x|✓)\])?$/gm;

  /**
   * Parse markdown content to extract questions
   */
  static parseMarkdown(markdown: string): ParseResult {
    const result: ParseResult = {
      questions: [],
      errors: [],
      warnings: [],
    };

    try {
      // Split content into sections
      const sections = this.splitIntoSections(markdown);

      for (const section of sections) {
        const questions = this.parseSection(section);
        result.questions.push(...questions);
      }

      // Validate questions
      this.validateQuestions(result.questions, result.errors, result.warnings);
    } catch (error) {
      result.errors.push(
        `Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }

    return result;
  }

  /**
   * Split markdown content into question sections
   */
  private static splitIntoSections(markdown: string): string[] {
    // Split by double newlines or question numbers
    const sections = markdown
      .split(/\n\s*\n/)
      .filter(section => section.trim().length > 0);

    // If no clear sections, try splitting by question numbers
    if (sections.length === 1) {
      const questionSections = markdown.split(/(?=^\d+\.)/gm);
      return questionSections.filter(section => section.trim().length > 0);
    }

    return sections;
  }

  /**
   * Parse a single section for questions
   */
  private static parseSection(section: string): MarkdownQuestion[] {
    const questions: MarkdownQuestion[] = [];

    // Try different question formats
    const multipleChoiceQuestions = this.parseMultipleChoice(section);
    const trueFalseQuestions = this.parseTrueFalse(section);
    const openEndedQuestions = this.parseOpenEnded(section);

    questions.push(
      ...multipleChoiceQuestions,
      ...trueFalseQuestions,
      ...openEndedQuestions
    );

    return questions;
  }

  /**
   * Parse multiple choice questions
   */
  private static parseMultipleChoice(section: string): MarkdownQuestion[] {
    const questions: MarkdownQuestion[] = [];
    const matches = [
      ...section.matchAll(this.QUESTION_PATTERNS.multipleChoice),
    ];

    for (const match of matches) {
      const questionText = match[1].trim();
      const optionsText = match[2].trim();

      if (!questionText || !optionsText) continue;

      const options = this.parseOptions(optionsText);
      if (options.length < 2) continue;

      const correctAnswers = options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);

      if (correctAnswers.length === 0) continue;

      questions.push({
        title: this.extractTitle(questionText),
        content: questionText,
        type: correctAnswers.length === 1 ? 'single' : 'multiple',
        difficulty: this.extractDifficulty(questionText),
        options,
        correctAnswers,
        explanation: this.extractExplanation(section),
        category: this.extractCategory(section),
        learningPath: this.extractLearningPath(section),
        topic: this.extractTopic(section),
        tags: this.extractTags(section),
        points: this.extractPoints(questionText),
      });
    }

    return questions;
  }

  /**
   * Parse true/false questions
   */
  private static parseTrueFalse(section: string): MarkdownQuestion[] {
    const questions: MarkdownQuestion[] = [];
    const lines = section.split('\n').filter(line => line.trim());

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line.match(/^\d+\./)) continue;

      const nextLine = lines[i + 1]?.trim();
      if (!nextLine || !nextLine.match(/^(True|False|T|F)$/i)) continue;

      const isTrue = /^(True|T)$/i.test(nextLine);

      questions.push({
        title: this.extractTitle(line),
        content: line,
        type: 'single',
        difficulty: this.extractDifficulty(line),
        options: [
          { id: 'a', text: 'True', isCorrect: isTrue },
          { id: 'b', text: 'False', isCorrect: !isTrue },
        ],
        correctAnswers: [isTrue ? 'a' : 'b'],
        explanation: this.extractExplanation(section),
        category: this.extractCategory(section),
        learningPath: this.extractLearningPath(section),
        topic: this.extractTopic(section),
        tags: this.extractTags(section),
        points: this.extractPoints(line),
      });
    }

    return questions;
  }

  /**
   * Parse open-ended questions
   */
  private static parseOpenEnded(section: string): MarkdownQuestion[] {
    const questions: MarkdownQuestion[] = [];
    const lines = section.split('\n').filter(line => line.trim());

    for (const line of lines) {
      if (!line.match(/^\d+\./)) continue;
      if (line.match(/(?:True|False|T|F)$/i)) continue; // Skip T/F questions
      if (!line.match(/(?:Explain|Describe|What|How|Why)/i)) continue;

      questions.push({
        title: this.extractTitle(line),
        content: line,
        type: 'single',
        difficulty: this.extractDifficulty(line),
        options: [{ id: 'a', text: 'Open-ended response', isCorrect: true }],
        correctAnswers: ['a'],
        explanation: this.extractExplanation(section),
        category: this.extractCategory(section),
        learningPath: this.extractLearningPath(section),
        topic: this.extractTopic(section),
        tags: this.extractTags(section),
        points: this.extractPoints(line),
      });
    }

    return questions;
  }

  /**
   * Parse options from text
   */
  private static parseOptions(
    optionsText: string
  ): Array<{ id: string; text: string; isCorrect: boolean }> {
    const options: Array<{ id: string; text: string; isCorrect: boolean }> = [];
    const matches = [...optionsText.matchAll(this.OPTION_PATTERN)];

    for (const match of matches) {
      const id = match[1].toLowerCase();
      const text = match[2].trim();
      const isCorrect =
        match[0].includes('[correct]') ||
        match[0].includes('[x]') ||
        match[0].includes('[✓]');

      options.push({ id, text, isCorrect });
    }

    return options;
  }

  /**
   * Extract title from question text
   */
  private static extractTitle(questionText: string): string {
    // Remove question number and clean up
    const title = questionText.replace(/^\d+\.?\s*/, '').trim();
    return title.length > 100 ? title.substring(0, 100) + '...' : title;
  }

  /**
   * Extract difficulty from question text or section
   */
  private static extractDifficulty(text: string): 'easy' | 'medium' | 'hard' {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('easy') || lowerText.includes('beginner'))
      return 'easy';
    if (lowerText.includes('hard') || lowerText.includes('advanced'))
      return 'hard';
    return 'medium';
  }

  /**
   * Extract explanation from section
   */
  private static extractExplanation(section: string): string | undefined {
    const explanationMatch = section.match(
      /explanation[:\s]+(.*?)(?:\n\n|\n$|$)/is
    );
    return explanationMatch ? explanationMatch[1].trim() : undefined;
  }

  /**
   * Extract category from section
   */
  private static extractCategory(section: string): string | undefined {
    const categoryMatch = section.match(/category[:\s]+(.*?)(?:\n|$)/i);
    return categoryMatch ? categoryMatch[1].trim() : undefined;
  }

  /**
   * Extract learning path from section
   */
  private static extractLearningPath(section: string): string | undefined {
    const learningPathMatch = section.match(
      /(?:learning[_\s]?path|learningpath)[:\s]+(.*?)(?:\n|$)/i
    );
    return learningPathMatch ? learningPathMatch[1].trim() : undefined;
  }

  /**
   * Extract topic from section
   */
  private static extractTopic(section: string): string | undefined {
    const topicMatch = section.match(/topic[:\s]+(.*?)(?:\n|$)/i);
    return topicMatch ? topicMatch[1].trim() : undefined;
  }

  /**
   * Extract tags from section
   */
  private static extractTags(section: string): string[] {
    const tagMatches = section.match(/#(\w+)/g);
    return tagMatches ? tagMatches.map(tag => tag.substring(1)) : [];
  }

  /**
   * Extract points from question text
   */
  private static extractPoints(text: string): number {
    const pointsMatch = text.match(/\[(\d+)\s*points?\]/i);
    return pointsMatch ? parseInt(pointsMatch[1], 10) : 1;
  }

  /**
   * Validate parsed questions
   */
  private static validateQuestions(
    questions: MarkdownQuestion[],
    errors: string[],
    warnings: string[]
  ): void {
    questions.forEach((question, index) => {
      // Check required fields
      if (!question.title || !question.content) {
        errors.push(`Question ${index + 1}: Missing title or content`);
      }

      if (question.options.length < 2) {
        errors.push(`Question ${index + 1}: Must have at least 2 options`);
      }

      if (question.correctAnswers.length === 0) {
        errors.push(
          `Question ${index + 1}: Must have at least one correct answer`
        );
      }

      // Check for valid option IDs
      const validIds = question.options.map(opt => opt.id);
      const invalidAnswers = question.correctAnswers.filter(
        id => !validIds.includes(id)
      );
      if (invalidAnswers.length > 0) {
        errors.push(
          `Question ${index + 1}: Invalid correct answer IDs: ${invalidAnswers.join(', ')}`
        );
      }

      // Warnings
      if (question.title.length > 200) {
        warnings.push(
          `Question ${index + 1}: Title is very long (${question.title.length} characters)`
        );
      }

      if (question.content.length > 1000) {
        warnings.push(
          `Question ${index + 1}: Content is very long (${question.content.length} characters)`
        );
      }
    });
  }

  /**
   * Convert parsed questions to BulkQuestionData format
   */
  static convertToBulkData(questions: MarkdownQuestion[]): BulkQuestionData[] {
    return questions.map(question => ({
      title: question.title,
      content: question.content,
      type: question.type,
      difficulty: question.difficulty,
      options: question.options,
      correctAnswers: question.correctAnswers,
      explanation: question.explanation || '',
      category: question.category || 'General', // Default category
      learningPath: question.learningPath || 'Default Learning Path', // Default learning path
      topic: question.topic || 'General Topic', // Default topic
      tags: question.tags || [],
      points: question.points || 1,
    }));
  }

  /**
   * Generate markdown template
   */
  static generateTemplate(): string {
    return `# Questions Template

## Multiple Choice Questions

1. What is the capital of France?
a) London
b) Berlin
c) Paris [correct]
d) Madrid

Explanation: Paris is the capital and largest city of France.
Category: Geography
Learning Path: World Geography
Topic: European Capitals

## True/False Questions

2. The sun rises in the west.
True
False [correct]

Explanation: The sun rises in the east and sets in the west.
Category: Science
Learning Path: Basic Astronomy
Topic: Earth's Rotation

## Open-ended Questions

3. Explain the concept of object-oriented programming.

Category: Programming
Learning Path: Software Development Fundamentals
Topic: Programming Paradigms
Difficulty: medium

## Question with Full Metadata

4. What is React? [5 points]
a) A CSS framework
b) A JavaScript library [correct]
c) A database
d) A server

Category: Frontend Development
Learning Path: React Fundamentals
Topic: JavaScript Libraries
Tags: #react #javascript #frontend
Difficulty: easy

Explanation: React is a JavaScript library for building user interfaces.

## Question with Audio

5. Listen to the audio and answer the question.
a) Option A
b) Option B [correct]

Category: Language Learning
Learning Path: English Listening
Topic: Audio Comprehension
Difficulty: medium

Explanation: The correct answer is B, as heard in the audio.

## Remember:
- Use numbered lists for questions (1., 2., 3.)
- Use 'a)', 'b)', 'c)' etc. for multiple-choice options
- Mark correct options with '[correct]'
- Use 'Category:', 'Learning Path:', 'Topic:', 'Tags:', 'Difficulty:', 'Points:' for metadata
- Tags should be space or comma-separated, and can start with '#'
- Difficulty can be 'easy', 'medium', 'hard', 'beginner', 'intermediate', 'advanced'
- Points can be specified in the title like '[5 points]'
- All metadata fields are optional - questions will work without them
`;
  }
}

export default MarkdownQuestionParser;
