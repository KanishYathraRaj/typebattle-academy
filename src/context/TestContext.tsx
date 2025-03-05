import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { getCodeSnippet, getRandomCodeSnippet, getAlgorithms, getLanguages } from '../utils/codeSnippets';

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
      // If both algorithm and language are specified, try to get the exact match first
      if (algorithm && language) {
        const exactMatch = getCodeSnippet(algorithm, language);
        if (exactMatch) {
          snippetCache.current[cacheKey] = exactMatch;
          setCurrentSnippet(exactMatch);
          return;
        }
      }
      
      // Otherwise get a random matching snippet
      const newSnippet = getRandomCodeSnippet(algorithm, language);
      snippetCache.current[cacheKey] = newSnippet;
      setCurrentSnippet(newSnippet);
    }
  };

  // Initialize the cache with one snippet for each algorithm-language combination
  useEffect(() => {
    const algorithms = getAlgorithms();
    const languages = getLanguages();
    
    // Pre-cache one snippet for each combination to ensure consistency
    algorithms.forEach(algo => {
      languages.forEach(lang => {
        // Try to get exact match for this algorithm-language pair
        const exactMatch = getCodeSnippet(algo, lang);
        const cacheKey = `${algo}-${lang}`;
        
        if (exactMatch) {
          snippetCache.current[cacheKey] = exactMatch;
        }
      });
    });
    
    // Also cache the "all" combinations
    languages.forEach(lang => {
      const cacheKey = `all-${lang}`;
      if (!snippetCache.current[cacheKey]) {
        snippetCache.current[cacheKey] = getRandomCodeSnippet(undefined, lang);
      }
    });
    
    algorithms.forEach(algo => {
      const cacheKey = `${algo}-all`;
      if (!snippetCache.current[cacheKey]) {
        snippetCache.current[cacheKey] = getRandomCodeSnippet(algo, undefined);
      }
    });
    
    // And the "all-all" case
    if (!snippetCache.current['all-all']) {
      snippetCache.current['all-all'] = getRandomCodeSnippet();
    }
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
