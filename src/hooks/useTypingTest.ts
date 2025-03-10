
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
  selectedCategory: string;
  selectedTopic: string;
  selectedLanguage: string;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleReset: () => void;
  handleChangeCategory: (category: string) => void;
  handleChangeTopic: (topic: string) => void;
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
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  
  const testContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Update local state when currentSnippet changes
  useEffect(() => {
    setSelectedCategory(currentSnippet.category);
    setSelectedTopic(currentSnippet.topic);
    setSelectedLanguage(currentSnippet.language);
  }, [currentSnippet]);

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

  const handleChangeCategory = (category: string) => {
    setSelectedCategory(category);
    const actualCategory = category === 'All' ? undefined : category;
    const actualTopic = selectedTopic === 'All' ? undefined : selectedTopic;
    const actualLanguage = selectedLanguage === 'All' ? undefined : selectedLanguage;
    changeSnippet(actualCategory, actualTopic, actualLanguage);
    handleReset();
  };
  
  const handleChangeTopic = (topic: string) => {
    setSelectedTopic(topic);
    const actualCategory = selectedCategory === 'All' ? undefined : selectedCategory;
    const actualTopic = topic === 'All' ? undefined : topic;
    const actualLanguage = selectedLanguage === 'All' ? undefined : selectedLanguage;
    changeSnippet(actualCategory, actualTopic, actualLanguage);
    handleReset();
  };
  
  const handleChangeLanguage = (language: string) => {
    setSelectedLanguage(language);
    const actualCategory = selectedCategory === 'All' ? undefined : selectedCategory;
    const actualTopic = selectedTopic === 'All' ? undefined : selectedTopic;
    const actualLanguage = language === 'All' ? undefined : language;
    changeSnippet(actualCategory, actualTopic, actualLanguage);
    handleReset();
  };

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
    selectedCategory,
    selectedTopic,
    selectedLanguage,
    handleKeyDown,
    handleReset,
    handleChangeCategory,
    handleChangeTopic,
    handleChangeLanguage,
    testContainerRef
  };
};
