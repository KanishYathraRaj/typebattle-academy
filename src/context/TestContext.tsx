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
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
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
    // When resetting, keep the same category, topic and language selection
    changeSnippet(selectedCategory, selectedTopic, selectedLanguage);
  };

  const changeSnippet = (category?: string, topic?: string, language?: string) => {
    // Update the selected category, topic and language
    setSelectedCategory(category);
    setSelectedTopic(topic);
    setSelectedLanguage(language);
    
    // Create a cache key based on the category, topic and language
    const cacheKey = `${category || 'all'}-${topic || 'all'}-${language || 'all'}`;
    
    // Check if we already have a snippet for this combination
    if (snippetCache.current[cacheKey]) {
      setCurrentSnippet(snippetCache.current[cacheKey]);
    } else {
      // If all three params are specified, try to get the exact match first
      if (category && topic && language) {
        const exactMatch = getCodeSnippet(category, topic, language);
        if (exactMatch) {
          snippetCache.current[cacheKey] = exactMatch;
          setCurrentSnippet(exactMatch);
          return;
        }
      }
      
      // Otherwise get a random matching snippet
      const newSnippet = getRandomCodeSnippet(category, topic, language);
      snippetCache.current[cacheKey] = newSnippet;
      setCurrentSnippet(newSnippet);
    }
  };

  // Initialize the cache with one snippet for each category-topic-language combination
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
