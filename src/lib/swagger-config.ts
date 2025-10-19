// Simple Swagger configuration for browser environment
export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Elzatona Learning Platform API',
    version: '1.0.0',
    description:
      'Comprehensive API documentation for the Elzatona Learning Platform',
    contact: {
      name: 'Elzatona Team',
      email: 'support@elzatona.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://api.elzatona.com',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token for authentication',
      },
      AdminAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Admin JWT token for admin operations',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          error: {
            type: 'string',
            example: 'Error message',
          },
        },
      },
      Success: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Operation successful',
          },
        },
      },
      LearningCard: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'card_123',
          },
          name: {
            type: 'string',
            example: 'Core Technologies',
          },
          description: {
            type: 'string',
            example: 'Fundamental web technologies',
          },
          type: {
            type: 'string',
            enum: [
              'core-technologies',
              'framework-questions',
              'problem-solving',
              'system-design',
              'frontend-tasks',
            ],
            example: 'core-technologies',
          },
          color: {
            type: 'string',
            example: '#3B82F6',
          },
          icon: {
            type: 'string',
            example: 'Code',
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      LearningPlan: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'plan_123',
          },
          name: {
            type: 'string',
            example: '1 Day Plan',
          },
          description: {
            type: 'string',
            example: 'Quick learning plan for 1 day',
          },
          duration: {
            type: 'number',
            example: 1,
          },
          difficulty: {
            type: 'string',
            enum: ['beginner', 'intermediate', 'advanced'],
            example: 'beginner',
          },
          topics: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['javascript', 'react', 'css'],
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'cat_123',
          },
          name: {
            type: 'string',
            example: 'JavaScript Fundamentals',
          },
          description: {
            type: 'string',
            example: 'Core JavaScript concepts',
          },
          cardType: {
            type: 'string',
            example: 'core-technologies',
          },
          topics: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['topic_1', 'topic_2'],
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Topic: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'topic_123',
          },
          name: {
            type: 'string',
            example: 'Variables and Data Types',
          },
          description: {
            type: 'string',
            example: 'Understanding JavaScript variables',
          },
          categoryId: {
            type: 'string',
            example: 'cat_123',
          },
          questions: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['q_1', 'q_2'],
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Question: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'q_123',
          },
          question: {
            type: 'string',
            example: 'What is a variable in JavaScript?',
          },
          answer: {
            type: 'string',
            example: 'A variable is a container for storing data values.',
          },
          explanation: {
            type: 'string',
            example: 'Variables are fundamental to programming...',
          },
          difficulty: {
            type: 'string',
            enum: ['easy', 'medium', 'hard'],
            example: 'easy',
          },
          category: {
            type: 'string',
            example: 'cat_123',
          },
          topic: {
            type: 'string',
            example: 'topic_123',
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
            },
            example: ['javascript', 'variables'],
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          updated_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'user_123',
          },
          name: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john@example.com',
          },
          role: {
            type: 'string',
            enum: ['user', 'premium_user', 'admin', 'super_admin'],
            example: 'user',
          },
          is_active: {
            type: 'boolean',
            example: true,
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
          lastLogin: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      AdminStats: {
        type: 'object',
        properties: {
          questions: {
            type: 'number',
            example: 150,
          },
          categories: {
            type: 'number',
            example: 25,
          },
          topics: {
            type: 'number',
            example: 75,
          },
          learningCards: {
            type: 'number',
            example: 5,
          },
          learningPlans: {
            type: 'number',
            example: 7,
          },
          frontendTasks: {
            type: 'number',
            example: 30,
          },
          problemSolvingTasks: {
            type: 'number',
            example: 20,
          },
          totalContent: {
            type: 'number',
            example: 312,
          },
          recentActivity: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                action: { type: 'string' },
                timestamp: { type: 'string', format: 'date-time' },
                user: { type: 'string' },
                details: { type: 'string' },
              },
            },
          },
          systemHealth: {
            type: 'object',
            properties: {
              databaseConnected: { type: 'boolean' },
              lastUpdated: { type: 'string', format: 'date-time' },
              apiResponseTime: { type: 'number' },
            },
          },
        },
      },
      BackupData: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'backup_123',
          },
          name: {
            type: 'string',
            example: 'Daily Backup',
          },
          description: {
            type: 'string',
            example: 'Automated daily backup',
          },
          collections: {
            type: 'object',
            additionalProperties: {
              type: 'array',
              items: { type: 'object' },
            },
          },
          metadata: {
            type: 'object',
            properties: {
              created_at: { type: 'string', format: 'date-time' },
              createdBy: { type: 'string' },
              version: { type: 'string' },
              totalDocuments: { type: 'number' },
              collectionsCount: { type: 'number' },
            },
          },
          status: {
            type: 'string',
            enum: ['completed', 'failed', 'in_progress'],
            example: 'completed',
          },
          error: {
            type: 'string',
            example: 'Error message if failed',
          },
        },
      },
      Notification: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: 'notif_123',
          },
          type: {
            type: 'string',
            enum: ['info', 'success', 'warning', 'error'],
            example: 'success',
          },
          title: {
            type: 'string',
            example: 'Backup Completed',
          },
          message: {
            type: 'string',
            example: 'Daily backup has been completed successfully',
          },
          userId: {
            type: 'string',
            example: 'user_123',
          },
          read: {
            type: 'boolean',
            example: false,
          },
          created_at: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: 'User and admin authentication endpoints',
    },
    {
      name: 'Learning Cards',
      description: 'Manage learning cards and their configurations',
    },
    {
      name: 'Learning Plans',
      description: 'Manage learning plans and schedules',
    },
    {
      name: 'Categories',
      description: 'Manage question categories',
    },
    {
      name: 'Topics',
      description: 'Manage topics within categories',
    },
    {
      name: 'Questions',
      description: 'Manage learning questions and content',
    },
    {
      name: 'Frontend Tasks',
      description: 'Manage frontend coding challenges',
    },
    {
      name: 'Problem Solving',
      description: 'Manage algorithmic problem-solving tasks',
    },
    {
      name: 'Learning Paths',
      description: 'Manage learning paths and roadmaps',
    },
    {
      name: 'Admin',
      description: 'Admin-only operations and statistics',
    },
    {
      name: 'Users',
      description: 'User management and profiles',
    },
    {
      name: 'Notifications',
      description: 'System notifications and alerts',
    },
    {
      name: 'Backup',
      description: 'Data backup and recovery operations',
    },
    {
      name: 'Logs',
      description: 'System logs and monitoring',
    },
  ],
  paths: {
    '/api/cards': {
      get: {
        summary: 'Get all learning cards',
        description: 'Retrieve all learning cards ordered by their order field',
        tags: ['Learning Cards'],
        responses: {
          '200': {
            description: 'Successfully retrieved learning cards',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/LearningCard',
                      },
                    },
                    count: {
                      type: 'number',
                      example: 5,
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new learning card',
        description: 'Create a new learning card with the provided data',
        tags: ['Learning Cards'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'description', 'type'],
                properties: {
                  name: {
                    type: 'string',
                    example: 'Core Technologies',
                  },
                  description: {
                    type: 'string',
                    example: 'Fundamental web technologies',
                  },
                  type: {
                    type: 'string',
                    enum: [
                      'core-technologies',
                      'framework-questions',
                      'problem-solving',
                      'system-design',
                      'frontend-tasks',
                    ],
                    example: 'core-technologies',
                  },
                  color: {
                    type: 'string',
                    example: '#3B82F6',
                  },
                  icon: {
                    type: 'string',
                    example: 'Code',
                  },
                  order: {
                    type: 'number',
                    example: 1,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Learning card created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/LearningCard',
                    },
                    message: {
                      type: 'string',
                      example: 'Card created successfully',
                    },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/stats': {
      get: {
        summary: 'Get admin statistics',
        description:
          'Retrieve comprehensive statistics for the admin dashboard',
        tags: ['Admin'],
        security: [
          {
            AdminAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved admin statistics',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AdminStats',
                },
              },
            },
          },
          '500': {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: {
                      type: 'string',
                    },
                    details: {
                      type: 'string',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
