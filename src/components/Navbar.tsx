
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/button';
import { Keyboard, Moon, Sun, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 glass shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <Keyboard className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
          <span className="text-xl font-mono font-bold tracking-tight">
            DSA<span className="text-primary">Type</span>
          </span>
        </Link>
        
        <div className="flex items-center space-x-1">
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={location.pathname === '/' ? 'secondary' : 'ghost'} 
                className="font-medium"
              >
                Home
              </Button>
            </Link>
            <Link to="/test">
              <Button 
                variant={location.pathname === '/test' ? 'secondary' : 'ghost'} 
                className="font-medium"
              >
                Practice
              </Button>
            </Link>
            <Link to="/results">
              <Button 
                variant={location.pathname === '/results' ? 'secondary' : 'ghost'} 
                className="font-medium"
              >
                Results
              </Button>
            </Link>
          </nav>
          
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="ml-2">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-1">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
