
import React, { useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Card } from './ui/card';
import { Code, Info } from 'lucide-react';

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
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">{currentSnippet.algorithm}</h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {currentSnippet.language}
            </span>
          </div>
        </div>
        
        <div className="max-w-xs">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{currentSnippet.description}</p>
          </div>
        </div>
      </div>
      
      <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-sm">
        <div 
          ref={testContainerRef} 
          className="focus:outline-none"
          tabIndex={0}
        >
          <CodeSnippet 
            code={currentSnippet.code} 
            currentPosition={currentPos} 
            typedChars={typedChars} 
          />
          
          {!isTestActive && !isComplete && (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-xl font-mono opacity-60">start typing to begin...</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TypeTest;
