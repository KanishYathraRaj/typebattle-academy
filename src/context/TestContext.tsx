
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { 
  getCodeSnippet, 
  getRandomCodeSnippet, 
  getCategories, 
  getTopics,
  getLanguages 
} from '../utils/codeSnippets';

export type TestResults = {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  snippetId: string;
  category: string;
  topic: string;
  language: string;
  difficulty: string;
  date: Date;
};

type TestContextType = {
  currentSnippet: {
    id: string;
    category: string;
    topic: string;
    language: string;
    code: string;
    description: string;
    difficulty: string;
  };
  isTestActive: boolean;
  results: TestResults | null;
  startTest: () => void;
  endTest: (results: TestResults) => void;
  resetTest: () => void;
  changeSnippet: (category?: string, topic?: string, language?: string) => void;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSnippet, setCurrentSnippet] = useState(() => getRandomCodeSnippet());
  const [isTestActive, setIsTestActive] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  
  // Use a permanent cache to ensure consistency across sessions
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
  };

  const changeSnippet = (category?: string, topic?: string, language?: string) => {
    console.log("TestContext - changeSnippet called with:", { category, topic, language });
    
    // Create a cache key based on the category, topic and language
    const cacheKey = `${category || 'all'}-${topic || 'all'}-${language || 'all'}`;
    
    // Check if we already have a snippet for this combination
    if (snippetCache.current[cacheKey]) {
      console.log("TestContext - Using cached snippet for:", cacheKey);
      setCurrentSnippet(snippetCache.current[cacheKey]);
      return; // Important: return early to avoid further processing
    }
    
    // If all params are specified, try to get the exact match first
    if (category && topic && language) {
      console.log("TestContext - Trying to get exact match for:", { category, topic, language });
      const exactMatch = getCodeSnippet(category, topic, language);
      if (exactMatch) {
        console.log("TestContext - Found exact match");
        snippetCache.current[cacheKey] = exactMatch;
        setCurrentSnippet(exactMatch);
        return;
      } else {
        console.log("TestContext - No exact match found for specific combination:", { category, topic, language });
      }
    }
    
    // Handle cases where no exact match was found but we have partial criteria
    // If we have category and topic, try to find a snippet with any language
    if (category && topic) {
      console.log("TestContext - Looking for category and topic with any language");
      const languages = getLanguages();
      for (const lang of languages) {
        const partialMatch = getCodeSnippet(category, topic, lang);
        if (partialMatch) {
          console.log("TestContext - Found match with language:", lang);
          snippetCache.current[cacheKey] = partialMatch;
          setCurrentSnippet(partialMatch);
          return;
        }
      }
    }
    
    // If we still didn't find a match, get a random snippet matching at least some criteria
    console.log("TestContext - Getting random snippet for:", { category, topic, language });
    const newSnippet = getRandomCodeSnippet(category, topic, language);
    snippetCache.current[cacheKey] = newSnippet;
    setCurrentSnippet(newSnippet);
  };

  // Pre-cache snippets for popular combinations
  useEffect(() => {
    const categories = getCategories();
    const languages = getLanguages();
    
    // Pre-cache snippets for each available combination
    categories.forEach(category => {
      const topics = getTopics(category);
      
      topics.forEach(topic => {
        languages.forEach(language => {
          // Try to get exact match for this category-topic-language triplet
          const exactMatch = getCodeSnippet(category, topic, language);
          const cacheKey = `${category}-${topic}-${language}`;
          
          if (exactMatch) {
            snippetCache.current[cacheKey] = exactMatch;
          }
        });
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
