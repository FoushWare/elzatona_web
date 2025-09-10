import { NextRequest, NextResponse } from 'next/server';

const interviewQuestions = {
  frontend: {
    beginner: [
      'What is React and why would you use it?',
      'Explain the difference between HTML, CSS, and JavaScript.',
      'What is the DOM and how do you interact with it?',
      'What are CSS selectors and how do they work?',
      'Explain the difference between let, const, and var in JavaScript.',
    ],
    intermediate: [
      'Explain React hooks and when you would use useState vs useEffect.',
      'What is the virtual DOM and how does it improve performance?',
      'How do you handle state management in a large React application?',
      'Explain the difference between controlled and uncontrolled components.',
      'What are higher-order components and when would you use them?',
    ],
    advanced: [
      "Explain React's reconciliation algorithm and how it works.",
      'How would you optimize a React application for performance?',
      'Explain the differences between React.memo, useMemo, and useCallback.',
      'How do you implement error boundaries in React?',
      'Explain server-side rendering and its benefits.',
    ],
  },
  backend: {
    beginner: [
      'What is an API and how does it work?',
      'Explain the difference between GET and POST requests.',
      'What is a database and why do we need it?',
      'Explain the concept of RESTful APIs.',
      'What is JSON and how is it used in web development?',
    ],
    intermediate: [
      'Explain the difference between SQL and NoSQL databases.',
      'How do you handle authentication and authorization in web applications?',
      'What is middleware and how does it work in Express.js?',
      'Explain the concept of database indexing.',
      'How do you handle errors in Node.js applications?',
    ],
    advanced: [
      'Explain microservices architecture and its benefits.',
      'How do you implement caching strategies in backend applications?',
      'Explain database sharding and when you would use it.',
      'How do you handle distributed systems and eventual consistency?',
      'Explain the CAP theorem and its implications.',
    ],
  },
  fullstack: {
    beginner: [
      'Explain the full-stack development process from frontend to backend.',
      'How do you deploy a full-stack application?',
      'What is version control and why is it important?',
      'Explain the client-server architecture.',
      'What are environment variables and how do you use them?',
    ],
    intermediate: [
      'How do you handle CORS issues in full-stack applications?',
      'Explain the difference between development, staging, and production environments.',
      'How do you implement real-time features in web applications?',
      'What is CI/CD and how does it benefit development?',
      'How do you handle file uploads in web applications?',
    ],
    advanced: [
      'Explain containerization and how Docker works.',
      'How do you implement monitoring and logging in production applications?',
      'Explain load balancing and horizontal scaling strategies.',
      'How do you handle security vulnerabilities in full-stack applications?',
      'Explain the 12-factor app methodology.',
    ],
  },
  'system-design': {
    beginner: [
      'What is system design and why is it important?',
      'Explain the difference between horizontal and vertical scaling.',
      'What is a load balancer and how does it work?',
      'Explain the concept of caching.',
      'What is a database and how does it fit into system architecture?',
    ],
    intermediate: [
      'How would you design a URL shortener like bit.ly?',
      'Explain the difference between SQL and NoSQL databases.',
      'How do you handle high traffic on a web application?',
      'What is a CDN and when would you use one?',
      'Explain the concept of microservices vs monolithic architecture.',
    ],
    advanced: [
      'How would you design a distributed chat system like WhatsApp?',
      'Explain the CAP theorem and its trade-offs.',
      'How do you design a system to handle millions of users?',
      'Explain database sharding and partitioning strategies.',
      'How do you handle data consistency in distributed systems?',
    ],
  },
  behavioral: {
    beginner: [
      'Tell me about yourself and your background.',
      'Why are you interested in this role?',
      'What are your strengths and weaknesses?',
      'Where do you see yourself in 5 years?',
      'Why do you want to work for our company?',
    ],
    intermediate: [
      'Tell me about a challenging project you worked on.',
      'How do you handle working under pressure?',
      'Describe a time when you had to learn something new quickly.',
      'Tell me about a time when you disagreed with a team member.',
      'How do you prioritize your tasks when you have multiple deadlines?',
    ],
    advanced: [
      'Tell me about a time when you had to make a difficult technical decision.',
      'Describe a situation where you had to lead a team through a challenging project.',
      'How do you stay updated with the latest technology trends?',
      'Tell me about a time when you had to explain a complex technical concept to a non-technical person.',
      'Describe a time when you had to refactor legacy code.',
    ],
  },
};

export async function POST(request: NextRequest) {
  try {
    const { category, difficulty, mode, adaptiveLevel } = await request.json();

    if (!category || !difficulty) {
      return NextResponse.json(
        { error: 'Category and difficulty are required' },
        { status: 400 }
      );
    }

    const questions =
      interviewQuestions[category as keyof typeof interviewQuestions]?.[
        difficulty as keyof typeof interviewQuestions.frontend
      ];

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'Invalid category or difficulty' },
        { status: 400 }
      );
    }

    // Select a random question
    const randomQuestion =
      questions[Math.floor(Math.random() * questions.length)];

    const modeText = mode ? ` in ${mode.replace('-', ' ')} mode` : '';
    const greetingMessage = `Hello! I'm your AI interviewer. I'll be conducting a ${difficulty} level interview focused on ${category} development${modeText}. I'll adapt the difficulty based on your responses and provide real-time feedback. Let's begin with our first question:

**${randomQuestion}**

Please take your time to think about your answer, and when you're ready, share your response. I'll provide feedback and ask follow-up questions based on your answers. Good luck!`;

    return NextResponse.json({
      success: true,
      message: greetingMessage,
      question: randomQuestion,
      category,
      difficulty,
    });
  } catch (error) {
    console.error('Error starting interview:', error);
    return NextResponse.json(
      { error: 'Failed to start interview' },
      { status: 500 }
    );
  }
}
