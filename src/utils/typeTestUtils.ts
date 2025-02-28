
import { TestResults } from '../context/TestContext';

// Calculate words per minute (WPM)
export const calculateWPM = (charCount: number, time: number): number => {
  // Average word length is considered to be 5 characters
  const wordCount = charCount / 5;
  const minutes = time / 60;
  return Math.round(wordCount / minutes);
};

// Calculate accuracy percentage
export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

// Format time in mm:ss format
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Get letter grade based on WPM and accuracy
export const getLetterGrade = (wpm: number, accuracy: number): string => {
  if (wpm >= 80 && accuracy >= 98) return 'S';
  if (wpm >= 70 && accuracy >= 95) return 'A+';
  if (wpm >= 60 && accuracy >= 92) return 'A';
  if (wpm >= 50 && accuracy >= 90) return 'B+';
  if (wpm >= 40 && accuracy >= 88) return 'B';
  if (wpm >= 30 && accuracy >= 85) return 'C+';
  if (wpm >= 20 && accuracy >= 80) return 'C';
  return 'D';
};

// Generate random test ID
export const generateTestId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Save test results to local storage
export const saveTestResult = (result: TestResults): void => {
  const savedResults = localStorage.getItem('typeTestResults');
  const results = savedResults ? JSON.parse(savedResults) : [];
  results.push({
    ...result,
    date: result.date.toString() // Convert date to string for storage
  });
  localStorage.setItem('typeTestResults', JSON.stringify(results));
};

// Get all saved test results
export const getSavedTestResults = (): TestResults[] => {
  const savedResults = localStorage.getItem('typeTestResults');
  if (!savedResults) return [];
  const results = JSON.parse(savedResults);
  return results.map((result: any) => ({
    ...result,
    date: new Date(result.date) // Convert string back to date
  }));
};

// Clear all saved test results
export const clearTestResults = (): void => {
  localStorage.removeItem('typeTestResults');
};
