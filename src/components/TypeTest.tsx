
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../components/ui/button';
import CodeSnippet from './CodeSnippet';
import StatisticsPanel from './StatisticsPanel';
import TestOptions from './TestOptions';
import { useTest } from '../context/TestContext';
import { calculateWPM, calculateAccuracy } from '../utils/typeTestUtils';
import { useToast } from '../hooks/use-toast';
import { Play, RefreshCw } from 'lucide-react';

const TypeTest: React.FC = () => {
  const { toast } = useToast();
  const { 
    currentSnippet, 
    isTestActive, 
    startTest, 
    endTest, 
    resetTest, 
    changeSnippet 
  } = useTest();
  
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [currentPos, setCurrentPos] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errorCount, setErrorCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  
  const testContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  
  // Timer effect
  useEffect(() => {
    if (isTestActive && startTime) {
      timerRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setCurrentTime(elapsed);
        
        // Calculate WPM
        if (currentPos > 0) {
          const currentWpm = calculateWPM(currentPos, elapsed);
          setWpm(currentWpm);
        }
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTestActive, startTime, currentPos]);
  
  // Focus effect
  useEffect(() => {
    if (isTestActive && testContainerRef.current) {
      testContainerRef.current.focus();
    }
  }, [isTestActive]);
  
  // Complete test function
  const completeTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsComplete(true);
    
    // Calculate final stats
    const finalElapsed = Math.floor((Date.now() - (startTime || 0)) / 1000);
    const finalWpm = calculateWPM(currentSnippet.code.length, finalElapsed);
    
    // Submit results
    endTest({
      wpm: finalWpm,
      accuracy,
      time: finalElapsed,
      errors: errorCount,
      snippetId: currentSnippet.id,
      algorithm: currentSnippet.algorithm,
      language: currentSnippet.language,
      date: new Date()
    });
    
    toast({
      title: 'Test Complete!',
      description: `You typed at ${finalWpm} WPM with ${accuracy}% accuracy.`,
    });
  }, [accuracy, currentSnippet, endTest, errorCount, startTime, toast]);
  
  // Keyboard event handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isTestActive || isComplete) return;
    
    // Start timer on first keypress
    if (currentPos === 0 && !startTime) {
      setStartTime(Date.now());
    }
    
    // Only process if it's a single character or special key
    if (e.key.length === 1) {
      const expectedChar = currentSnippet.code[currentPos];
      const typedChar = e.key;
      
      // Update typed characters array
      const newTypedChars = [...typedChars];
      newTypedChars[currentPos] = typedChar;
      setTypedChars(newTypedChars);
      
      // Check for errors
      if (typedChar !== expectedChar) {
        setErrorCount(prev => prev + 1);
      }
      
      // Update position
      const newPos = currentPos + 1;
      setCurrentPos(newPos);
      
      // Calculate accuracy
      const correctChars = newTypedChars.filter((char, i) => 
        char === currentSnippet.code[i]
      ).length;
      
      setAccuracy(calculateAccuracy(correctChars, newPos));
      
      // Check if test is complete
      if (newPos >= currentSnippet.code.length) {
        completeTest();
      }
    } else if (e.key === 'Backspace' && currentPos > 0) {
      // Handle backspace
      const newPos = currentPos - 1;
      setCurrentPos(newPos);
      
      // Update error count if correcting an error
      const expectedChar = currentSnippet.code[newPos];
      const typedChar = typedChars[newPos];
      
      if (typedChar !== expectedChar) {
        setErrorCount(prev => Math.max(0, prev - 1));
      }
      
      // Update typed characters array
      const newTypedChars = [...typedChars];
      newTypedChars.pop();
      setTypedChars(newTypedChars);
      
      // Recalculate accuracy
      const correctChars = newTypedChars.filter((char, i) => 
        char === currentSnippet.code[i]
      ).length;
      
      setAccuracy(calculateAccuracy(correctChars, newPos));
    }
    
    // Prevent default behavior for certain keys
    if (['Space', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
    }
  }, [isTestActive, isComplete, currentPos, startTime, typedChars, currentSnippet, completeTest]);
  
  // Reset the test
  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setTypedChars([]);
    setCurrentPos(0);
    setStartTime(null);
    setCurrentTime(0);
    setWpm(0);
    setAccuracy(100);
    setErrorCount(0);
    setIsComplete(false);
    resetTest();
  };
  
  // Change test options
  const handleChangeAlgorithm = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    const actualAlgorithm = algorithm === 'All' ? undefined : algorithm;
    const actualLanguage = selectedLanguage === 'All' ? undefined : selectedLanguage;
    changeSnippet(actualAlgorithm, actualLanguage);
    handleReset();
  };
  
  const handleChangeLanguage = (language: string) => {
    setSelectedLanguage(language);
    const actualAlgorithm = selectedAlgorithm === 'All' ? undefined : selectedAlgorithm;
    const actualLanguage = language === 'All' ? undefined : language;
    changeSnippet(actualAlgorithm, actualLanguage);
    handleReset();
  };
  
  // Attach and detach keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return (
    <div 
      ref={testContainerRef} 
      className="test-container focus:outline-none"
      tabIndex={0}  // Make div focusable
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{currentSnippet.algorithm}</h2>
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-1 text-xs font-medium bg-primary/10 rounded-full">
            {currentSnippet.language}
          </span>
          <span className="text-sm text-muted-foreground">
            {currentSnippet.description}
          </span>
        </div>
        
        {!isTestActive && !isComplete && (
          <Button 
            onClick={startTest} 
            size="lg" 
            className="mb-6 transition-all duration-300 hover:scale-105"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Typing
          </Button>
        )}
        
        {(isTestActive || isComplete) && (
          <StatisticsPanel 
            wpm={wpm} 
            accuracy={accuracy} 
            time={currentTime} 
            errorCount={errorCount}
          />
        )}
      </div>
      
      <CodeSnippet 
        code={currentSnippet.code} 
        currentPosition={currentPos} 
        typedChars={typedChars} 
      />
      
      {(isComplete || !isTestActive) && (
        <div className="mt-6 flex justify-between items-center">
          <TestOptions 
            selectedAlgorithm={selectedAlgorithm}
            selectedLanguage={selectedLanguage}
            onAlgorithmChange={handleChangeAlgorithm}
            onLanguageChange={handleChangeLanguage}
            onReset={handleReset}
          />
          
          {isComplete && (
            <Button 
              onClick={handleReset} 
              className="ml-auto"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TypeTest;
