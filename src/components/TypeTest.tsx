
import React, { useEffect, useRef } from 'react';
import CodeSnippet from './CodeSnippet';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Card } from './ui/card';
import { Code, Info, Clock, Percent, ZapIcon, FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

const TypeTest: React.FC = () => {
  const { currentSnippet, isTestActive, startTest } = useTest();
  const {
    typedChars,
    currentPos,
    isComplete,
    testContainerRef,
    wpm,
    accuracy,
    currentTime
  } = useTypingTest();
  
  const codeContainerRef = useRef<HTMLDivElement>(null);
  
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
  
  // Function to get difficulty color class
  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    if (difficulty === 'Hard') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    return '';
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileIcon className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">{currentSnippet.topic}</h1>
            <Badge 
              variant="outline" 
              className={cn("ml-2", getDifficultyColor(currentSnippet.difficulty))}
            >
              {currentSnippet.difficulty}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
              {currentSnippet.language}
            </Badge>
            <Badge className="px-2 py-1 text-xs font-medium bg-accent/80 text-accent-foreground rounded-full">
              {currentSnippet.category}
            </Badge>
          </div>
        </div>
        
        <div className="max-w-xs">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{currentSnippet.description}</p>
          </div>
        </div>
      </div>
      
      {isTestActive && (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <Card className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="text-xl font-bold">{currentTime}s</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <ZapIcon className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Speed</div>
              <div className="text-xl font-bold">{wpm} WPM</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-3">
            <Percent className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
              <div className="text-xl font-bold">{accuracy}%</div>
            </div>
          </Card>
        </div>
      )}
      
      <Card className="overflow-hidden border border-border bg-card/80 backdrop-blur-sm shadow-md">
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{currentSnippet.topic}.{currentSnippet.language.toLowerCase() === 'javascript' ? 'js' : 
              currentSnippet.language.toLowerCase() === 'typescript' ? 'ts' : 
              currentSnippet.language.toLowerCase() === 'python' ? 'py' : 
              currentSnippet.language.toLowerCase() === 'java' ? 'java' : 'cpp'}</span>
          </div>
          <span className="text-xs text-muted-foreground">{currentSnippet.language}</span>
        </div>
        
        <div className="flex">
          {/* Line numbers */}
          <div className="bg-muted/50 text-muted-foreground font-mono text-xs px-4 py-6 select-none text-right min-w-[4rem]">
            {currentSnippet.code.split('\n').map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "leading-relaxed",
                  isTestActive && currentSnippet.code.split('\n').findIndex((_, lineIndex) => {
                    const lineStart = currentSnippet.code.split('\n').slice(0, lineIndex).join('\n').length + (lineIndex > 0 ? 1 : 0);
                    const lineEnd = lineStart + currentSnippet.code.split('\n')[lineIndex].length;
                    return currentPos >= lineStart && currentPos <= lineEnd;
                  }) === i ? "text-primary font-medium" : ""
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code content */}
          <div 
            ref={codeContainerRef}
            className="w-full overflow-x-auto"
          >
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TypeTest;
