// Simple seeding script for problem solving tasks
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const problemSolvingTasks = [
  {
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: 'Arrays',
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
    // Your code here
    return [];
}`,
    solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
    testCases: [
      { id: 't1', input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { id: 't2', input: [[3, 2, 4], 6], expected: [1, 2] },
      { id: 't3', input: [[3, 3], 6], expected: [0, 1] },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
    ],
    tags: ['hash-table', 'array'],
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
  },
];

async function seedProblemSolvingTasks() {
  try {
    console.log('🌱 Starting to seed problem solving tasks...');

    for (const task of problemSolvingTasks) {
      const docRef = await addDoc(supabase.from('problemSolvingTasks'), task);
      console.log(`✅ Added problem: ${task.title} with ID: ${docRef.id}`);
    }

    console.log('🎉 Successfully seeded all problem solving tasks!');
    console.log(`📊 Total tasks seeded: ${problemSolvingTasks.length}`);
  } catch (error) {
    console.error('❌ Error seeding problem solving tasks:', error);
  }
}

// Run the seeding function
seedProblemSolvingTasks();
