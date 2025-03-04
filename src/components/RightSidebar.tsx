
import React from 'react';
import StatisticsPanel from './StatisticsPanel';
import { useTest } from '../context/TestContext';
import { useTypingTest } from '../hooks/useTypingTest';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const RightSidebar: React.FC = () => {
  const { isTestActive, currentSnippet } = useTest();
  const { wpm, accuracy, currentTime, errorCount, isComplete } = useTypingTest();
  
  return (
    <div className="w-80 space-y-6">
      {/* Statistics Panel */}
      {(isTestActive || isComplete) && (
        <Card className="glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <StatisticsPanel 
              wpm={wpm} 
              accuracy={accuracy} 
              time={currentTime} 
              errorCount={errorCount} 
            />
          </CardContent>
        </Card>
      )}
      
      {/* Current Topic */}
      <Card className="glass">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Currently Practicing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="font-medium">{currentSnippet.algorithm}</div>
            <div className="text-muted-foreground mt-1">{currentSnippet.language}</div>
            <div className="mt-2 text-xs leading-relaxed">{currentSnippet.description}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;
