import React, { useState } from 'react';
import { useTest } from '../context/TestContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronDown, ChevronRight, Code } from 'lucide-react';
import { getCategories, getLanguages, getTopics } from '../utils/codeSnippets';

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

const LeftSidebar: React.FC = () => {
  const { changeSnippet } = useTest();
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  
  // Get available categories and languages from codeSnippets utility
  const categories = getCategories();
  const languages = getLanguages();
  
  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic) 
        : [...prev, topic]
    );
  };
  
  const handleCategorySelect = (category: string) => {
    changeSnippet(category, selectedLanguage || undefined);
  };
  
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    // If a language is selected, keep the current category if any
    const currentCategory = document.querySelector('.algorithm-item.selected')?.textContent || undefined;
    changeSnippet(currentCategory, language);
  };
  
  return (
    <div className="w-80 space-y-6">
      {/* Language Selection */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Programming Language</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <button
                key={language}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedLanguage === language 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 hover:bg-muted'
                }`}
                onClick={() => handleLanguageSelect(language)}
              >
                {language}
              </button>
            ))}
            <button
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedLanguage === null 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted/50 hover:bg-muted'
              }`}
              onClick={() => setSelectedLanguage(null)}
            >
              All
            </button>
          </div>
        </CardContent>
      </Card>
      
      {/* DSA Syllabus */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">DSA Syllabus</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
          <div className="space-y-4">
            {dsaSyllabus.map((section, index) => (
              <div key={index} className="border-b border-border/50 pb-3 last:border-0 last:pb-0">
                <div 
                  className="flex items-center justify-between font-medium cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleTopic(section.topic)}
                >
                  <span>{section.topic}</span>
                  {expandedTopics.includes(section.topic) 
                    ? <ChevronDown className="h-4 w-4" /> 
                    : <ChevronRight className="h-4 w-4" />
                  }
                </div>
                {expandedTopics.includes(section.topic) && (
                  <div className="mt-2 pl-3 space-y-1">
                    {section.subtopics.map((subtopic, i) => (
                      <div 
                        key={i} 
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1.5"
                        onClick={() => handleCategorySelect(subtopic)}
                      >
                        <Code className="h-3.5 w-3.5" />
                        <span>{subtopic}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Available NeetCode Categories */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">NeetCode Categories</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="algorithm-item flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleCategorySelect(category)}
              >
                <Code className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSidebar;
