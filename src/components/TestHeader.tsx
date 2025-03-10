
import React from 'react';
import { useTest } from '../context/TestContext';

const TestHeader: React.FC = () => {
  const { currentSnippet } = useTest();

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{currentSnippet.topic}</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-1 text-xs font-medium bg-primary/10 rounded-full">
          {currentSnippet.language}
        </span>
        <span className="text-sm text-muted-foreground">
          {currentSnippet.description}
        </span>
      </div>
    </div>
  );
};

export default TestHeader;
