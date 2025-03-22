
import React, { useEffect, useRef } from 'react';
import CodeSnippet from './CodeSnippet';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Card } from './ui/card';
import { Code, Clock, ZapIcon, Percent, AlertTriangle, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const TypeTest: React.FC = () => {
  const { currentSnippet, isTestActive, startTest } = useTest();
  const {
    typedChars,
    currentPos,
    isComplete,
    testContainerRef,
    wpm,
    accuracy,
    currentTime,
    errorCount
  } = useTypingTest();
  
  const codeContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate progress percentage
  const progressPercentage = Math.floor((currentPos / currentSnippet.code.length) * 100);
  
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
    if (difficulty === 'Easy') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
    if (difficulty === 'Medium') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    if (difficulty === 'Hard') return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';
    return '';
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header with snippet information */}
      <div className="mb-6 bg-card/30 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileCode className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold">{currentSnippet.topic}</h1>
              <Badge 
                variant="outline" 
                className={cn("ml-2", getDifficultyColor(currentSnippet.difficulty))}
              >
                {currentSnippet.difficulty}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {currentSnippet.language}
              </Badge>
              <Badge className="px-2 py-1 text-xs font-medium bg-accent/50 text-accent-foreground rounded-full">
                {currentSnippet.category}
              </Badge>
            </div>
          </div>
          
          <div className="md:max-w-xs">
            <p className="text-sm text-muted-foreground">{currentSnippet.description}</p>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      {isTestActive && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1" />
        </div>
      )}
      
      {/* Stats cards */}
      {isTestActive && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <Card className="p-4 flex items-center gap-3 backdrop-blur-sm bg-card/50 border-border/50">
            <div className="p-2 rounded-full bg-primary/10">
              <ZapIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Speed</div>
              <div className="text-2xl font-bold">{wpm} <span className="text-sm text-muted-foreground">WPM</span></div>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3 backdrop-blur-sm bg-card/50 border-border/50">
            <div className="p-2 rounded-full bg-primary/10">
              <Percent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Accuracy</div>
              <div className="text-2xl font-bold">{accuracy}<span className="text-sm text-muted-foreground">%</span></div>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3 backdrop-blur-sm bg-card/50 border-border/50">
            <div className="p-2 rounded-full bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Time</div>
              <div className="text-2xl font-bold">{currentTime}<span className="text-sm text-muted-foreground">s</span></div>
            </div>
          </Card>
          
          <Card className="p-4 flex items-center gap-3 backdrop-blur-sm bg-card/50 border-border/50">
            <div className="p-2 rounded-full bg-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">Errors</div>
              <div className="text-2xl font-bold">{errorCount}</div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Code editor card */}
      <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium font-mono">{currentSnippet.topic}.{
              currentSnippet.language.toLowerCase() === 'javascript' ? 'js' : 
              currentSnippet.language.toLowerCase() === 'typescript' ? 'ts' : 
              currentSnippet.language.toLowerCase() === 'python' ? 'py' : 
              currentSnippet.language.toLowerCase() === 'java' ? 'java' : 'cpp'
            }</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">{currentSnippet.language}</span>
          </div>
        </div>
        
        <div className="flex">
          {/* Line numbers */}
          <div className="bg-muted/30 text-muted-foreground font-mono text-xs px-4 py-6 select-none text-right min-w-[4rem]">
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
                <div className="p-8 text-center">
                  <div className="inline-block p-3 rounded-full bg-primary/5 mb-3">
                    <ZapIcon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-xl font-medium mb-2">Ready to Code?</p>
                  <p className="text-muted-foreground mb-4">Start typing to begin the test</p>
                  <kbd className="px-2 py-1.5 text-xs font-mono bg-muted rounded border border-border">
                    Start typing...
                  </kbd>
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
