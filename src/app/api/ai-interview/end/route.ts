import { NextRequest, NextResponse } from 'next/server';

interface Message {
  type: 'user' | 'assistant';
  content: string;
}

interface Flashcard {
  question: string;
  answer: string;
  explanation: string;
  category: string;
  difficulty: string;
  tags: string[];
}

interface WeakArea {
  name: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      messages,
      category,
      difficulty,
      mode,
      adaptiveLevel,
      conceptsCovered,
      weakAreas,
      strongAreas,
      totalQuestions,
      correctAnswers,
      averageResponseTime,
    } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Analyze the interview session
    const userMessages = messages.filter((msg: Message) => msg.type === 'user');
    const totalMessages = userMessages.length;

    if (totalMessages === 0) {
      return NextResponse.json({
        success: true,
        score: 0,
        feedback:
          'No responses were provided during the interview. Please try again and provide answers to the questions.',
        sessionId,
      });
    }

    // Enhanced scoring calculation
    let score = 0;
    let feedback = '';

    // Use provided metrics if available, otherwise calculate from messages
    const avgResponseLength = averageResponseTime
      ? userMessages.reduce(
          (sum: number, msg: Message) => sum + msg.content.length,
          0
        ) / totalMessages
      : userMessages.reduce(
          (sum: number, msg: Message) => sum + msg.content.length,
          0
        ) / totalMessages;

    const technicalTermsCount = userMessages.reduce(
      (sum: number, msg: Message) => {
        const technicalTerms =
          /(function|class|component|API|database|server|client|state|props|hook|async|await|promise|callback|event|DOM|CSS|HTML|JavaScript|React|Node|SQL|NoSQL|HTTP|REST|GraphQL|microservice|container|Docker|Kubernetes|AWS|Azure|GCP|algorithm|data structure|optimization|scalability|performance|security|testing|deployment|architecture|design pattern)/gi;
        return sum + (msg.content.match(technicalTerms) || []).length;
      },
      0
    );

    const examplesCount = userMessages.reduce((sum: number, msg: Message) => {
      const examples =
        /(example|for instance|like|such as|imagine|suppose|when I|in my experience)/gi;
      return sum + (msg.content.match(examples) || []).length;
    }, 0);

    const structureCount = userMessages.reduce((sum: number, msg: Message) => {
      const structure =
        /(first|second|third|then|next|finally|in conclusion|to summarize|step 1|step 2|initially|subsequently|therefore|however|moreover|additionally)/gi;
      return sum + (msg.content.match(structure) || []).length;
    }, 0);

    // Calculate base score with enhanced metrics
    score += Math.min(25, avgResponseLength / 10); // Response length (max 25 points)
    score += Math.min(25, technicalTermsCount * 2); // Technical knowledge (max 25 points)
    score += Math.min(20, examplesCount * 3); // Examples and experience (max 20 points)
    score += Math.min(15, structureCount * 2); // Structured thinking (max 15 points)
    score += Math.min(10, totalMessages * 2); // Engagement (max 10 points)

    // Bonus for adaptive level progression
    if (adaptiveLevel && adaptiveLevel > 5) {
      score += Math.min(5, (adaptiveLevel - 5) * 0.5); // Adaptive progression bonus
    }

    // Bonus for response time (faster responses)
    if (averageResponseTime && averageResponseTime < 30000) {
      score += 5; // Quick response bonus
    }

    // Adjust for difficulty level
    const difficultyMultiplier = {
      beginner: 1.2,
      intermediate: 1.0,
      advanced: 0.8,
    };

    score *=
      difficultyMultiplier[difficulty as keyof typeof difficultyMultiplier];
    score = Math.min(100, Math.max(0, Math.round(score)));

    // Generate feedback based on score and analysis
    if (score >= 80) {
      feedback = `Excellent performance! You demonstrated strong technical knowledge with ${technicalTermsCount} technical terms used, provided ${examplesCount} concrete examples, and showed structured thinking with ${structureCount} organizational phrases. Your average response length of ${Math.round(avgResponseLength)} characters shows good depth. You're well-prepared for ${difficulty} level ${category} interviews.`;
    } else if (score >= 60) {
      feedback = `Good performance! You showed solid understanding with ${technicalTermsCount} technical terms and ${examplesCount} examples. Your responses averaged ${Math.round(avgResponseLength)} characters. To improve: try to provide more specific examples, use more technical terminology, and structure your answers better with phrases like "first, second, then." You're on the right track for ${difficulty} level positions.`;
    } else if (score >= 40) {
      feedback = `Fair performance. You provided ${totalMessages} responses with an average length of ${Math.round(avgResponseLength)} characters. Areas for improvement: increase your use of technical terminology (you used ${technicalTermsCount} terms), provide more concrete examples (you gave ${examplesCount}), and structure your answers better. Consider practicing more ${category} concepts and preparing specific examples from your experience.`;
    } else {
      feedback = `Your responses need more depth and technical detail. You provided ${totalMessages} responses averaging ${Math.round(avgResponseLength)} characters. Focus on: using more technical terminology, providing specific examples from your experience, structuring answers with clear organization, and demonstrating deeper knowledge of ${category} concepts. Consider reviewing fundamental concepts and practicing with more detailed responses.`;
    }

    // Add category-specific feedback
    const categoryFeedback = {
      frontend:
        " For frontend development, make sure to mention specific frameworks, libraries, and best practices you've used.",
      backend:
        ' For backend development, emphasize your experience with databases, APIs, and server-side technologies.',
      fullstack:
        ' For full-stack development, show how you integrate frontend and backend technologies effectively.',
      'system-design':
        ' For system design, focus on scalability, performance, and architectural decisions.',
      behavioral:
        ' For behavioral questions, use the STAR method (Situation, Task, Action, Result) to structure your answers.',
    };

    feedback +=
      categoryFeedback[category as keyof typeof categoryFeedback] || '';

    // Add improvement suggestions
    const improvementSuggestions = [
      'Practice explaining technical concepts out loud.',
      'Prepare specific examples from your projects.',
      'Study common interview questions for your field.',
      'Practice the STAR method for behavioral questions.',
      'Review fundamental concepts in your area of expertise.',
    ];

    const randomSuggestion =
      improvementSuggestions[
        Math.floor(Math.random() * improvementSuggestions.length)
      ];
    feedback += `\n\nSuggestion: ${randomSuggestion}`;

    // Generate flashcards for weak areas
    const flashcards: Flashcard[] = [];
    if (weakAreas && weakAreas.length > 0) {
      weakAreas.forEach((area: WeakArea) => {
        flashcards.push({
          question: `What is ${area.name} and how is it used in ${category} development?`,
          answer: `This is a key concept in ${category} development that you should study further.`,
          explanation: `Understanding ${area.name} is crucial for ${category} development. Consider reviewing documentation and practicing with examples.`,
          category: category,
          difficulty: difficulty,
          tags: [area.name, category, 'interview-prep'],
        });
      });
    }

    return NextResponse.json({
      success: true,
      score,
      feedback,
      sessionId,
      flashcards: flashcards,
      analysis: {
        totalMessages,
        avgResponseLength: Math.round(avgResponseLength),
        technicalTermsCount,
        examplesCount,
        structureCount,
        category,
        difficulty,
        adaptiveLevel,
        conceptsCovered: conceptsCovered || [],
        weakAreas: weakAreas || [],
        strongAreas: strongAreas || [],
        totalQuestions: totalQuestions || totalMessages,
        correctAnswers:
          correctAnswers || Math.round(totalMessages * (score / 100)),
        averageResponseTime: averageResponseTime || 0,
      },
    });
  } catch (error) {
    console.error('Error ending interview:', error);
    return NextResponse.json(
      { error: 'Failed to end interview' },
      { status: 500 }
    );
  }
}
