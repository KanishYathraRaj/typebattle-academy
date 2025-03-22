
import React from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface CurrentSelectionProps {
  difficulty?: string;
  language: string;
  topic: string;
  description: string;
}

const CurrentSelection: React.FC<CurrentSelectionProps> = ({
  difficulty,
  language,
  topic,
  description,
}) => {
  const getDifficultyColor = (difficulty?: string) => {
    if (difficulty === 'Easy') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300';
    if (difficulty === 'Medium') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    if (difficulty === 'Hard') return 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300';
    return '';
  };

  return (
    <>
      <Separator className="my-6" />
      
      <div className="rounded-md overflow-hidden bg-card/50 border border-border/50 backdrop-blur-sm shadow-sm">
        <div className="bg-muted/30 px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-medium">Current Selection</h3>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded">
              {language}
            </div>
            
            {difficulty && (
              <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            )}
          </div>
          
          <div className="font-medium mb-2">{topic}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  );
};

export default CurrentSelection;
