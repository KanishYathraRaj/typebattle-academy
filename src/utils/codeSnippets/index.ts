
import { CodeSnippet, dsaCategories, languageTypes } from './types';
import { topicsWithDescriptions, getTopics, getTopicDifficulty, getCategoryDescription } from './topicsData';
import { implementations } from './snippetsData';

// Generate the code snippets array from our structured data
const codeSnippets: CodeSnippet[] = [];

// For each category, topic, and language combination, create a code snippet
dsaCategories.forEach(category => {
  if (!topicsWithDescriptions[category]) return;
  
  Object.entries(topicsWithDescriptions[category]).forEach(([topic, details]) => {
    if (!implementations[category] || !implementations[category][topic]) return;
    
    Object.entries(implementations[category][topic]).forEach(([language, code]) => {
      codeSnippets.push({
        id: `${category.toLowerCase().replace(/\s+/g, '-')}-${topic.toLowerCase().replace(/\s+/g, '-')}-${language.toLowerCase()}`,
        category,
        topic,
        language,
        code,
        description: details.description,
        difficulty: details.difficulty
      });
    });
  });
});

// Get available categories
export const getCategories = (): string[] => {
  return dsaCategories;
};

// Get available languages
export const getLanguages = (): string[] => {
  return languageTypes;
};

// Re-export the functions from topicsData
export { getTopics, getTopicDifficulty, getCategoryDescription };

// Get all code snippets for a specific category, topic, and language
export const getCodeSnippets = (category?: string, topic?: string, language?: string): CodeSnippet[] => {
  let filteredSnippets = [...codeSnippets];
  
  if (category) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.category === category);
  }
  
  if (topic) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.topic === topic);
  }
  
  if (language) {
    filteredSnippets = filteredSnippets.filter(snippet => snippet.language === language);
  }
  
  return filteredSnippets;
};

// Get a specific code snippet
export const getCodeSnippet = (category: string, topic: string, language: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => 
    snippet.category === category && 
    snippet.topic === topic && 
    snippet.language === language
  );
};

// Get a random code snippet, but respecting category, topic, and language filters
export const getRandomCodeSnippet = (category?: string, topic?: string, language?: string): CodeSnippet => {
  const filteredSnippets = getCodeSnippets(category, topic, language);
  
  if (filteredSnippets.length === 0) {
    // If no snippets match the criteria, return a random one from all snippets
    return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
  }
  
  return filteredSnippets[Math.floor(Math.random() * filteredSnippets.length)];
};

// Get a specific code snippet by ID
export const getCodeSnippetById = (id: string): CodeSnippet | undefined => {
  return codeSnippets.find(snippet => snippet.id === id);
};

// Export the CodeSnippet type for use elsewhere
export type { CodeSnippet };
