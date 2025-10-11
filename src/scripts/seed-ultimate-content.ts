// v1.0 - Ultimate comprehensive seeding script
// Run with: npx tsx src/scripts/seed-ultimate-content.ts

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXlcfcdyIqoeJOb2gXcxpRSmQO7lEP82Y',
  authDomain: 'fir-demo-project-adffb.firebaseapp.com',
  projectId: 'fir-demo-project-adffb',
  storageBucket: 'fir-demo-project-adffb.firebasestorage.app',
  messagingSenderId: '76366138630',
  appId: '1:76366138630:web:0f3381c2f5a62e0401e287',
  measurementId: 'G-XZ5VKFGG4Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ==========================================
// Ultimate Frontend Tasks Collection
// ==========================================

const ultimateFrontendTasks = [
  {
    title: 'Build a Social Media Dashboard',
    description:
      'Create a comprehensive social media management dashboard with analytics, post scheduling, and engagement tracking.',
    difficulty: 'hard',
    category: 'React',
    tags: ['React', 'Dashboard', 'Analytics', 'Charts', 'Social Media'],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Media Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>`,
      'style.css': `body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    background-color: #f8fafc;
    color: #1e293b;
}

.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
}

.sidebar {
    background-color: #1e293b;
    color: white;
    padding: 20px;
}

.sidebar h2 {
    margin-bottom: 30px;
    color: #3b82f6;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.nav-item:hover {
    background-color: #334155;
}

.nav-item.active {
    background-color: #3b82f6;
}

.main-content {
    padding: 30px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.header h1 {
    margin: 0;
    font-size: 28px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #3b82f6;
}

.stat-value {
    font-size: 32px;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 8px;
}

.stat-label {
    color: #64748b;
    font-size: 14px;
}

.charts-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.chart-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
}

.chart-placeholder {
    height: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
}

.recent-posts {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #e2e8f0;
}

.post-item:last-child {
    border-bottom: none;
}

.post-avatar {
    width: 40px;
    height: 40px;
    background-color: #3b82f6;
    border-radius: 50%;
    margin-right: 12px;
}

.post-content {
    flex: 1;
}

.post-text {
    font-size: 14px;
    margin-bottom: 4px;
}

.post-meta {
    font-size: 12px;
    color: #64748b;
}

.post-engagement {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #64748b;
}

.engagement-item {
    display: flex;
    align-items: center;
    gap: 4px;
}`,
      'index.js': `import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Mock data
const mockStats = [
  { label: 'Total Followers', value: '125.4K', change: '+12.5%' },
  { label: 'Engagement Rate', value: '4.2%', change: '+0.8%' },
  { label: 'Posts This Month', value: '47', change: '+15' },
  { label: 'Reach', value: '89.2K', change: '+23.1%' }
];

