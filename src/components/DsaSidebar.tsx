
import React, { useState, useEffect } from 'react';
import { useTest } from '../context/TestContext';
import SidebarHeader from './sidebar/SidebarHeader';
import LanguageSelector from './sidebar/LanguageSelector';
import TopicList from './sidebar/TopicList';
import CurrentSelection from './sidebar/CurrentSelection';

const DsaSidebar: React.FC = () => {
  const { currentSnippet, changeSnippet } = useTest();
  
  // Local UI state
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>(currentSnippet.category);
  const [selectedTopic, setSelectedTopic] = useState<string>(currentSnippet.topic);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentSnippet.language);
  
  // Initialize open categories
  useEffect(() => {
    const initialOpenCategories: Record<string, boolean> = {};
    const categories = [];
    import('../utils/codeSnippets').then(module => {
      const categories = module.getCategories();
      categories.forEach(category => {
        initialOpenCategories[category] = category === selectedCategory;
      });
      setOpenCategories(initialOpenCategories);
    });
  }, [selectedCategory]);
  
  // Sync local state with context when snippet changes
  useEffect(() => {
    setSelectedCategory(currentSnippet.category);
    setSelectedTopic(currentSnippet.topic);
    setSelectedLanguage(currentSnippet.language);
  }, [currentSnippet]);
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleChangeCategory = (category: string) => {
    console.log("DsaSidebar - Changing category to:", category);
    setSelectedCategory(category);
    changeSnippet(category, undefined, selectedLanguage);
  };
  
  const handleChangeTopic = (topic: string) => {
    console.log("DsaSidebar - Changing topic to:", topic, "in category:", selectedCategory);
    setSelectedTopic(topic);
    changeSnippet(selectedCategory, topic, selectedLanguage);
  };
  
  const handleChangeLanguage = (language: string) => {
    console.log("DsaSidebar - Changing language to:", language);
    setSelectedLanguage(language);
    changeSnippet(selectedCategory, selectedTopic, language);
  };

  return (
    <div className="h-full overflow-y-auto py-4 px-4 font-sans">
      <SidebarHeader />
      
      <LanguageSelector 
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleChangeLanguage}
      />
      
      <TopicList 
        selectedCategory={selectedCategory}
        selectedTopic={selectedTopic}
        onCategoryChange={handleChangeCategory}
        onTopicChange={handleChangeTopic}
        openCategories={openCategories}
        toggleCategory={toggleCategory}
        difficulty={currentSnippet.difficulty}
      />
      
      <CurrentSelection 
        difficulty={currentSnippet.difficulty}
        language={currentSnippet.language}
        topic={currentSnippet.topic}
        description={currentSnippet.description}
      />
    </div>
  );
};

export default DsaSidebar;
