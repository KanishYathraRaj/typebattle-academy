
import { dsaCategories } from './types';

// Topics within each category with their descriptions
export const topicsWithDescriptions: Record<string, Record<string, { description: string, difficulty: 'Easy' | 'Medium' | 'Hard' }>> = {
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

// Function to get available topics for a category
export const getTopics = (category: string): string[] => {
  if (!topicsWithDescriptions[category]) return [];
  return Object.keys(topicsWithDescriptions[category]);
};

// Get topic difficulty 
export const getTopicDifficulty = (category: string, topic: string): 'Easy' | 'Medium' | 'Hard' | undefined => {
  if (!topicsWithDescriptions[category] || !topicsWithDescriptions[category][topic]) return undefined;
  return topicsWithDescriptions[category][topic].difficulty;
};

// Get category description
export const getCategoryDescription = (category: string): string => {
  return categoryDescriptions[category] || '';
};

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
