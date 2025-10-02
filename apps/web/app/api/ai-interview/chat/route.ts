import { NextRequest, NextResponse } from 'next/server';

const followUpQuestions = {
  frontend: {
    beginner: [
      'Can you give me a specific example of how you would implement that?',
      'What are the potential drawbacks of that approach?',
      'How would you test this functionality?',
      'What browser compatibility issues might you encounter?',
      'How would you make this more accessible?',
    ],
    intermediate: [
      'How would you optimize this for performance?',
      'What are the security considerations here?',
      'How would you handle error states?',
      'What testing strategies would you use?',
      'How would you make this component reusable?',
    ],
    advanced: [
      'How would you implement this at scale?',
      'What are the trade-offs of this approach?',
      'How would you handle edge cases?',
      'What monitoring would you implement?',
      'How would you refactor this for better maintainability?',
    ],
  },
  backend: {
    beginner: [
      'How would you handle errors in this scenario?',
      'What security measures would you implement?',
      'How would you test this functionality?',
      'What happens if the database is unavailable?',
      'How would you log important events?',
    ],
    intermediate: [
      'How would you optimize this for performance?',
      'What caching strategies would you use?',
      'How would you handle concurrent requests?',
      'What monitoring would you implement?',
      'How would you make this more scalable?',
    ],
    advanced: [
      'How would you implement this in a distributed system?',
      'What are the consistency guarantees?',
      'How would you handle partial failures?',
      'What observability tools would you use?',
      'How would you implement circuit breakers?',
    ],
  },
  fullstack: {
    beginner: [
      'How would you handle the communication between frontend and backend?',
      'What security measures would you implement?',
      'How would you test the integration?',
      'What happens if one part of the system fails?',
      'How would you deploy this application?',
    ],
    intermediate: [
      'How would you handle real-time updates?',
      'What caching strategies would you implement?',
      'How would you optimize the data flow?',
      'What monitoring would you set up?',
      'How would you handle user authentication?',
    ],
    advanced: [
      'How would you implement this as a microservice?',
      'What are the data consistency requirements?',
      'How would you handle cross-service communication?',
      'What observability would you implement?',
      'How would you handle distributed transactions?',
    ],
  },
  'system-design': {
    beginner: [
      'What are the main components of this system?',
      'How would users interact with this system?',
      'What data would you need to store?',
      'How would you handle user requests?',
      'What happens if one component fails?',
    ],
    intermediate: [
      'How would you scale this system?',
      'What are the bottlenecks in your design?',
      'How would you handle data consistency?',
      'What caching layers would you add?',
      'How would you monitor system health?',
    ],
    advanced: [
      'How would you handle global distribution?',
      'What are the consistency vs availability trade-offs?',
      'How would you implement fault tolerance?',
      'What are the security implications?',
      'How would you handle data partitioning?',
    ],
  },
  behavioral: {
    beginner: [
      'What did you learn from that experience?',
      'How did you handle the challenges?',
      'What would you do differently next time?',
      'How did this experience help you grow?',
      'What was the outcome?',
    ],
    intermediate: [
      'How did you measure success in that situation?',
      'What feedback did you receive?',
      'How did you collaborate with others?',
      'What obstacles did you overcome?',
      'How did you prioritize your tasks?',
    ],
    advanced: [
      'How did you influence the technical direction?',
      'What leadership challenges did you face?',
      'How did you mentor others?',
      'What strategic decisions did you make?',
      'How did you drive innovation?',
    ],
  },
};

const positiveFeedback = [
  "That's a great answer!",
  'Excellent point!',
  'I like how you thought about that.',
  'That shows good understanding.',
  'Well explained!',
  'Good insight!',
  "That's a solid approach.",
  'Nice work!',
];

const constructiveFeedback = [
  "That's a good start. Let me ask you to think about...",
  'I see your point. Consider also...',
  "That's one approach. Another way to think about it is...",
  'Good thinking. You might also want to consider...',
  "That's a valid point. Let me add that...",
];

