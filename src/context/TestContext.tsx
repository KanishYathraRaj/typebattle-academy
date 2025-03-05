import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getRandomCodeSnippet, getCodeSnippets } from '../utils/codeSnippets';

export type TestResults = {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  snippetId: string;
  algorithm: string;
  language: string;
  date: Date;
};

type TestContextType = {
  currentSnippet: {
    id: string;
    algorithm: string;
    language: string;
    code: string;
    description: string;
  };
  isTestActive: boolean;
  results: TestResults | null;
  startTest: () => void;
  endTest: (results: TestResults) => void;
  resetTest: () => void;
  changeSnippet: (algorithm?: string, language?: string) => void;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSnippet, setCurrentSnippet] = useState(() => getRandomCodeSnippet());
  const [isTestActive, setIsTestActive] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  
  // Use a permanent cache to ensure consistency across sessions
  const snippetCache = useRef<Record<string, any>>({});
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);

  const startTest = () => {
    setIsTestActive(true);
    setResults(null);
  };

  const endTest = (results: TestResults) => {
    setIsTestActive(false);
    setResults(results);
  };

  const resetTest = () => {
    setIsTestActive(false);
    setResults(null);
    // When resetting, keep the same algorithm and language selection
    changeSnippet(selectedAlgorithm, selectedLanguage);
  };

  const changeSnippet = (algorithm?: string, language?: string) => {
    // Update the selected algorithm and language
    setSelectedAlgorithm(algorithm);
    setSelectedLanguage(language);
    
    // Create a cache key based on the algorithm and language
    const cacheKey = `${algorithm || 'all'}-${language || 'all'}`;
    
    // Check if we already have a snippet for this combination
    if (snippetCache.current[cacheKey]) {
      setCurrentSnippet(snippetCache.current[cacheKey]);
    } else {
      // Get a new snippet and cache it
      const newSnippet = getRandomCodeSnippet(algorithm, language);
      snippetCache.current[cacheKey] = newSnippet;
      setCurrentSnippet(newSnippet);
    }
  };

  // Initialize the cache with one snippet for each algorithm-language combination
  useEffect(() => {
    const algorithms = ['all', 'Binary Search', 'Merge Sort', 'Quick Sort', 'Depth-First Search', 
                        'Breadth-First Search', 'Dynamic Programming - Fibonacci', 'Knapsack Problem',
                        'Dijkstra\'s Algorithm', 'Floyd-Warshall Algorithm'];
    const languages = ['all', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++'];
    
    // Pre-cache one snippet for each combination to ensure consistency
    algorithms.forEach(algo => {
      languages.forEach(lang => {
        const actualAlgo = algo === 'all' ? undefined : algo;
        const actualLang = lang === 'all' ? undefined : lang;
        const cacheKey = `${actualAlgo || 'all'}-${actualLang || 'all'}`;
        
        if (!snippetCache.current[cacheKey]) {
          snippetCache.current[cacheKey] = getRandomCodeSnippet(actualAlgo, actualLang);
        }
      });
    });
  }, []);

  return (
    <TestContext.Provider value={{
      currentSnippet,
      isTestActive,
      results,
      startTest,
      endTest,
      resetTest,
      changeSnippet
    }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = (): TestContextType => {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};
