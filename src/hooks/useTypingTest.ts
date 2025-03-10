
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTest } from '../context/TestContext';
import { calculateWPM, calculateAccuracy } from '../utils/typeTestUtils';
import { useToast } from './use-toast';

interface UseTypingTestReturn {
  typedChars: string[];
  currentPos: number;
  startTime: number | null;
  currentTime: number;
  wpm: number;
  accuracy: number;
  errorCount: number;
  isComplete: boolean;
  testContainerRef: React.RefObject<HTMLDivElement>;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleReset: () => void;
}

export const useTypingTest = (): UseTypingTestReturn => {
  const { toast } = useToast();
  const { 
    currentSnippet, 
    isTestActive, 
    startTest, 
    endTest, 
    resetTest
  } = useTest();
  
  const [typedChars, setTypedChars] = useState<string[]>([]);
  const [currentPos, setCurrentPos] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errorCount, setErrorCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const testContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isTestActive && startTime) {
      timerRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setCurrentTime(elapsed);
        
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
  
  useEffect(() => {
    if (isTestActive && testContainerRef.current) {
      testContainerRef.current.focus();
    }
  }, [isTestActive]);

  const completeTest = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setIsComplete(true);
    
    const finalElapsed = Math.floor((Date.now() - (startTime || 0)) / 1000);
    const finalWpm = calculateWPM(currentSnippet.code.length, finalElapsed);
    
    endTest({
      wpm: finalWpm,
      accuracy,
      time: finalElapsed,
      errors: errorCount,
      snippetId: currentSnippet.id,
      category: currentSnippet.category,
      topic: currentSnippet.topic,
      language: currentSnippet.language,
      difficulty: currentSnippet.difficulty,
      date: new Date()
    });
    
    toast({
      title: 'Test Complete!',
      description: `You typed at ${finalWpm} WPM with ${accuracy}% accuracy.`,
    });
  }, [accuracy, currentSnippet, endTest, errorCount, startTime, toast]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isTestActive || isComplete) return;
    
    if (currentPos === 0 && !startTime) {
      setStartTime(Date.now());
    }
    
    if (e.key === 'Enter') {
      const expectedChar = currentSnippet.code[currentPos];
      
      if (expectedChar === '\n') {
        const newTypedChars = [...typedChars];
        newTypedChars[currentPos] = '\n';
        setTypedChars(newTypedChars);
        
        const newPos = currentPos + 1;
        setCurrentPos(newPos);
        
        const correctChars = newTypedChars.filter((char, i) => 
          char === currentSnippet.code[i]
        ).length;
        
        setAccuracy(calculateAccuracy(correctChars, newPos));
        
        if (newPos >= currentSnippet.code.length) {
          completeTest();
        }
      } else {
        const newTypedChars = [...typedChars];
        newTypedChars[currentPos] = '\n';
        setTypedChars(newTypedChars);
        
        setErrorCount(prev => prev + 1);
        
        const newPos = currentPos + 1;
        setCurrentPos(newPos);
        
        const correctChars = newTypedChars.filter((char, i) => 
          char === currentSnippet.code[i]
        ).length;
        
        setAccuracy(calculateAccuracy(correctChars, newPos));
        
        if (newPos >= currentSnippet.code.length) {
          completeTest();
        }
      }
      
      e.preventDefault();
      return;
    }
    
    if (e.key.length === 1) {
      const expectedChar = currentSnippet.code[currentPos];
      const typedChar = e.key;
      
      const newTypedChars = [...typedChars];
      newTypedChars[currentPos] = typedChar;
      setTypedChars(newTypedChars);
      
      if (typedChar !== expectedChar) {
        setErrorCount(prev => prev + 1);
      }
      
      const newPos = currentPos + 1;
      setCurrentPos(newPos);
      
      const correctChars = newTypedChars.filter((char, i) => 
        char === currentSnippet.code[i]
      ).length;
      
      setAccuracy(calculateAccuracy(correctChars, newPos));
      
      if (newPos >= currentSnippet.code.length) {
        completeTest();
      }
    } else if (e.key === 'Backspace' && currentPos > 0) {
      const newPos = currentPos - 1;
      setCurrentPos(newPos);
      
      const expectedChar = currentSnippet.code[newPos];
      const typedChar = typedChars[newPos];
      
      if (typedChar !== expectedChar) {
        setErrorCount(prev => Math.max(0, prev - 1));
      }
      
      const newTypedChars = [...typedChars];
      newTypedChars.pop();
      setTypedChars(newTypedChars);
      
      const correctChars = newTypedChars.filter((char, i) => 
        char === currentSnippet.code[i]
      ).length;
      
      setAccuracy(calculateAccuracy(correctChars, newPos));
    }
    
    if (['Space', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault();
    }
  }, [isTestActive, isComplete, currentPos, startTime, typedChars, currentSnippet, completeTest]);

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

  // Reset typed chars when code snippet changes
  useEffect(() => {
    setTypedChars([]);
    setCurrentPos(0);
    setStartTime(null);
    setCurrentTime(0);
    setWpm(0);
    setAccuracy(100);
    setErrorCount(0);
    setIsComplete(false);
  }, [currentSnippet.id]);

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
    handleKeyDown,
    handleReset,
    testContainerRef
  };
};
