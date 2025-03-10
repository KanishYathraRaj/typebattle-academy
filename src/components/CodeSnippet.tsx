
import React, { useEffect, useRef } from 'react';

interface CodeSnippetProps {
  code: string;
  currentPosition: number;
  typedChars: string[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, currentPosition, typedChars }) => {
  // Split the code by newlines to handle line breaks properly
  const codeLines = code.split('\n');
  
  // Reference to track the current position
  const currentCharRef = useRef<HTMLSpanElement>(null);
  
  // Scroll to the current character when position changes
  useEffect(() => {
    if (currentCharRef.current) {
      currentCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center', 
        inline: 'nearest'
      });
    }
  }, [currentPosition]);
  
  // Get the line and character index for the current position
  const getCurrentLineAndChar = () => {
    let remainingChars = currentPosition;
    for (let lineIndex = 0; lineIndex < codeLines.length; lineIndex++) {
      const lineLength = codeLines[lineIndex].length;
      
      if (remainingChars <= lineLength) {
        return { lineIndex, charIndex: remainingChars };
      }
      
      // Add 1 for the newline character
      remainingChars -= lineLength + 1;
    }
    
    return { lineIndex: codeLines.length - 1, charIndex: codeLines[codeLines.length - 1].length };
  };
  
  const { lineIndex: currentLineIndex } = getCurrentLineAndChar();
  
  return (
    <div className="w-full p-6 font-mono text-base overflow-x-auto">
      <pre className="leading-relaxed">
        {codeLines.map((line, lineIndex) => {
          const isCurrentLine = lineIndex === currentLineIndex;
          
          return (
            <div 
              key={lineIndex}
              className={`whitespace-pre ${isCurrentLine ? 'bg-primary/5' : ''}`}
            >
              {line.split('').map((char, charIndex) => {
                const absoluteIndex = lineIndex === 0 
                  ? charIndex 
                  : codeLines.slice(0, lineIndex).join('\n').length + lineIndex + charIndex;
                
                let characterClass = '';
                let ref = null;
                
                if (absoluteIndex < currentPosition) {
                  const isCorrect = typedChars[absoluteIndex] === char;
                  if (!isCorrect && char === ' ') {
                    characterClass = 'character-incorrect-space';
                  } else {
                    characterClass = isCorrect 
                      ? 'character-correct' 
                      : 'character-incorrect';
                  }
                } else if (absoluteIndex === currentPosition) {
                  characterClass = 'character-current';
                  ref = currentCharRef;
                } else {
                  characterClass = 'character-pending';
                }
                
                return (
                  <span 
                    key={charIndex} 
                    className={`character ${characterClass}`}
                    data-char={char}
                    ref={ref}
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
                  codeLines.slice(0, lineIndex + 1).join('\n').length + lineIndex,
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
  let baseClass = 'character transition-colors duration-75';
  
  if (newLineIndex < currentPosition) {
    const isCorrect = typedChars[newLineIndex] === '\n';
    return isCorrect
      ? `${baseClass} character-correct`
      : `${baseClass} character-incorrect`;
  } else if (newLineIndex === currentPosition) {
    return `${baseClass} character-current`;
  }
  
  return `${baseClass} character-pending`;
}

export default CodeSnippet;
