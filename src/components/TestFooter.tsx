
import React from 'react';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import TestOptions from './TestOptions';

interface TestFooterProps {
  isComplete: boolean;
  isTestActive: boolean;
  selectedCategory: string;
  selectedLanguage: string;
  onCategoryChange: (category: string) => void;
  onLanguageChange: (language: string) => void;
  onReset: () => void;
}

const TestFooter: React.FC<TestFooterProps> = ({
  isComplete,
  isTestActive,
  selectedCategory,
  selectedLanguage,
  onCategoryChange,
  onLanguageChange,
  onReset
}) => {
  if (isTestActive && !isComplete) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-between items-center">
      <TestOptions 
        selectedCategory={selectedCategory}
        selectedLanguage={selectedLanguage}
        onCategoryChange={onCategoryChange}
        onLanguageChange={onLanguageChange}
        onReset={onReset}
      />
      
      {isComplete && (
        <Button 
          onClick={onReset} 
          className="ml-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default TestFooter;
