
import React, { useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Card } from './ui/card';

const TypeTest: React.FC = () => {
  const { currentSnippet, isTestActive, startTest } = useTest();
  const {
    typedChars,
    currentPos,
    isComplete,
    testContainerRef
  } = useTypingTest();
  
  // Auto-start test when user starts typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isTestActive && !isComplete && e.key.length === 1) {
        startTest();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTestActive, isComplete, startTest]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{currentSnippet.algorithm}</h1>
        <div className="flex items-center gap-2 mb-6">
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 rounded-full">
            {currentSnippet.language}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentSnippet.description}
          </span>
        </div>
      </div>
      
      <Card className="glass overflow-hidden">
        <div 
          ref={testContainerRef} 
          className="test-container focus:outline-none p-1"
          tabIndex={0}
        >
          <CodeSnippet 
            code={currentSnippet.code} 
            currentPosition={currentPos} 
            typedChars={typedChars} 
          />
          
          {!isTestActive && !isComplete && (
            <div className="p-4 text-center text-muted-foreground">
              Start typing to begin the test...
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TypeTest;
