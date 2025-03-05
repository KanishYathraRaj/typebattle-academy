
import React from 'react';

interface CodeSnippetProps {
  code: string;
  currentPosition: number;
  typedChars: string[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, currentPosition, typedChars }) => {
  // Split the code by newlines to handle line breaks properly
  const codeLines = code.split('\n');
  
  return (
    <div className="w-full p-6 font-mono text-base overflow-x-auto">
      <pre className="leading-relaxed">
        {codeLines.map((line, lineIndex) => {
          return (
            <div key={lineIndex} className="whitespace-pre">
              {line.split('').map((char, charIndex) => {
                const absoluteIndex = lineIndex === 0 
                  ? charIndex 
                  : codeLines.slice(0, lineIndex).join('\n').length + 1 + charIndex;
                
                let characterClass = '';
                
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
                } else {
                  characterClass = 'text-muted-foreground/70';
                }
                
                return (
                  <span 
                    key={charIndex} 
                    className={`transition-colors duration-75 ${characterClass}`}
                    data-char={char}
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
