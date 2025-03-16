
// Define core types for code snippets
export type CodeSnippet = {
  id: string;
  category: string; // NeetCode category
  topic: string;    // Specific algorithm or problem
  language: string;
  code: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

// Categories and languages constants
export const dsaCategories = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Linked List',
  'Trees',
  'Tries',
  'Heap / Priority Queue',
  'Backtracking',
  'Graphs',
  'Dynamic Programming',
  'Greedy',
  'Intervals',
  'Math & Geometry',
  'Bit Manipulation'
];

export const languageTypes = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

// Create detailed descriptions for categories
export const categoryDescriptions: Record<string, string> = {
  'Arrays & Hashing': 'Problems involving arrays, hash tables, and string manipulation.',
  'Two Pointers': 'Using two pointers to solve array problems with less time/space complexity.',
  'Sliding Window': 'Efficiently processing subarrays/substrings by maintaining a window.',
  'Stack': 'Using stack data structure to solve problems with LIFO operations.',
  'Binary Search': 'Efficiently finding elements in sorted collections by repeatedly dividing the search space.',
  'Linked List': 'Problems involving singly or doubly linked lists and pointer manipulation.',
  'Trees': 'Binary trees, BSTs, and tree traversal algorithms.',
  'Tries': 'Specialized tree structures for efficient string operations.',
  'Heap / Priority Queue': 'Problems requiring priority queues or heap data structures.',
  'Backtracking': 'Exploration-based problem solving with constraint satisfaction.',
  'Graphs': 'Graph traversal, shortest paths, and connectivity problems.',
  'Dynamic Programming': 'Breaking down complex problems into simpler overlapping subproblems.',
  'Greedy': 'Making locally optimal choices at each step to find global optimum.',
  'Intervals': 'Problems involving ranges, intervals, and their operations.',
  'Math & Geometry': 'Mathematical algorithms and geometric problem solving.',
  'Bit Manipulation': 'Manipulating individual bits to optimize solutions.'
};
