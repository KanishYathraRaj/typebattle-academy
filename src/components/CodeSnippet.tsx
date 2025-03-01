
import React from 'react';

interface CodeSnippetProps {
  code: string;
  currentPosition: number;
  typedChars: string[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, currentPosition, typedChars }) => {
  // Split the code by newlines to handle line breaks properly
  const codeLines = code.split('\n');
  
  // Calculate the current line and character position
  let currentLine = 0;
  let currentChar = 0;
  let charCount = 0;
  
  for (let i = 0; i < codeLines.length; i++) {
    if (charCount + codeLines[i].length + (i > 0 ? 1 : 0) > currentPosition) {
      currentLine = i;
      currentChar = currentPosition - charCount - (i > 0 ? 1 : 0);
      break;
    }
    charCount += codeLines[i].length + (i > 0 ? 1 : 0);
  }

  return (
    <div className="w-full rounded-lg bg-card p-6 border border-border/50 overflow-x-auto">
      <pre className="font-mono text-base leading-relaxed">
        {codeLines.map((line, lineIndex) => {
          return (
            <div key={lineIndex} className="whitespace-pre">
              {line.split('').map((char, charIndex) => {
                const absoluteIndex = lineIndex === 0 
                  ? charIndex 
                  : codeLines.slice(0, lineIndex).join('\n').length + 1 + charIndex;
                
                let characterClass = 'character character-pending';
                
                if (absoluteIndex < currentPosition) {
                  characterClass = 
                    typedChars[absoluteIndex] === char 
                      ? 'character character-correct' 
                      : 'character character-incorrect';
                } else if (absoluteIndex === currentPosition - 1) {
                  // Highlight current character (cursor is one character behind)
                  characterClass = 'character character-current';
                }
                
                // Preserve spaces in the rendered output
                if (char === ' ') {
                  return <span key={charIndex} className={characterClass}>&nbsp;</span>;
                }
                
                return (
                  <span key={charIndex} className={characterClass}>
                    {char}
                  </span>
                );
              })}
              {/* Add a line break if this isn't the last line */}
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
  } else if (newLineIndex === currentPosition - 1) {
    // Adjust cursor position for newline characters as well
    return 'character character-current';
  }
  return 'character character-pending';
}

export default CodeSnippet;
