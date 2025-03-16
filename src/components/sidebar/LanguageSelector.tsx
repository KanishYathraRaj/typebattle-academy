
import React from 'react';
import { Layers } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { getLanguages } from '../../utils/codeSnippets';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const languages = getLanguages();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2 text-muted-foreground">
        <div className="flex items-center">
          <Layers className="h-4 w-4 mr-1" />
          <span>Programming Language</span>
        </div>
      </label>
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full">
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
  );
};

export default LanguageSelector;
