
import React, { createContext, useContext, useState, useRef } from 'react';
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
  
  // Use a ref to maintain consistent snippets for algorithm-language pairs
  const snippetCache = useRef<Record<string, any>>({});

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
    setCurrentSnippet(getRandomCodeSnippet());
  };

  const changeSnippet = (algorithm?: string, language?: string) => {
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
