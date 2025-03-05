
import React, { useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Card } from './ui/card';
import { Code, Info, Play, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

const TypeTest: React.FC = () => {
  const { currentSnippet, isTestActive, startTest, resetTest } = useTest();
  const {
    typedChars,
    currentPos,
    isComplete,
    testContainerRef,
    wpm,
    currentTime,
    accuracy
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
      <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">{currentSnippet.algorithm}</h1>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {currentSnippet.language}
            </span>
            {isTestActive && (
              <div className="flex items-center gap-4 ml-2">
                <span className="text-sm font-medium">{wpm} WPM</span>
                <span className="text-sm font-medium">{accuracy.toFixed(1)}% accuracy</span>
                <span className="text-sm font-medium">{currentTime}s</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {(isTestActive || isComplete) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => resetTest()}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </Button>
          )}
          
          <div className="max-w-xs">
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{currentSnippet.description}</p>
            </div>
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
            <div className="p-6 text-center text-muted-foreground bg-background/80 backdrop-blur-sm absolute inset-0 flex items-center justify-center">
              <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
                <Play className="h-10 w-10 mx-auto mb-4 text-primary" />
                <p className="text-xl font-mono">Press any key to start typing</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The timer will start when you begin typing
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TypeTest;
