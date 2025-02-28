
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTest } from '../context/TestContext';
import { calculateWPM, calculateAccuracy } from '../utils/typeTestUtils';
import { useToast } from './use-toast';
import { TestResults } from '../context/TestContext';

interface UseTypingTestReturn {
  typedChars: string[];
  currentPos: number;
  startTime: number | null;
  currentTime: number;
  wpm: number;
  accuracy: number;
  errorCount: number;
  isComplete: boolean;
  selectedAlgorithm: string;
  selectedLanguage: string;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleReset: () => void;
  handleChangeAlgorithm: (algorithm: string) => void;
  handleChangeLanguage: (language: string) => void;
  testContainerRef: React.RefObject<HTMLDivElement>;
}

export const useTypingTest = (): UseTypingTestReturn => {
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

  return {
    typedChars,
    currentPos,
    startTime,
    currentTime,
    wpm,
    accuracy,
    errorCount,
    isComplete,
    selectedAlgorithm,
    selectedLanguage,
    handleKeyDown,
    handleReset,
    handleChangeAlgorithm,
    handleChangeLanguage,
    testContainerRef
  };
};