const mockPosts = [
  {
    id: 1,
    platform: 'Twitter',
    text: 'Just launched our new product! Check it out...',
    time: '2 hours ago',
    likes: 234,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    platform: 'Instagram',
    text: 'Behind the scenes of our latest campaign',
    time: '5 hours ago',
    likes: 1890,
    comments: 78,
    shares: 34
  },
  {
    id: 3,
    platform: 'LinkedIn',
    text: 'Industry insights: The future of digital marketing',
    time: '1 day ago',
    likes: 456,
    comments: 23,
    shares: 67
  }
];

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'schedule', label: 'Schedule', icon: '⏰' },
    { id: 'audience', label: 'Audience', icon: '👥' }
  ];

  return (
    <div className="sidebar">
      <h2>SocialDash</h2>
      <nav>
        {navItems.map(item => (
          <div 
            key={item.id}
            className={\`nav-item \${activeTab === item.id ? 'active' : ''}\`}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={{ marginRight: '12px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
      <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
        {stat.change}
      </div>
    </div>
  );
}

function ChartCard({ title, type }) {
  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <div className="chart-placeholder">
        {type} Chart Placeholder
      </div>
    </div>
  );
}

function PostItem({ post }) {
  return (
    <div className="post-item">
      <div className="post-avatar"></div>
      <div className="post-content">
        <div className="post-text">{post.text}</div>
        <div className="post-meta">{post.platform} • {post.time}</div>
      </div>
      <div className="post-engagement">
        <div className="engagement-item">
          <span>❤️</span>
          <span>{post.likes}</span>
        </div>
        <div className="engagement-item">
          <span>💬</span>
          <span>{post.comments}</span>
        </div>
        <div className="engagement-item">
          <span>🔄</span>
          <span>{post.shares}</span>
        </div>
      </div>
    </div>
  );
}

function SocialMediaDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-content">
        <div className="header">
          <h1>Dashboard Overview</h1>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            + New Post
          </button>
        </div>

        <div className="stats-grid">
          {mockStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="charts-section">
          <ChartCard title="Engagement Over Time" type="Line" />
          <ChartCard title="Platform Distribution" type="Pie" />
        </div>

        <div className="recent-posts">
          <div className="chart-title">Recent Posts</div>
          {mockPosts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SocialMediaDashboard />);`,
    },
    solutionCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Social Media Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="root"></div>
    <script src="index.js"></script>
</body>
</html>`,
      'style.css': `body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    background-color: #f8fafc;
    color: #1e293b;
}

.dashboard {
    display: grid;
    grid-template-columns: 250px 1fr;
    min-height: 100vh;
}

.sidebar {
    background-color: #1e293b;
    color: white;
    padding: 20px;
}

.sidebar h2 {
    margin-bottom: 30px;
    color: #3b82f6;
}

.nav-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.nav-item:hover {
    background-color: #334155;
}

.nav-item.active {
    background-color: #3b82f6;
}

.main-content {
    padding: 30px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.header h1 {
    margin: 0;
    font-size: 28px;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #3b82f6;
}

.stat-value {
    font-size: 32px;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 8px;
}

.stat-label {
    color: #64748b;
    font-size: 14px;
}

.charts-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.chart-card {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
}

.chart-placeholder {
    height: 300px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
}

.recent-posts {
    background: white;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #e2e8f0;
}

.post-item:last-child {
    border-bottom: none;
}

.post-avatar {
    width: 40px;
    height: 40px;
    background-color: #3b82f6;
    border-radius: 50%;
    margin-right: 12px;
}

.post-content {
    flex: 1;
}

.post-text {
    font-size: 14px;
    margin-bottom: 4px;
}

.post-meta {
    font-size: 12px;
    color: #64748b;
}

.post-engagement {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #64748b;
}

.engagement-item {
    display: flex;
    align-items: center;
    gap: 4px;
}`,
      'index.js': `import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

// Mock data
const mockStats = [
  { label: 'Total Followers', value: '125.4K', change: '+12.5%' },
  { label: 'Engagement Rate', value: '4.2%', change: '+0.8%' },
  { label: 'Posts This Month', value: '47', change: '+15' },
  { label: 'Reach', value: '89.2K', change: '+23.1%' }
];

const mockPosts = [
  {
    id: 1,
    platform: 'Twitter',
    text: 'Just launched our new product! Check it out...',
    time: '2 hours ago',
    likes: 234,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    platform: 'Instagram',
    text: 'Behind the scenes of our latest campaign',
    time: '5 hours ago',
    likes: 1890,
    comments: 78,
    shares: 34
  },
  {
    id: 3,
    platform: 'LinkedIn',
    text: 'Industry insights: The future of digital marketing',
    time: '1 day ago',
    likes: 456,
    comments: 23,
    shares: 67
  }
];

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'posts', label: 'Posts', icon: '📝' },
    { id: 'schedule', label: 'Schedule', icon: '⏰' },
    { id: 'audience', label: 'Audience', icon: '👥' }
  ];

  return (
    <div className="sidebar">
      <h2>SocialDash</h2>
      <nav>
        {navItems.map(item => (
          <div 
            key={item.id}
            className={\`nav-item \${activeTab === item.id ? 'active' : ''}\`}
            onClick={() => setActiveTab(item.id)}
          >
            <span style={{ marginRight: '12px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
      <div style={{ fontSize: '12px', color: '#10b981', marginTop: '4px' }}>
        {stat.change}
      </div>
    </div>
  );
}

function ChartCard({ title, type }) {
  return (
    <div className="chart-card">
      <div className="chart-title">{title}</div>
      <div className="chart-placeholder">
        {type} Chart Placeholder
      </div>
    </div>
  );
}

function PostItem({ post }) {
  return (
    <div className="post-item">
      <div className="post-avatar"></div>
      <div className="post-content">
        <div className="post-text">{post.text}</div>
        <div className="post-meta">{post.platform} • {post.time}</div>
      </div>
      <div className="post-engagement">
        <div className="engagement-item">
          <span>❤️</span>
          <span>{post.likes}</span>
        </div>
        <div className="engagement-item">
          <span>💬</span>
          <span>{post.comments}</span>
        </div>
        <div className="engagement-item">
          <span>🔄</span>
          <span>{post.shares}</span>
        </div>
      </div>
    </div>
  );
}

function SocialMediaDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-content">
        <div className="header">
          <h1>Dashboard Overview</h1>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            + New Post
          </button>
        </div>

        <div className="stats-grid">
          {mockStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="charts-section">
          <ChartCard title="Engagement Over Time" type="Line" />
          <ChartCard title="Platform Distribution" type="Pie" />
        </div>

        <div className="recent-posts">
          <div className="chart-title">Recent Posts</div>
          {mockPosts.map(post => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SocialMediaDashboard />);`,
    },
    testCases: [],
    hints: [
      'Integrate real charting libraries like Chart.js or Recharts',
      'Add real-time data updates using WebSocket connections',
      'Implement post scheduling functionality with date/time pickers',
      'Add social media API integrations for actual data',
    ],
    requirements: [
      'Display key metrics in stat cards with trend indicators',
      'Show engagement charts and analytics',
      'List recent posts with engagement metrics',
      'Implement responsive sidebar navigation',
      'Add interactive elements and hover effects',
    ],
    solutionExplanation:
      'This social media dashboard demonstrates advanced React patterns including state management, component composition, and data visualization. The app features a sidebar navigation, statistics grid, chart placeholders, and a recent posts feed with engagement metrics.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// ==========================================
// Ultimate Problem-Solving Tasks Collection
// ==========================================

const ultimateProblemSolvingTasks = [
  {
    id: 'problem-solving-030',
    title: 'Merge k Sorted Lists',
    description:
      'You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.',
    difficulty: 'hard',
    category: 'Linked Lists',
    tags: ['linked-list', 'divide-and-conquer', 'heap', 'merge-sort'],
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '0 <= lists[i].length <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'lists[i] is sorted in ascending order.',
      'The sum of lists[i].length will not exceed 10^4.',
    ],
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation:
          'Merging the lists: [1,4,5] + [1,3,4] + [2,6] = [1,1,2,3,4,4,5,6]',
      },
      {
        input: 'lists = []',
        output: '[]',
        explanation: 'Empty list',
      },
      {
        input: 'lists = [[]]',
        output: '[]',
        explanation: 'Single empty list',
      },
    ],
    testCases: [
      {
        input: '[[1,4,5],[1,3,4],[2,6]]',
        expectedOutput: '[1,1,2,3,4,4,5,6]',
      },
      {
        input: '[]',
        expectedOutput: '[]',
      },
      {
        input: '[[]]',
        expectedOutput: '[]',
      },
    ],
    starterCode: `function mergeKLists(lists) {
    // Your code here
}`,
    solutionCode: `function mergeKLists(lists) {
    if (!lists || lists.length === 0) return null;
    
    while (lists.length > 1) {
        const mergedLists = [];
        
        for (let i = 0; i < lists.length; i += 2) {
            const l1 = lists[i];
            const l2 = lists[i + 1] || null;
            mergedLists.push(mergeTwoLists(l1, l2));
        }
        
        lists = mergedLists;
    }
    
    return lists[0];
}

function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    current.next = l1 || l2;
    return dummy.next;
}`,
    hints: [
      'Use divide and conquer approach',
      'Merge lists in pairs until only one list remains',
      'Use the merge two sorted lists algorithm',
      'Time complexity: O(n log k), Space complexity: O(1)',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-031',
    title: 'Copy List with Random Pointer',
    description:
      'A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.',
    difficulty: 'medium',
    category: 'Linked Lists',
    tags: ['linked-list', 'hash-table'],
    constraints: [
      '0 <= n <= 1000',
      '-10^4 <= Node.val <= 10^4',
      'Node.random is null or is pointing to some node in the linked list.',
    ],
    examples: [
      {
        input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]',
        output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        explanation: 'Deep copy of the original list',
      },
      {
        input: 'head = [[1,1],[2,1]]',
        output: '[[1,1],[2,1]]',
        explanation: 'Deep copy with random pointers',
      },
      {
        input: 'head = [[3,null],[3,0],[3,null]]',
        output: '[[3,null],[3,0],[3,null]]',
        explanation: 'Deep copy with multiple random pointers',
      },
    ],
    testCases: [
      {
        input: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
        expectedOutput: '[[7,null],[13,0],[11,4],[10,2],[1,0]]',
      },
      {
        input: '[[1,1],[2,1]]',
        expectedOutput: '[[1,1],[2,1]]',
      },
      {
        input: '[[3,null],[3,0],[3,null]]',
        expectedOutput: '[[3,null],[3,0],[3,null]]',
      },
    ],
    starterCode: `function copyRandomList(head) {
    // Your code here
}`,
    solutionCode: `function copyRandomList(head) {
    if (!head) return null;
    
    const map = new Map();
    let current = head;
    
    // First pass: create new nodes and map old to new
    while (current) {
        map.set(current, new Node(current.val));
        current = current.next;
    }
    
    // Second pass: set next and random pointers
    current = head;
    while (current) {
        const newNode = map.get(current);
        if (current.next) {
            newNode.next = map.get(current.next);
        }
        if (current.random) {
            newNode.random = map.get(current.random);
        }
        current = current.next;
    }
    
    return map.get(head);
}`,
    hints: [
      'Use a hash map to store old node to new node mapping',
      'Two-pass approach: first create nodes, then set pointers',
      'Handle null pointers for next and random',
      'Time complexity: O(n), Space complexity: O(n)',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
  {
    id: 'problem-solving-032',
    title: 'Find the Duplicate Number',
    description:
      'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number.',
    difficulty: 'medium',
    category: 'Arrays',
    tags: ['array', 'two-pointers', 'binary-search'],
    constraints: [
      '1 <= n <= 10^5',
      'nums.length == n + 1',
      '1 <= nums[i] <= n',
      'All the integers in nums appear only once except for precisely one integer which appears two or more times.',
    ],
    examples: [
      {
        input: 'nums = [1,3,4,2,2]',
        output: '2',
        explanation: 'The duplicate number is 2',
      },
      {
        input: 'nums = [3,1,3,4,2]',
        output: '3',
        explanation: 'The duplicate number is 3',
      },
      {
        input: 'nums = [1,1]',
        output: '1',
        explanation: 'The duplicate number is 1',
      },
    ],
    testCases: [
      {
        input: '[1,3,4,2,2]',
        expectedOutput: '2',
      },
      {
        input: '[3,1,3,4,2]',
        expectedOutput: '3',
      },
      {
        input: '[1,1]',
        expectedOutput: '1',
      },
    ],
    starterCode: `function findDuplicate(nums) {
    // Your code here
}`,
    solutionCode: `function findDuplicate(nums) {
    // Floyd's cycle detection algorithm
    let slow = nums[0];
    let fast = nums[0];
    
    // Phase 1: Find intersection point
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow !== fast);
    
    // Phase 2: Find entrance to cycle
    slow = nums[0];
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    
    return slow;
}`,
    hints: [
      'Use Floyd cycle detection algorithm',
      'Treat the array as a linked list where nums[i] points to nums[nums[i]]',
      'Find the cycle and then find the entrance to the cycle',
      'Time complexity: O(n), Space complexity: O(1)',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'seeding-script',
    updatedBy: 'seeding-script',
  },
];

// ==========================================
// Seeding Functions
// ==========================================

async function seedUltimateFrontendTasks() {
  console.log('🎨 Starting ultimate frontend tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of ultimateFrontendTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        collection(db, 'frontendTasks'),
        where('title', '==', task.title)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        await addDoc(collection(db, 'frontendTasks'), task);
        successCount++;
        console.log(`✅ Added frontend task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Frontend task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ Error adding frontend task ${task.title}:`, error);
    }
  }

  console.log('🎉 Ultimate frontend tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${ultimateFrontendTasks.length}`);
}

async function seedUltimateProblemSolvingTasks() {
  console.log('🧮 Starting ultimate problem-solving tasks seeding...');

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const task of ultimateProblemSolvingTasks) {
    try {
      // Check if task already exists
      const existingQuery = query(
        collection(db, 'problemSolvingTasks'),
        where('id', '==', task.id)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (existingSnapshot.empty) {
        await addDoc(collection(db, 'problemSolvingTasks'), task);
        successCount++;
        console.log(`✅ Added problem-solving task: ${task.title}`);
      } else {
        skipCount++;
        console.log(`⏭️  Problem-solving task already exists: ${task.title}`);
      }
    } catch (error) {
      errorCount++;
      console.error(
        `❌ Error adding problem-solving task ${task.title}:`,
        error
      );
    }
  }

  console.log('🎉 Ultimate problem-solving tasks seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   - Successfully added: ${successCount}`);
  console.log(`   - Skipped (already exist): ${skipCount}`);
  console.log(`   - Errors: ${errorCount}`);
  console.log(`   - Total processed: ${ultimateProblemSolvingTasks.length}`);
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🚀 Starting ultimate content seeding process...');

  try {
    await seedUltimateFrontendTasks();
    console.log('\\n');
    await seedUltimateProblemSolvingTasks();

    console.log('\\n🎉 All ultimate content seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

main().catch(console.error);
