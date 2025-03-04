
import React from 'react';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Clock, Keyboard, Target, AlertTriangle } from 'lucide-react';
import { formatTime } from '../utils/typeTestUtils';

const StatsHeader: React.FC = () => {
  const { isTestActive } = useTest();
  const { wpm, accuracy, currentTime, errorCount, isComplete } = useTypingTest();
  
  if (!isTestActive && !isComplete) return null;
  
  return (
    <div className="fixed top-16 right-0 z-40 p-2 w-full bg-card/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-end gap-6">
          <StatItem icon={<Keyboard className="h-4 w-4" />} value={wpm} label="WPM" />
          <StatItem icon={<Target className="h-4 w-4" />} value={`${accuracy}%`} label="Accuracy" />
          <StatItem icon={<Clock className="h-4 w-4" />} value={formatTime(currentTime)} label="Time" />
          <StatItem icon={<AlertTriangle className="h-4 w-4" />} value={errorCount} label="Errors" />
        </div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ icon: React.ReactNode, value: string | number, label: string }> = ({ 
  icon, value, label 
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="font-bold text-sm">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatsHeader;
