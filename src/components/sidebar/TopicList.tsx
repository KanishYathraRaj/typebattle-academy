
import React from 'react';
import { BookOpen, ChevronDown } from 'lucide-react';
import { getCategories, getTopics } from '../../utils/codeSnippets';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface TopicListProps {
  selectedCategory: string;
  selectedTopic: string;
  onCategoryChange: (category: string) => void;
  onTopicChange: (topic: string) => void;
  openCategories: Record<string, boolean>;
  toggleCategory: (category: string) => void;
  difficulty?: string;
}

const TopicList: React.FC<TopicListProps> = ({
  selectedCategory,
  selectedTopic,
  onCategoryChange,
  onTopicChange,
  openCategories,
  toggleCategory,
  difficulty,
}) => {
  const categories = getCategories();

  const getDifficultyColor = (difficulty?: string) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    if (difficulty === 'Hard') return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    return '';
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-muted-foreground">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>DSA Topics</span>
          </div>
        </label>
      </div>
      
      <div className="space-y-2">
        {categories.map(category => {
          const topics = getTopics(category);
          if (topics.length === 0) return null;
          
          return (
            <Collapsible 
              key={category} 
              open={openCategories[category]} 
              onOpenChange={() => toggleCategory(category)}
              className="border rounded-md overflow-hidden"
            >
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between hover:bg-accent">
                <span className="font-medium">{category}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${openCategories[category] ? 'transform rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-1">
                  {topics.map(topic => {
                    const isActive = selectedCategory === category && selectedTopic === topic;
                    return (
                      <button
                        key={topic}
                        className={cn(
                          "w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between transition-colors",
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-foreground hover:bg-accent"
                        )}
                        onClick={() => {
                          if (selectedCategory !== category) {
                            onCategoryChange(category);
                          }
                          onTopicChange(topic);
                        }}
                      >
                        <span>{topic}</span>
                        {isActive && (
                          <Badge variant="outline" className={cn(
                            "text-xs",
                            getDifficultyColor(difficulty)
                          )}>
                            {difficulty}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default TopicList;
