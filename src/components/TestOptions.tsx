
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { getCategories, getLanguages } from '../utils/codeSnippets';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface TestOptionsProps {
  selectedCategory: string;
  selectedLanguage: string;
  onCategoryChange: (category: string) => void;
  onLanguageChange: (language: string) => void;
  onReset: () => void;
}

const TestOptions: React.FC<TestOptionsProps> = ({
  selectedCategory,
  selectedLanguage,
  onCategoryChange,
  onLanguageChange,
  onReset
}) => {
  const categories = ['All', ...getCategories()];
  const languages = ['All', ...getLanguages()];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center w-full mt-6">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category-select" className="text-sm font-medium mb-1 block">
            Category
          </label>
          <Select 
            value={selectedCategory} 
            onValueChange={onCategoryChange}
          >
            <SelectTrigger id="category-select" className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="language-select" className="text-sm font-medium mb-1 block">
            Language
          </label>
          <Select 
            value={selectedLanguage} 
            onValueChange={onLanguageChange}
          >
            <SelectTrigger id="language-select" className="w-full">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map(language => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex-shrink-0 mt-2 md:mt-6">
        <Button variant="outline" size="icon" onClick={onReset}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TestOptions;
