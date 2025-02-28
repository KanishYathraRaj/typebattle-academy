
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Keyboard, Code, BarChart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
        Master Typing <span className="text-primary">DSA Code</span> <br /> Like a Pro
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 opacity-0 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        Improve your programming speed with typing tests specifically designed 
        for data structures and algorithms code. Practice typing real DSA implementations 
        and boost your coding interview performance.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <Link to="/test" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto group">
            <span>Start Typing</span>
            <Keyboard className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        
        <Link to="/results" className="w-full sm:w-auto">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <span>View Stats</span>
            <BarChart className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl opacity-0 animate-slide-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
        <div className="glass p-6 rounded-lg text-left">
          <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Real DSA Code</h3>
          <p className="text-muted-foreground">Practice with actual implementations of common data structures and algorithms.</p>
        </div>
        
        <div className="glass p-6 rounded-lg text-left">
          <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            <Keyboard className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Improve Speed</h3>
          <p className="text-muted-foreground">Track your WPM and accuracy to continuously improve your coding speed.</p>
        </div>
        
        <div className="glass p-6 rounded-lg text-left">
          <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
            <BarChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Track Progress</h3>
          <p className="text-muted-foreground">View detailed statistics about your performance and track your improvement over time.</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
