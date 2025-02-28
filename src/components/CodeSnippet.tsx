
import React from 'react';

interface CodeSnippetProps {
  code: string;
  currentPosition: number;
  typedChars: string[];
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, currentPosition, typedChars }) => {
  return (
    <div className="w-full rounded-lg bg-card p-6 border border-border/50 overflow-x-auto">
      <pre className="font-mono text-base leading-relaxed whitespace-pre-wrap">
        {code.split('').map((char, index) => {
          let characterClass = 'character character-pending';
          
          if (index < currentPosition) {
            characterClass = 
              typedChars[index] === char 
                ? 'character character-correct' 
                : 'character character-incorrect';
          } else if (index === currentPosition) {
            characterClass = 'character character-current';
          }
          
          return (
            <span key={index} className={characterClass}>
              {char}
            </span>
          );
        })}
      </pre>
    </div>
  );
};

export default CodeSnippet;
