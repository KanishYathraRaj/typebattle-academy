
import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { formatTime } from '../utils/typeTestUtils';
import { Clock, Keyboard, Target, AlertTriangle } from 'lucide-react';

interface StatisticsPanelProps {
  wpm: number;
  accuracy: number;
  time: number;
  errorCount: number;
}

const StatisticsPanel: React.FC<StatisticsPanelProps> = ({ wpm, accuracy, time, errorCount }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      <Card className="glass">
        <CardContent className="flex flex-col items-center justify-center p-4 h-full">
          <Keyboard className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium text-muted-foreground">WPM</p>
          <h3 className="text-3xl font-bold">{wpm}</h3>
        </CardContent>
      </Card>
      
      <Card className="glass">
        <CardContent className="flex flex-col items-center justify-center p-4 h-full">
          <Target className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium text-muted-foreground">Accuracy</p>
          <h3 className="text-3xl font-bold">{accuracy}%</h3>
        </CardContent>
      </Card>
      
      <Card className="glass">
        <CardContent className="flex flex-col items-center justify-center p-4 h-full">
          <Clock className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium text-muted-foreground">Time</p>
          <h3 className="text-3xl font-bold">{formatTime(time)}</h3>
        </CardContent>
      </Card>
      
      <Card className="glass">
        <CardContent className="flex flex-col items-center justify-center p-4 h-full">
          <AlertTriangle className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm font-medium text-muted-foreground">Errors</p>
          <h3 className="text-3xl font-bold">{errorCount}</h3>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPanel;
