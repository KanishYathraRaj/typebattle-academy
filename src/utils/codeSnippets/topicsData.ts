
import { dsaCategories } from './types';
import { categoryDescriptions } from './data/topicDescriptions';
import { arraysHashingTopics } from './data/arraysHashingTopics';
import { twoPointersTopics, slidingWindowTopics } from './data/twoPointersSliding';
import { stackTopics, binarySearchTopics } from './data/stackBinarySearch';
import { linkedListTopics, treesTopics } from './data/linkedListTrees';
import { triesTopics, heapTopics, backtrackingTopics } from './data/triesHeapBacktracking';
import { graphsTopics, dpTopics } from './data/graphsDp';

// Combine all topic data into a single record
export const topicsWithDescriptions: Record<string, Record<string, { description: string, difficulty: 'Easy' | 'Medium' | 'Hard' }>> = {
  'Arrays & Hashing': arraysHashingTopics,
  'Two Pointers': twoPointersTopics,
  'Sliding Window': slidingWindowTopics,
  'Stack': stackTopics,
  'Binary Search': binarySearchTopics,
  'Linked List': linkedListTopics,
  'Trees': treesTopics,
  'Tries': triesTopics,
  'Heap / Priority Queue': heapTopics,
  'Backtracking': backtrackingTopics,
  'Graphs': graphsTopics,
  'Dynamic Programming': dpTopics
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

// Export the category descriptions
export { categoryDescriptions };
