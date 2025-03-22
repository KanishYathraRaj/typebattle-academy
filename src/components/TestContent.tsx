
import React from 'react';
import TypeTest from './TypeTest';
import TestComplete from './TestComplete';
import { useTest } from '../context/TestContext';

const TestContent: React.FC = () => {
  const { results, resetTest } = useTest();

  return (
    <div>
      {results ? (
        <TestComplete results={results} onRetry={resetTest} />
      ) : (
        <TypeTest />
      )}
    </div>
  );
};

export default TestContent;
