
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { clearTestResults } from '../utils/typeTestUtils';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { MoonStar, Sun, Trash, Share2, GithubIcon, TwitterIcon } from 'lucide-react';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(
    localStorage.getItem('soundEnabled') !== 'false'
  );
  
  const handleToggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem('soundEnabled', String(newValue));
    
    toast({
      title: `Sound ${newValue ? 'enabled' : 'disabled'}`,
      description: `Typing sounds are now ${newValue ? 'on' : 'off'}.`,
    });
  };
  
  const handleClearResults = () => {
    if (confirm('Are you sure you want to clear all results? This action cannot be undone.')) {
      clearTestResults();
      
      toast({
        title: 'Results cleared',
        description: 'All your test results have been deleted.',
      });
    }
  };
  
  const handleShare = () => {
    const shareText = "Improve your DSA coding speed with DSAType - a typing practice site specifically for data structures and algorithms!";
    
    if (navigator.share) {
      navigator.share({
        title: 'DSAType - Typing Practice for Programmers',
        text: shareText,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(`${shareText} ${window.location.href}`).then(() => {
        toast({
          title: 'Copied to clipboard!',
          description: 'Share DSAType with your friends.',
        });
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>
          
          <div className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how DSAType looks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {theme === 'dark' ? <MoonStar className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <Label htmlFor="theme-toggle">Theme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Light</span>
                    <Switch 
                      id="theme-toggle" 
                      checked={theme === 'dark'}
                      onCheckedChange={toggleTheme}
                    />
                    <span className="text-sm text-muted-foreground">Dark</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Sound</CardTitle>
                <CardDescription>Manage sound settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-toggle">Enable typing sounds</Label>
                  <Switch 
                    id="sound-toggle" 
                    checked={soundEnabled}
                    onCheckedChange={handleToggleSound}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Data</CardTitle>
                <CardDescription>Manage your data and results</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="text-destructive w-full mb-4" 
                  onClick={handleClearResults}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Clear All Test Results
                </Button>
                <p className="text-sm text-muted-foreground">
                  This will permanently delete all your saved typing test results and statistics.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Share</CardTitle>
                <CardDescription>Share DSAType with others</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share DSAType
                </Button>
                
                <Separator className="my-6" />
                
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <GithubIcon className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <TwitterIcon className="h-6 w-6" />
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center text-sm text-muted-foreground">
              <p>DSAType v1.0.0</p>
              <p className="mt-1">Created with ❤️ for competitive programmers</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
