
import React, { useState, useEffect } from 'react';
import { getAlgorithms, getLanguages } from '../utils/codeSnippets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTest } from '../context/TestContext';
import { useTypingTest } from '../hooks/useTypingTest';
import { Code, BookOpen, Layers, ChevronDown } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

const DsaSidebar: React.FC = () => {
  const { currentSnippet, changeSnippet } = useTest();
  const { handleReset } = useTypingTest();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(currentSnippet.algorithm);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentSnippet.language);
  
  const algorithms = getAlgorithms();
  const languages = getLanguages();
  
  // Update local state when currentSnippet changes
  useEffect(() => {
    setSelectedAlgorithm(currentSnippet.algorithm);
    setSelectedLanguage(currentSnippet.language);
  }, [currentSnippet]);
  
  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    changeSnippet(algorithm, selectedLanguage);
    handleReset();
  };
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    changeSnippet(selectedAlgorithm, language);
    handleReset();
  };

  return (
    <div className="h-full overflow-y-auto py-4 px-4 font-sans">
      <div className="flex items-center mb-6">
        <Code className="h-5 w-5 mr-2 text-primary" />
        <h2 className="text-xl font-bold">DSA Practice</h2>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          <div className="flex items-center">
            <Layers className="h-4 w-4 mr-1" />
            <span>Programming Language</span>
          </div>
        </label>
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
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
            <span>Algorithm Categories</span>
          </div>
        </label>
      </div>
      
      <div className="space-y-1">
        {algorithms.map(algorithm => (
          <button
            key={algorithm}
            className={cn(
              "w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent",
              selectedAlgorithm === algorithm 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-foreground"
            )}
            onClick={() => handleAlgorithmChange(algorithm)}
          >
            {algorithm}
          </button>
        ))}
      </div>
      
      <Separator className="my-6" />
      
      <div className="rounded-md bg-card p-4 border border-border">
        <h3 className="text-sm font-medium mb-2">Current Selection</h3>
        <div className="text-xs font-mono mb-1 text-primary">{currentSnippet.language}</div>
        <div className="font-medium mb-1">{currentSnippet.algorithm}</div>
        <p className="text-xs text-muted-foreground">{currentSnippet.description}</p>
      </div>
    </div>
  );
};

export default DsaSidebar;
