
import React from 'react';
import TypeTest from './TypeTest';
import TestComplete from './TestComplete';
import { useTest } from '../context/TestContext';

const TestContent: React.FC = () => {
  const { results, resetTest } = useTest();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {results ? (
        <TestComplete results={results} onRetry={resetTest} />
      ) : (
        <TypeTest />
      )}
    </div>
  );
};

export default TestContent;
