
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TypeTest from '../components/TypeTest';
import TestComplete from '../components/TestComplete';
import { useTest } from '../context/TestContext';
import DsaSidebar from '../components/DsaSidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsHeader from '../components/StatsHeader';

const Test: React.FC = () => {
  const { results, resetTest } = useTest();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="flex flex-1 pt-16 relative">
        {/* Left Sidebar */}
        <div 
          className={`fixed top-0 left-0 h-full bg-background border-r border-border z-40 pt-16 transition-all duration-300 ${
            sidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full'
          }`}
        >
          <DsaSidebar />
        </div>
        
        {/* Toggle Sidebar Button */}
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed top-28 left-0 z-50 rounded-r-md rounded-l-none border-l-0 shadow-md"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
          {/* Stats Header */}
          <StatsHeader />
          
          <div className="container max-w-4xl mx-auto px-4 py-8">
            {results ? (
              <TestComplete results={results} onRetry={resetTest} />
            ) : (
              <TypeTest />
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Test;
