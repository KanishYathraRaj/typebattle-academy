
import React, { createContext, useContext, useState } from 'react';
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

  // Simplified changeSnippet function that focuses on finding the right snippet
  const changeSnippet = (category?: string, topic?: string, language?: string) => {
    console.log("TestContext - changeSnippet called with:", { category, topic, language });
    
    // If all params are specified, try to get the exact match first
    if (category && topic && language) {
      const exactMatch = getCodeSnippet(category, topic, language);
      if (exactMatch) {
        console.log("TestContext - Found exact match");
        setCurrentSnippet(exactMatch);
        return;
      }
    }
    
    // If we have category and topic, try to find a snippet with any language
    if (category && topic) {
      const languages = getLanguages();
      for (const lang of languages) {
        const partialMatch = getCodeSnippet(category, topic, lang);
        if (partialMatch) {
          console.log("TestContext - Found match with language:", lang);
          setCurrentSnippet(partialMatch);
          return;
        }
      }
    }
    
    // If nothing found, get a random snippet with the provided filters
    const newSnippet = getRandomCodeSnippet(category, topic, language);
    console.log("TestContext - Using random snippet:", newSnippet.topic);
    setCurrentSnippet(newSnippet);
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
