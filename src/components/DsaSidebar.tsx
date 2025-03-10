import React, { useState, useEffect } from 'react';
import { getCategories, getTopics, getLanguages, getCategoryDescription } from '../utils/codeSnippets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTest } from '../context/TestContext';
import { Code, BookOpen, Layers, ChevronDown, Star } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Badge } from './ui/badge';

const DsaSidebar: React.FC = () => {
  const { currentSnippet, changeSnippet } = useTest();
  
  // Local UI state
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>(currentSnippet.category);
  const [selectedTopic, setSelectedTopic] = useState<string>(currentSnippet.topic);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentSnippet.language);
  
  const categories = getCategories();
  const languages = getLanguages();
  
  // Initialize open categories
  useEffect(() => {
    const initialOpenCategories: Record<string, boolean> = {};
    categories.forEach(category => {
      initialOpenCategories[category] = category === selectedCategory;
    });
    setOpenCategories(initialOpenCategories);
  }, [categories, selectedCategory]);
  
  // Sync local state with context when snippet changes
  useEffect(() => {
    setSelectedCategory(currentSnippet.category);
    setSelectedTopic(currentSnippet.topic);
    setSelectedLanguage(currentSnippet.language);
  }, [currentSnippet]);
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleChangeCategory = (category: string) => {
    console.log("DsaSidebar - Changing category to:", category);
    setSelectedCategory(category);
    changeSnippet(category, undefined, selectedLanguage);
  };
  
  const handleChangeTopic = (topic: string) => {
    console.log("DsaSidebar - Changing topic to:", topic, "in category:", selectedCategory);
    setSelectedTopic(topic);
    changeSnippet(selectedCategory, topic, selectedLanguage);
  };
  
  const handleChangeLanguage = (language: string) => {
    console.log("DsaSidebar - Changing language to:", language);
    setSelectedLanguage(language);
    changeSnippet(selectedCategory, selectedTopic, language);
  };
  
  const getDifficultyColor = (difficulty?: string) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    if (difficulty === 'Hard') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    return '';
  };

  return (
    <div className="h-full overflow-y-auto py-4 px-4 font-sans">
      <div className="flex items-center mb-6">
        <Code className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-bold">NeetCode DSA</h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          <div className="flex items-center">
            <Layers className="h-4 w-4 mr-1" />
            <span>Programming Language</span>
          </div>
        </label>
        <Select value={selectedLanguage} onValueChange={handleChangeLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map(language => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>DSA Topics</span>
          </div>
        </label>
      </div>
      
      <div className="space-y-2">
        {categories.map(category => {
          const topics = getTopics(category);
          if (topics.length === 0) return null;
          
          return (
            <Collapsible 
              key={category} 
              open={openCategories[category]} 
              onOpenChange={() => toggleCategory(category)}
              className="border rounded-md overflow-hidden"
            >
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent">
                <span className="font-medium">{category}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openCategories[category] ? 'transform rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-1">
                  {topics.map(topic => {
                    const isActive = selectedCategory === category && selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-foreground hover:bg-accent"
                        )}
                        onClick={() => {
                          if (selectedCategory !== category) {
                            setSelectedCategory(category);
                          }
                          handleChangeTopic(topic);
                        }}
                      >
                        <span>{topic}</span>
                        {isActive && (
                          <Badge variant="outline" className={cn(
                            "text-xs",
                            getDifficultyColor(currentSnippet.difficulty)
                          )}>
                            {currentSnippet.difficulty}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
      
      <Separator className="my-6" />
      
      <div className="rounded-md bg-card p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Current Selection</h3>
          <Badge variant="outline" className={getDifficultyColor(currentSnippet.difficulty)}>
            {currentSnippet.difficulty}
          </Badge>
        </div>
        <div className="text-xs font-mono mb-1 text-primary">{currentSnippet.language}</div>
        <div className="font-medium mb-1">{currentSnippet.topic}</div>
        <p className="text-xs text-muted-foreground">{currentSnippet.description}</p>
      </div>
    </div>
  );
};

export default DsaSidebar;
