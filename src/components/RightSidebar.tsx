
import React from 'react';
import StatisticsPanel from './StatisticsPanel';
import { useTest } from '../context/TestContext';
import { useTypingTest } from '../hooks/useTypingTest';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown } from 'lucide-react';

// DSA syllabus structure
const dsaSyllabus = [
  {
    topic: "Arrays & Strings",
    subtopics: [
      "Two Pointers", "Sliding Window", "Prefix Sum", "String Manipulation"
    ]
  },
  {
    topic: "Linked Lists",
    subtopics: [
      "Singly Linked", "Doubly Linked", "Fast & Slow Pointers", "Reversal"
    ]
  },
  {
    topic: "Stacks & Queues",
    subtopics: [
      "Monotonic Stack", "Queue Implementation", "Circular Queue", "Priority Queue"
    ]
  },
  {
    topic: "Trees & Graphs",
    subtopics: [
      "Binary Trees", "BST", "DFS", "BFS", "Trie", "Union Find"
    ]
  },
  {
    topic: "Heaps",
    subtopics: [
      "Min Heap", "Max Heap", "Heap Operations", "K-th Element Problems"
    ]
  },
  {
    topic: "Dynamic Programming",
    subtopics: [
      "1D DP", "2D DP", "Knapsack", "LCS", "LIS"
    ]
  },
  {
    topic: "Greedy Algorithms",
    subtopics: [
      "Interval Scheduling", "Huffman Coding", "Activity Selection"
    ]
  },
  {
    topic: "Sorting & Searching",
    subtopics: [
      "Binary Search", "Merge Sort", "Quick Sort", "Counting Sort"
    ]
  },
  {
    topic: "Backtracking",
    subtopics: [
      "Permutations", "Combinations", "Subsets", "N-Queens"
    ]
  },
  {
    topic: "Bit Manipulation",
    subtopics: [
      "Bit Operations", "Bit Masks", "Power Set"
    ]
  }
];

const RightSidebar: React.FC = () => {
  const { isTestActive, currentSnippet } = useTest();
  const { wpm, accuracy, currentTime, errorCount, isComplete } = useTypingTest();
  
  return (
    <div className="w-full md:w-80 lg:w-96 space-y-6">
      {/* Statistics Panel */}
      {(isTestActive || isComplete) && (
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsPanel 
              wpm={wpm} 
              accuracy={accuracy} 
              time={currentTime} 
              errorCount={errorCount} 
            />
          </CardContent>
        </Card>
      )}
      
      {/* Current Topic */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Currently Practicing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="font-medium">{currentSnippet.algorithm}</div>
            <div className="text-muted-foreground mt-1">{currentSnippet.language}</div>
            <div className="mt-2 text-xs leading-relaxed">{currentSnippet.description}</div>
          </div>
        </CardContent>
      </Card>
      
      {/* DSA Syllabus */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">DSA Syllabus</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-450px)] overflow-y-auto pr-1">
          <div className="space-y-4">
            {dsaSyllabus.map((section, index) => (
              <div key={index} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between font-medium">
                  <span>{section.topic}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
                <div className="mt-2 pl-3 space-y-1">
                  {section.subtopics.map((subtopic, i) => (
                    <div key={i} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {subtopic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
