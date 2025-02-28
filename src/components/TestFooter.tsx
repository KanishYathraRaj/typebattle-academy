
import React from 'react';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import TestOptions from './TestOptions';

interface TestFooterProps {
  isComplete: boolean;
  isTestActive: boolean;
  selectedAlgorithm: string;
  selectedLanguage: string;
  onAlgorithmChange: (algorithm: string) => void;
  onLanguageChange: (language: string) => void;
  onReset: () => void;
}

const TestFooter: React.FC<TestFooterProps> = ({
  isComplete,
  isTestActive,
  selectedAlgorithm,
  selectedLanguage,
  onAlgorithmChange,
  onLanguageChange,
  onReset
}) => {
  if (isTestActive && !isComplete) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-between items-center">
      <TestOptions 
        selectedAlgorithm={selectedAlgorithm}
        selectedLanguage={selectedLanguage}
        onAlgorithmChange={onAlgorithmChange}
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
