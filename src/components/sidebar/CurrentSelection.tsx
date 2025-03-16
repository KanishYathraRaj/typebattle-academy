
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
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    if (difficulty === 'Hard') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    return '';
  };

  return (
    <>
      <Separator className="my-6" />
      
      <div className="rounded-md bg-card p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Current Selection</h3>
          {difficulty && (
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          )}
        </div>
        <div className="text-xs font-mono mb-1 text-primary">{language}</div>
        <div className="font-medium mb-1">{topic}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </>
  );
};

export default CurrentSelection;
