
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { formatTime, getLetterGrade } from '../utils/typeTestUtils';
import { TestResults } from '../context/TestContext';
import { RefreshCw, BarChart, Share2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

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
      <Card className="glass">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Test Complete!</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-primary/10 border-4 border-primary/20">
              <span className="text-5xl font-bold">{letterGrade}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="stats-card">
              <span className="text-muted-foreground text-sm">WPM</span>
              <span className="text-3xl font-bold">{results.wpm}</span>
            </div>
            
            <div className="stats-card">
              <span className="text-muted-foreground text-sm">Accuracy</span>
              <span className="text-3xl font-bold">{results.accuracy}%</span>
            </div>
            
            <div className="stats-card">
              <span className="text-muted-foreground text-sm">Time</span>
              <span className="text-3xl font-bold">{formatTime(results.time)}</span>
            </div>
            
            <div className="stats-card">
              <span className="text-muted-foreground text-sm">Errors</span>
              <span className="text-3xl font-bold">{results.errors}</span>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-lg font-medium">{results.topic}</p>
            <p className="text-sm text-muted-foreground mb-4">{results.language}</p>
            <p className="text-sm">
              Completed on {results.date.toLocaleDateString()} at {results.date.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Result
            </Button>
            
            <Link to="/results">
              <Button variant="secondary">
                <BarChart className="mr-2 h-4 w-4" />
                View All Results
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestComplete;
