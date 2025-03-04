
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-16 pb-16 relative">
        <StatsHeader />
        
        <div className="container mx-auto px-4 py-8 relative">
          <div className="flex flex-row w-full relative">
            <div className={`fixed top-0 left-0 h-full bg-background border-r border-border shadow-lg transition-all duration-300 z-40 pt-16 ${sidebarOpen ? 'w-80' : 'w-0 opacity-0'}`}>
              {sidebarOpen && <DsaSidebar />}
            </div>
            
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
              {results ? (
                <TestComplete results={results} onRetry={resetTest} />
              ) : (
                <TypeTest />
              )}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 rounded-r-lg rounded-l-none border-l-0 h-16"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Test;
