
import React, { useEffect, useRef } from 'react';

interface CodeSnippetProps {
  code: string;
  currentPosition: number;
  typedChars: string[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, currentPosition, typedChars }) => {
  // Split the code by newlines to handle line breaks properly
  const codeLines = code.split('\n');
  const codeContainerRef = useRef<HTMLPreElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  // Function to scroll to cursor position
  useEffect(() => {
    if (cursorRef.current && codeContainerRef.current) {
      const cursor = cursorRef.current;
      const container = codeContainerRef.current;
      
      // Get cursor position
      const cursorRect = cursor.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Check if cursor is outside visible area
      if (cursorRect.bottom > containerRect.bottom || cursorRect.top < containerRect.top) {
        // Scroll to make cursor visible
        cursor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentPosition]);
  
  // Find which line the current position is on for line highlighting
  const getCurrentLineIndex = () => {
    let currentIndex = 0;
    for (let i = 0; i < codeLines.length; i++) {
      currentIndex += codeLines[i].length;
      if (currentPosition < currentIndex + i) { // +i accounts for newline characters
        return i;
      }
    }
    return codeLines.length - 1;
  };
  
  const currentLineIndex = getCurrentLineIndex();
  
  return (
    <div className="w-full p-0 font-mono text-base overflow-x-auto rounded-md bg-background">
      <div className="flex">
        {/* Line numbers */}
        <div className="py-6 px-2 text-right select-none border-r border-border bg-secondary/50">
          {codeLines.map((_, lineIndex) => (
            <div 
              key={lineIndex} 
              className={`pr-3 ${lineIndex === currentLineIndex ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
            >
              {lineIndex + 1}
            </div>
          ))}
        </div>
        
        {/* Code content */}
        <pre 
          ref={codeContainerRef}
          className="leading-relaxed py-6 px-4 flex-1 overflow-x-auto max-h-96 overflow-y-auto"
        >
          {codeLines.map((line, lineIndex) => {
            return (
              <div 
                key={lineIndex} 
                className={`whitespace-pre mb-0 ${lineIndex === currentLineIndex ? 'bg-primary/5 -mx-4 px-4' : ''}`}
              >
                {line.split('').map((char, charIndex) => {
                  const absoluteIndex = lineIndex === 0 
                    ? charIndex 
                    : codeLines.slice(0, lineIndex).join('\n').length + 1 + charIndex;
                  
                  let characterClass = '';
                  let refProp = {};
                  
                  if (absoluteIndex < currentPosition) {
                    const isCorrect = typedChars[absoluteIndex] === char;
                    if (!isCorrect && char === ' ') {
                      characterClass = 'bg-destructive/20 text-destructive';
                    } else {
                      characterClass = isCorrect 
                        ? 'text-primary/90' 
                        : 'text-destructive font-bold underline decoration-destructive decoration-2 underline-offset-4';
                    }
                  } else if (absoluteIndex === currentPosition) {
                    characterClass = 'relative';
                    refProp = { ref: cursorRef };
                  } else {
                    characterClass = 'text-muted-foreground/70';
                  }
                  
                  return (
                    <span 
                      key={charIndex} 
                      className={`transition-colors duration-75 ${characterClass}`}
                      data-char={char}
                      {...refProp}
                    >
                      {absoluteIndex === currentPosition && (
                        <span className="absolute h-[1.2em] w-0.5 bg-primary animate-caret-blink -ml-[1px]"></span>
                      )}
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  );
                })}
                {lineIndex < codeLines.length - 1 && (
                  <span className={getNewLineClass(
                    codeLines.slice(0, lineIndex + 1).join('\n').length,
                    currentPosition,
                    typedChars
                  )}>
                    {'\n'}
                  </span>
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
};

// Helper function to determine class for newline characters
function getNewLineClass(newLineIndex: number, currentPosition: number, typedChars: string[]): string {
  let baseClass = 'transition-colors duration-75';
  
  if (newLineIndex < currentPosition) {
    const isCorrect = typedChars[newLineIndex] === '\n';
    return isCorrect
      ? `${baseClass} text-primary/90`
      : `${baseClass} text-destructive font-bold`;
  } else if (newLineIndex === currentPosition) {
    return `${baseClass} relative`;
  }
  
  return `${baseClass} text-muted-foreground/70`;
}

export default CodeSnippet;
