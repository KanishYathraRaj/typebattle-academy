
// Collection of algorithm code snippets for typing tests organized by NeetCode.io curriculum
export type CodeSnippet = {
  id: string;
  category: string; // NeetCode category
  topic: string;    // Specific algorithm or problem
  language: string;
  code: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

// Define NeetCode.io categories
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

const languageTypes = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];

// Create detailed descriptions for categories
const categoryDescriptions: Record<string, string> = {
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

// Topics within each category with their descriptions
const topicsWithDescriptions: Record<string, Record<string, { description: string, difficulty: 'Easy' | 'Medium' | 'Hard' }>> = {
  'Arrays & Hashing': {
    'Contains Duplicate': { 
      description: 'Determine if an array contains duplicate values.',
      difficulty: 'Easy'
    },
    'Valid Anagram': { 
      description: 'Check if two strings are anagrams of each other.',
      difficulty: 'Easy'
    },
    'Two Sum': { 
      description: 'Find two numbers in an array that add up to a target.',
      difficulty: 'Easy'
    },
    'Group Anagrams': { 
      description: 'Group strings that are anagrams of each other.',
      difficulty: 'Medium'
    },
    'Top K Frequent Elements': { 
      description: 'Find the k most frequent elements in an array.',
      difficulty: 'Medium'
    }
  },
  'Two Pointers': {
    'Valid Palindrome': { 
      description: 'Determine if a string is a valid palindrome.',
      difficulty: 'Easy'
    },
    'Two Sum II': { 
      description: 'Find two numbers in a sorted array that add up to a target.',
      difficulty: 'Medium'
    },
    '3Sum': { 
      description: 'Find all unique triplets in the array that sum to zero.',
      difficulty: 'Medium'
    },
    'Container With Most Water': { 
      description: 'Find two lines that form a container with the most water.',
      difficulty: 'Medium'
    }
  },
  'Sliding Window': {
    'Best Time to Buy and Sell Stock': { 
      description: 'Find the maximum profit from buying and selling a stock.',
      difficulty: 'Easy'
    },
    'Longest Substring Without Repeating Characters': { 
      description: 'Find the length of the longest substring without repeating characters.',
      difficulty: 'Medium'
    },
    'Longest Repeating Character Replacement': { 
      description: 'Find the length of the longest substring with the same letter after replacements.',
      difficulty: 'Medium'
    }
  },
  'Stack': {
    'Valid Parentheses': { 
      description: 'Determine if a string of parentheses is valid.',
      difficulty: 'Easy'
    },
    'Min Stack': { 
      description: 'Design a stack that supports push, pop, top, and retrieving the minimum element.',
      difficulty: 'Medium'
    },
    'Evaluate Reverse Polish Notation': { 
      description: 'Evaluate the value of an arithmetic expression in Reverse Polish Notation.',
      difficulty: 'Medium'
    }
  },
  'Binary Search': {
    'Binary Search': { 
      description: 'Find a target value in a sorted array.',
      difficulty: 'Easy'
    },
    'Search a 2D Matrix': { 
      description: 'Search for a value in an m x n matrix.',
      difficulty: 'Medium'
    },
    'Find Minimum in Rotated Sorted Array': { 
      description: 'Find the minimum element in a rotated sorted array.',
      difficulty: 'Medium'
    }
  },
  'Linked List': {
    'Reverse Linked List': { 
      description: 'Reverse a singly linked list.',
      difficulty: 'Easy'
    },
    'Merge Two Sorted Lists': { 
      description: 'Merge two sorted linked lists into one sorted list.',
      difficulty: 'Easy'
    },
    'Reorder List': { 
      description: 'Reorder a linked list in a specific pattern.',
      difficulty: 'Medium'
    },
    'Remove Nth Node From End': { 
      description: 'Remove the nth node from the end of a linked list.',
      difficulty: 'Medium'
    }
  },
  'Trees': {
    'Invert Binary Tree': { 
      description: 'Invert a binary tree.',
      difficulty: 'Easy'
    },
    'Maximum Depth of Binary Tree': { 
      description: 'Find the maximum depth of a binary tree.',
      difficulty: 'Easy'
    },
    'Same Tree': { 
      description: 'Check if two binary trees are the same.',
      difficulty: 'Easy'
    },
    'Binary Tree Level Order Traversal': { 
      description: 'Traverse a binary tree in level order.',
      difficulty: 'Medium'
    }
  },
  'Tries': {
    'Implement Trie': { 
      description: 'Implement a trie with insert, search, and startsWith methods.',
      difficulty: 'Medium'
    },
    'Word Search II': { 
      description: 'Find all words in a board using a trie.',
      difficulty: 'Hard'
    }
  },
  'Heap / Priority Queue': {
    'Kth Largest Element': { 
      description: 'Find the kth largest element in an array.',
      difficulty: 'Medium'
    },
    'Last Stone Weight': { 
      description: 'Find the weight of the last stone after smashing them together.',
      difficulty: 'Easy'
    }
  },
  'Backtracking': {
    'Subsets': { 
      description: 'Find all possible subsets of a set of distinct integers.',
      difficulty: 'Medium'
    },
    'Combination Sum': { 
      description: 'Find all unique combinations that sum to a target.',
      difficulty: 'Medium'
    },
    'Permutations': { 
      description: 'Generate all possible permutations of an array of distinct integers.',
      difficulty: 'Medium'
    }
  },
  'Graphs': {
    'Number of Islands': { 
      description: 'Count the number of islands in a 2D grid.',
      difficulty: 'Medium'
    },
    'Clone Graph': { 
      description: 'Create a deep copy of a graph.',
      difficulty: 'Medium'
    },
    'Pacific Atlantic Water Flow': { 
      description: 'Find cells where water can flow to both Pacific and Atlantic oceans.',
      difficulty: 'Medium'
    }
  },
  'Dynamic Programming': {
    'Climbing Stairs': { 
      description: 'Count the number of ways to climb n stairs.',
      difficulty: 'Easy'
    },
    'House Robber': { 
      description: 'Find the maximum amount of money you can rob without alerting the police.',
      difficulty: 'Medium'
    },
    'Longest Increasing Subsequence': { 
      description: 'Find the length of the longest strictly increasing subsequence.',
      difficulty: 'Medium'
    }
  }
};

// Define implementation templates for each topic and language
const implementations: Record<string, Record<string, Record<string, string>>> = {
  'Arrays & Hashing': {
    'Contains Duplicate': {
      'JavaScript': `function containsDuplicate(nums) {
  const seen = new Set();
  
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
}`,
      'TypeScript': `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
}`,
      'Python': `def contains_duplicate(nums):
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False`,
      'Java': `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    
    for (int num : nums) {
        if (seen.contains(num)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}`,
      'C++': `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> seen;
    
    for (int num : nums) {
        if (seen.count(num) > 0) {
            return true;
        }
        seen.insert(num);
    }
    
    return false;
}`
    },
    'Valid Anagram': {
      'JavaScript': `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }
  
  const charCount = {};
  
  for (let i = 0; i < s.length; i++) {
    charCount[s[i]] = (charCount[s[i]] || 0) + 1;
    charCount[t[i]] = (charCount[t[i]] || 0) - 1;
  }
  
  for (const count of Object.values(charCount)) {
    if (count !== 0) {
      return false;
    }
  }
  
  return true;
}`,
      'TypeScript': `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }
  
  const charCount: Record<string, number> = {};
  
  for (let i = 0; i < s.length; i++) {
    charCount[s[i]] = (charCount[s[i]] || 0) + 1;
    charCount[t[i]] = (charCount[t[i]] || 0) - 1;
  }
  
  for (const count of Object.values(charCount)) {
    if (count !== 0) {
      return false;
    }
  }
  
  return true;
}`,
      'Python': `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    
    char_count = {}
    
    for c1, c2 in zip(s, t):
        char_count[c1] = char_count.get(c1, 0) + 1
        char_count[c2] = char_count.get(c2, 0) - 1
    
    for count in char_count.values():
        if count != 0:
            return False
    
    return True`,
      'Java': `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) {
        return false;
    }
    
    Map<Character, Integer> charCount = new HashMap<>();
    
    for (int i = 0; i < s.length(); i++) {
        char c1 = s.charAt(i);
        char c2 = t.charAt(i);
        
        charCount.put(c1, charCount.getOrDefault(c1, 0) + 1);
        charCount.put(c2, charCount.getOrDefault(c2, 0) - 1);
    }
    
    for (int count : charCount.values()) {
        if (count != 0) {
            return false;
        }
    }
    
    return true;
}`,
      'C++': `bool isAnagram(string s, string t) {
    if (s.length() != t.length()) {
        return false;
    }
    
    unordered_map<char, int> charCount;
    
    for (int i = 0; i < s.length(); i++) {
        charCount[s[i]]++;
        charCount[t[i]]--;
    }
    
    for (auto& pair : charCount) {
        if (pair.second != 0) {
            return false;
        }
    }
    
    return true;
}`
    },
    'Two Sum': {
      'JavaScript': `function twoSum(nums, target) {
  const numMap = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    
    numMap.set(nums[i], i);
  }
  
  return [];
}`,
      'TypeScript': `function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numMap.has(complement)) {
      return [numMap.get(complement)!, i];
    }
    
    numMap.set(nums[i], i);
  }
  
  return [];
}`,
      'Python': `def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_map:
            return [num_map[complement], i]
        
        num_map[num] = i
    
    return []`,
      'Java': `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> numMap = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        if (numMap.containsKey(complement)) {
            return new int[] {numMap.get(complement), i};
        }
        
        numMap.put(nums[i], i);
    }
    
    return new int[] {};
}`,
      'C++': `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (numMap.count(complement) > 0) {
            return {numMap[complement], i};
        }
        
        numMap[nums[i]] = i;
    }
    
    return {};
}`
    }
  },
  'Binary Search': {
    'Binary Search': {
      'JavaScript': `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
      'TypeScript': `function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) {
      return mid;
    }
    
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
      'Python': `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
      'Java': `public int search(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`,
      'C++': `int search(vector<int>& nums, int target) {
    int left = 0;
    int right = nums.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}`
    }
  },
  'Dynamic Programming': {
    'Climbing Stairs': {
      'JavaScript': `function climbStairs(n) {
  if (n <= 2) {
    return n;
  }
  
  let prev1 = 1;
  let prev2 = 2;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }
  
  return prev2;
}`,
      'TypeScript': `function climbStairs(n: number): number {
  if (n <= 2) {
    return n;
  }
  
  let prev1 = 1;
  let prev2 = 2;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }
  
  return prev2;
}`,
      'Python': `def climb_stairs(n):
    if n <= 2:
        return n
    
    prev1, prev2 = 1, 2
    
    for i in range(3, n + 1):
        current = prev1 + prev2
        prev1 = prev2
        prev2 = current
    
    return prev2`,
      'Java': `public int climbStairs(int n) {
    if (n <= 2) {
        return n;
    }
    
    int prev1 = 1;
    int prev2 = 2;
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return prev2;
}`,
      'C++': `int climbStairs(int n) {
    if (n <= 2) {
        return n;
    }
    
    int prev1 = 1;
    int prev2 = 2;
    
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    
    return prev2;
}`
    }
  }
};

// Generate the code snippets array from our structured data
const codeSnippets: CodeSnippet[] = [];

// For each category, topic, and language combination, create a code snippet
dsaCategories.forEach(category => {
  if (!topicsWithDescriptions[category]) return;
  
  Object.entries(topicsWithDescriptions[category]).forEach(([topic, details]) => {
    if (!implementations[category] || !implementations[category][topic]) return;
    
    Object.entries(implementations[category][topic]).forEach(([language, code]) => {
      codeSnippets.push({
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-${topic.toLowerCase().replace(/\s+/g, '-')}-${language.toLowerCase()}`,
        category,
        topic,
        language,
        code,
        description: details.description,
        difficulty: details.difficulty
      });
    });
  });
});

