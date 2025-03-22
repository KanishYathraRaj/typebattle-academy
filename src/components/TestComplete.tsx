
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { formatTime, getLetterGrade } from '../utils/typeTestUtils';
import { TestResults } from '../context/TestContext';
import { RefreshCw, BarChart, Share2, Trophy, Calendar, Clock, Zap, Target, FileText } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import StatisticsPanel from './StatisticsPanel';

interface TestCompleteProps {
  results: TestResults;
  onRetry: () => void;
}

const TestComplete: React.FC<TestCompleteProps> = ({ results, onRetry }) => {
  const { toast } = useToast();
  const letterGrade = getLetterGrade(results.wpm, results.accuracy);
  
  const handleShare = () => {
    const shareText = `I just typed ${results.topic} in ${results.language} at ${results.wpm} WPM with ${results.accuracy}% accuracy on DSAType! My grade: ${letterGrade}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My DSAType Result',
        text: shareText,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: 'Copied to clipboard!',
          description: 'Share your result with friends.',
        });
      });
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm shadow-sm">
        <CardContent className="p-0">
          {/* Header with grade */}
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent p-6 border-b border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Test Complete!</h2>
                <p className="text-muted-foreground">
                  You've successfully completed the typing test
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary/10 shadow-inner border border-primary/20">
                  <div className="flex flex-col items-center">
                    <Trophy className="h-5 w-5 text-primary mb-1" />
                    <span className="text-4xl font-bold">{letterGrade}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Test details */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Test Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Topic</div>
                      <div className="font-medium">{results.topic}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Language</div>
                      <div className="font-medium">{results.language}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Difficulty</div>
                      <div className="font-medium">{results.difficulty}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-medium">{results.date.toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Time</div>
                      <div className="font-medium">{results.date.toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">Your Performance</h3>
                <StatisticsPanel 
                  wpm={results.wpm}
                  accuracy={results.accuracy}
                  time={results.time}
                  errorCount={results.errors}
                />
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border/30">
              <Button className="flex-1" onClick={onRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              
              <Button variant="outline" className="flex-1" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Result
              </Button>
              
              <Link to="/results" className="flex-1">
                <Button variant="secondary" className="w-full">
                  <BarChart className="mr-2 h-4 w-4" />
                  View All Results
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestComplete;
