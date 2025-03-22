
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DsaSidebar from '../components/DsaSidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsHeader from '../components/StatsHeader';
import TestContent from '../components/TestContent';

const Test: React.FC = () => {
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
          className={`fixed top-0 left-0 h-full bg-background border-r border-border/50 z-40 pt-16 transition-all duration-300 ${
            sidebarOpen ? 'w-72 translate-x-0' : 'w-72 -translate-x-full'
          }`}
        >
          <DsaSidebar />
        </div>
        
        {/* Toggle Sidebar Button */}
        <Button 
          variant="secondary" 
          size="icon" 
          className="fixed top-20 left-0 z-50 rounded-r-md rounded-l-none border border-border/50 border-l-0 shadow-md"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 pb-20 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
          {/* Stats Header */}
          <StatsHeader />
          
          {/* Test Content */}
          <div className="container mx-auto px-6 py-8">
            <TestContent />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Test;
