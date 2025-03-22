
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
    <div className="grid grid-cols-2 gap-3">
      <Card className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Keyboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Speed</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{wpm}</h3>
              <span className="text-xs text-muted-foreground ml-1">WPM</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{accuracy}</h3>
              <span className="text-xs text-muted-foreground ml-1">%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{formatTime(time)}</h3>
              <span className="text-xs text-muted-foreground ml-1">sec</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Errors</p>
            <h3 className="text-2xl font-bold">{errorCount}</h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPanel;
