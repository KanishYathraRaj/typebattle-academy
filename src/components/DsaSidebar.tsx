
import React, { useState } from 'react';
import { getAlgorithms, getLanguages } from '../utils/codeSnippets';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTest } from '../context/TestContext';
import { useTypingTest } from '../hooks/useTypingTest';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

const DsaSidebar: React.FC = () => {
  const { currentSnippet, changeSnippet } = useTest();
  const { handleReset } = useTypingTest();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(currentSnippet.algorithm);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentSnippet.language);
  
  const algorithms = getAlgorithms();
  const languages = getLanguages();
  
  const handleAlgorithmChange = (algorithm: string) => {
    setSelectedAlgorithm(algorithm);
    changeSnippet(algorithm, selectedLanguage);
    handleReset();
  };
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    changeSnippet(selectedAlgorithm, language);
    handleReset();
  };

  return (
    <div className="h-full overflow-y-auto p-4 pt-6 pb-24">
      <h2 className="text-2xl font-bold mb-4">DSA Syllabus</h2>
      
      <div className="mb-6">
        <label className="text-sm font-medium mb-2 block">Programming Language</label>
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger>
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
      
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2 block">Algorithm Categories</h3>
        <div className="space-y-2">
          {algorithms.map(algorithm => (
            <Card 
              key={algorithm} 
              className={`cursor-pointer transition-colors ${selectedAlgorithm === algorithm ? 'bg-primary/10 border-primary/50' : ''}`}
              onClick={() => handleAlgorithmChange(algorithm)}
            >
              <CardContent className="p-3">
                <div className="font-medium">{algorithm}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div>
        <h3 className="text-lg font-medium mb-3">Current Selection</h3>
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">{currentSnippet.algorithm}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground mb-1">{currentSnippet.language}</div>
            <p className="text-sm">{currentSnippet.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DsaSidebar;