export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      message,
      category,
      difficulty,
      mode,
      adaptiveLevel,
      responseTime,
      conceptsCovered,
      weakAreas,
      strongAreas,
    } = await request.json();

    if (!message || !category || !difficulty) {
      return NextResponse.json(
        { error: 'Message, category, and difficulty are required' },
        { status: 400 }
      );
    }

    // Enhanced response analysis
    const responseLength = message.length;
    const hasTechnicalTerms =
      /(function|class|component|API|database|server|client|state|props|hook|async|await|promise|callback|event|DOM|CSS|HTML|JavaScript|React|Node|SQL|NoSQL|HTTP|REST|GraphQL|microservice|container|Docker|Kubernetes|AWS|Azure|GCP|algorithm|data structure|optimization|scalability|performance|security|testing|deployment|architecture|design pattern)/i.test(
        message
      );
    const hasExamples =
      /(example|for instance|like|such as|imagine|suppose|when I|in my experience)/i.test(
        message
      );
    const hasStructure =
      /(first|second|third|then|next|finally|in conclusion|to summarize|step 1|step 2|initially|subsequently|therefore|however|moreover|additionally)/i.test(
        message
      );
    const hasCodeExamples =
      /(```|`|const|let|var|function|class|import|export)/i.test(message);
    const hasBestPractices =
      /(best practice|recommended|should|avoid|don't|never|always|typically|usually)/i.test(
        message
      );

    // Calculate response quality score
    let qualityScore = 0;
    if (responseLength > 100) qualityScore += 20;
    if (hasTechnicalTerms) qualityScore += 25;
    if (hasExamples) qualityScore += 20;
    if (hasStructure) qualityScore += 15;
    if (hasCodeExamples) qualityScore += 10;
    if (hasBestPractices) qualityScore += 10;

    // Adjust for response time (faster responses get bonus points)
    if (responseTime && responseTime < 30000) {
      // Less than 30 seconds
      qualityScore += 5;
    }

    // Extract concepts mentioned
    const conceptMatches = message.match(
      /(React|JavaScript|CSS|HTML|Node\.js|API|Database|Authentication|Security|Performance|Scalability|Testing|Deployment|Architecture|Design Pattern|Algorithm|Data Structure|Optimization|Microservice|Container|Docker|Kubernetes|AWS|Azure|GCP)/gi
    );
    const mentionedConcepts: string[] = conceptMatches
      ? [...new Set((conceptMatches as string[]).map(c => c.toLowerCase()))]
      : [];

    // Determine missing concepts based on category
    const categoryConcepts = {
      frontend: [
        'react',
        'javascript',
        'css',
        'html',
        'dom',
        'state management',
        'performance',
        'accessibility',
      ],
      backend: [
        'node.js',
        'api',
        'database',
        'authentication',
        'security',
        'performance',
        'scalability',
        'testing',
      ],
      fullstack: [
        'frontend',
        'backend',
        'integration',
        'deployment',
        'ci/cd',
        'monitoring',
        'architecture',
        'devops',
      ],
      'system-design': [
        'architecture',
        'scalability',
        'performance',
        'caching',
        'load balancing',
        'microservices',
        'databases',
        'security',
      ],
      behavioral: [
        'leadership',
        'communication',
        'problem solving',
        'teamwork',
        'adaptability',
        'conflict resolution',
        'time management',
        'innovation',
      ],
    };

    const expectedConcepts =
      categoryConcepts[category as keyof typeof categoryConcepts] || [];
    const missingConcepts = expectedConcepts.filter(
      concept =>
        !mentionedConcepts.some(
          mentioned =>
            mentioned.includes(concept) || concept.includes(mentioned)
        )
    );

    // Generate appropriate response with adaptive difficulty
    let aiResponse = '';
    let newAdaptiveLevel = adaptiveLevel || 5;

    // Adjust adaptive level based on response quality
    if (qualityScore >= 80) {
      newAdaptiveLevel = Math.min(10, newAdaptiveLevel + 1); // Increase difficulty
    } else if (qualityScore < 40) {
      newAdaptiveLevel = Math.max(0, newAdaptiveLevel - 1); // Decrease difficulty
    }

    const shouldAskFollowUp = Math.random() > 0.3; // 70% chance of follow-up

    // Provide feedback based on response quality
    if (responseLength < 50) {
      aiResponse = "I'd like to hear more details about your answer. ";
    } else if (qualityScore >= 80) {
      aiResponse =
        positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)] +
        ' ';
    } else if (qualityScore >= 60) {
      aiResponse =
        constructiveFeedback[
          Math.floor(Math.random() * constructiveFeedback.length)
        ] + ' ';
    } else {
      aiResponse = 'Let me help you think through this more systematically. ';
    }

    // Add follow-up question or next question based on adaptive level
    if (shouldAskFollowUp) {
      // Select difficulty level based on adaptive level
      let questionDifficulty = difficulty;
      if (newAdaptiveLevel >= 7) {
        questionDifficulty = 'advanced';
      } else if (newAdaptiveLevel >= 4) {
        questionDifficulty = 'intermediate';
      } else {
        questionDifficulty = 'beginner';
      }

      const followUps =
        followUpQuestions[category as keyof typeof followUpQuestions]?.[
          questionDifficulty as keyof typeof followUpQuestions.frontend
        ];
      if (followUps && followUps.length > 0) {
        const followUp =
          followUps[Math.floor(Math.random() * followUps.length)];
        aiResponse += followUp;
      } else {
        aiResponse += 'Can you elaborate on that point?';
      }
    } else {
      // Move to next main question
      const nextQuestionResponses = [
        "Great! Let's move on to the next question:",
        "Good answer! Here's another question for you:",
        'Well done! Let me ask you this:',
        "Excellent! Now, let's discuss this:",
      ];

      aiResponse +=
        nextQuestionResponses[
          Math.floor(Math.random() * nextQuestionResponses.length)
        ] + ' ';

      // Get next question based on adaptive level and missing concepts
      let nextQuestion = '';
      if (missingConcepts.length > 0 && Math.random() > 0.5) {
        // Ask about missing concepts
        const concept =
          missingConcepts[Math.floor(Math.random() * missingConcepts.length)];
        nextQuestion = `How would you approach ${concept} in this context?`;
      } else {
        // Standard progression questions
        const nextQuestions = [
          'How would you handle edge cases in this scenario?',
          'What are the potential challenges with this approach?',
          'How would you optimize this for better performance?',
          'What security considerations should be taken into account?',
          'How would you test this functionality?',
        ];
        nextQuestion =
          nextQuestions[Math.floor(Math.random() * nextQuestions.length)];
      }

      aiResponse += nextQuestion;
    }

    return NextResponse.json({
      success: true,
      message: aiResponse,
      sessionId,
      adaptiveLevel: newAdaptiveLevel,
      evaluation: {
        score: qualityScore,
        feedback:
          qualityScore >= 80
            ? 'Excellent response!'
            : qualityScore >= 60
              ? 'Good response, keep it up!'
              : 'Consider providing more detail and examples.',
        concepts: mentionedConcepts,
        missing: missingConcepts,
      },
      analysis: {
        responseLength,
        hasTechnicalTerms,
        hasExamples,
        hasStructure,
        hasCodeExamples,
        hasBestPractices,
        quality:
          qualityScore >= 80
            ? 'excellent'
            : qualityScore >= 60
              ? 'good'
              : qualityScore >= 40
                ? 'fair'
                : 'needs_improvement',
        responseTime,
        mentionedConcepts,
        missingConcepts,
      },
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
