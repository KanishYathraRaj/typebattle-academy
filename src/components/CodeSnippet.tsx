
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
    <div className="w-full rounded-lg bg-card p-6 overflow-x-auto">
      <pre className="font-mono text-base leading-relaxed">
        {codeLines.map((line, lineIndex) => {
          return (
            <div key={lineIndex} className="whitespace-pre relative">
              {line.split('').map((char, charIndex) => {
                const absoluteIndex = lineIndex === 0 
                  ? charIndex 
                  : codeLines.slice(0, lineIndex).join('\n').length + 1 + charIndex;
                
                let characterClass = '';
                
                if (absoluteIndex < currentPosition) {
                  const isCorrect = typedChars[absoluteIndex] === char;
                  if (!isCorrect && char === ' ') {
                    characterClass = 'character character-incorrect-space';
                  } else {
                    characterClass = isCorrect 
                      ? 'character character-correct' 
                      : 'character character-incorrect';
                  }
                } else if (absoluteIndex === currentPosition) {
                  characterClass = 'character character-current';
                } else {
                  characterClass = 'character character-pending';
                }
                
                return (
                  <span key={charIndex} className={characterClass}>
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                );
              })}
              {lineIndex < codeLines.length - 1 && (
                <span className={getNewLineClass(
                  codeLines.slice(0, lineIndex + 1).join('\n').length,
                  currentPosition
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
function getNewLineClass(newLineIndex: number, currentPosition: number): string {
  if (newLineIndex < currentPosition) {
    return 'character character-correct';
  } else if (newLineIndex === currentPosition) {
    // Adjust cursor position for newline characters
    return 'character character-current';
  }
  return 'character character-pending';
}

export default CodeSnippet;
