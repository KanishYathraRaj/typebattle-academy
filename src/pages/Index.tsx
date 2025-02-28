
import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <Hero />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