// Helper functions that work with the snippets

// Get available categories
export const getCategories = (): string[] => {
  return dsaCategories;
};

// Get available languages
export const getLanguages = (): string[] => {
  return languageTypes;
};

// Get topics for a specific category
export const getTopics = (category: string): string[] => {
  if (!topicsWithDescriptions[category]) return [];
  return Object.keys(topicsWithDescriptions[category]);
};

// Get all code snippets for a specific category, topic, and language
export const getCodeSnippets = (category?: string, topic?: string, language?: string): CodeSnippet[] => {
  let filteredSnippets = [...codeSnippets];
  
  if (category) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.category === category);
  }
  
  if (topic) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.topic === topic);
  }
  
  if (language) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.language === language);
  }
  
  return filteredSnippets;
};

// Get a specific code snippet
export const getCodeSnippet = (category: string, topic: string, language: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => 
    snippet.category === category && 
    snippet.topic === topic && 
    snippet.language === language
  );
};

// Get a random code snippet, but respecting category, topic, and language filters
export const getRandomCodeSnippet = (category?: string, topic?: string, language?: string): CodeSnippet => {
  const filteredSnippets = getCodeSnippets(category, topic, language);
  
  if (filteredSnippets.length === 0) {
    // If no snippets match the criteria, return a random one from all snippets
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  }
  
  return filteredSnippets[Math.floor(Math.random() * filteredSnippets.length)];
};

// Get category description
export const getCategoryDescription = (category: string): string => {
  return categoryDescriptions[category] || '';
};

// Get topic difficulty
export const getTopicDifficulty = (category: string, topic: string): 'Easy' | 'Medium' | 'Hard' | undefined => {
  if (!topicsWithDescriptions[category] || !topicsWithDescriptions[category][topic]) return undefined;
  return topicsWithDescriptions[category][topic].difficulty;
};

// Get a specific code snippet by ID
export const getCodeSnippetById = (id: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => snippet.id === id);
};
