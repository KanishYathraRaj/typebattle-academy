
import React, { useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import TestHeader from './TestHeader';
import TestFooter from './TestFooter';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';

const TypeTest: React.FC = () => {
  const { currentSnippet, isTestActive, startTest } = useTest();
  const {
    typedChars,
    currentPos,
    currentTime,
    wpm,
    accuracy,
    errorCount,
    isComplete,
    selectedAlgorithm,
    selectedLanguage,
    handleReset,
    handleChangeAlgorithm,
    handleChangeLanguage,
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
    <div 
      ref={testContainerRef} 
      className="test-container focus:outline-none"
      tabIndex={0}  // Make div focusable
    >
      <TestHeader 
        isTestActive={isTestActive}
        isComplete={isComplete}
        wpm={wpm}
        accuracy={accuracy}
        time={currentTime}
        errorCount={errorCount}
      />
      
      <CodeSnippet 
        code={currentSnippet.code} 
        currentPosition={currentPos} 
        typedChars={typedChars} 
      />
      
      <TestFooter 
        isComplete={isComplete}
        isTestActive={isTestActive}
        selectedAlgorithm={selectedAlgorithm}
        selectedLanguage={selectedLanguage}
        onAlgorithmChange={handleChangeAlgorithm}
        onLanguageChange={handleChangeLanguage}
        onReset={handleReset}
      />
    </div>
  );
};

export default TypeTest;
