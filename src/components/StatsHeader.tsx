
import React from 'react';
import { useTypingTest } from '../hooks/useTypingTest';
import { useTest } from '../context/TestContext';
import { Clock, Keyboard, Target, AlertTriangle } from 'lucide-react';
import { formatTime } from '../utils/typeTestUtils';
import { cn } from '@/lib/utils';

const StatsHeader: React.FC = () => {
  const { isTestActive } = useTest();
  const { wpm, accuracy, currentTime, errorCount, isComplete } = useTypingTest();
  
  if (!isTestActive && !isComplete) return null;
  
  return (
    <div className="sticky top-16 z-30 w-full bg-background/80 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="container mx-auto py-2 px-4">
        <div className="flex justify-between items-center overflow-x-auto">
          <div className="hidden md:block opacity-0 w-32">
            {/* Spacer for alignment */}
          </div>
          
          <div className="flex gap-6 items-center px-4">
            <StatItem icon={<Keyboard className="h-4 w-4" />} value={wpm} label="WPM" primary />
            <StatItem icon={<Target className="h-4 w-4" />} value={`${accuracy}%`} label="Accuracy" />
            <StatItem icon={<Clock className="h-4 w-4" />} value={formatTime(currentTime)} label="Time" />
            <StatItem icon={<AlertTriangle className="h-4 w-4" />} value={errorCount} label="Errors" />
          </div>
          
          <div className="hidden md:block opacity-0 w-32">
            {/* Spacer for alignment */}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem: React.FC<{ 
  icon: React.ReactNode, 
  value: string | number, 
  label: string,
  primary?: boolean 
}> = ({ 
  icon, 
  value, 
  label,
  primary = false
}) => {
  return (
    <div className={cn(
      "flex items-center gap-2 transition-all",
      primary ? "scale-110" : ""
    )}>
      <div className={cn(
        "p-1 rounded-full",
        primary ? "bg-primary/10 text-primary" : "text-muted-foreground"
      )}>
        {icon}
      </div>
      <div>
        <p className={cn(
          "font-mono",
          primary ? "text-xl font-bold text-primary" : "text-base font-medium text-foreground"
        )}>
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatsHeader;
