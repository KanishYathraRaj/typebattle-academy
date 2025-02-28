
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TypeTest from '../components/TypeTest';
import TestComplete from '../components/TestComplete';
import { useTest } from '../context/TestContext';

const Test: React.FC = () => {
  const { results, resetTest } = useTest();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          {results ? (
            <TestComplete results={results} onRetry={resetTest} />
          ) : (
            <TypeTest />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Test;
