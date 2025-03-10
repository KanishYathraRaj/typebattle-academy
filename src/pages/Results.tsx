import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { formatTime, getSavedTestResults, clearTestResults } from '../utils/typeTestUtils';
import { TestResults } from '../context/TestContext';
import { BarChart, Clock, Delete, RefreshCw } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useToast } from '../hooks/use-toast';
import { Link } from 'react-router-dom';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Results: React.FC = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<TestResults[]>([]);
  const [averageWpm, setAverageWpm] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [hasResults, setHasResults] = useState(false);
  
  useEffect(() => {
    const loadResults = () => {
      const savedResults = getSavedTestResults();
      setResults(savedResults);
      setHasResults(savedResults.length > 0);
      
      if (savedResults.length > 0) {
        const totalWpm = savedResults.reduce((sum, r) => sum + r.wpm, 0);
        const totalAccuracy = savedResults.reduce((sum, r) => sum + r.accuracy, 0);
        const totalTestTime = savedResults.reduce((sum, r) => sum + r.time, 0);
        
        setAverageWpm(Math.round(totalWpm / savedResults.length));
        setAverageAccuracy(Math.round(totalAccuracy / savedResults.length));
        setTotalTime(totalTestTime);
      }
    };
    
    loadResults();
  }, []);
  
  const handleClearResults = () => {
    if (confirm('Are you sure you want to clear all results? This action cannot be undone.')) {
      clearTestResults();
      setResults([]);
      setHasResults(false);
      setAverageWpm(0);
      setAverageAccuracy(0);
      setTotalTime(0);
      
      toast({
        title: 'Results cleared',
        description: 'All your test results have been deleted.',
      });
    }
  };
  
  const wpmChartData = results.map((result, index) => ({
    id: index,
    date: new Date(result.date).toLocaleDateString(),
    wpm: result.wpm,
    accuracy: result.accuracy,
  })).reverse();
  
  const topicData = results.reduce((acc, result) => {
    const topic = result.topic;
    const existingEntry = acc.find(entry => entry.name === topic);
    
    if (existingEntry) {
      existingEntry.value++;
    } else {
      acc.push({ name: topic, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);
  
  const languageData = results.reduce((acc, result) => {
    const language = result.language;
    const existingEntry = acc.find(entry => entry.name === language);
    
    if (existingEntry) {
      existingEntry.value++;
    } else {
      acc.push({ name: language, value: 1 });
    }
    
    return acc;
  }, [] as { name: string; value: number }[]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">Your Results</h1>
          
          {hasResults ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Average WPM</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <BarChart className="h-10 w-10 text-primary mr-4" />
                      <span className="text-4xl font-bold">{averageWpm}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Average Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                        <span className="text-xl font-bold">%</span>
                      </div>
                      <span className="text-4xl font-bold">{averageAccuracy}%</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="text-xl">Total Practice Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center">
                      <Clock className="h-10 w-10 text-primary mr-4" />
                      <span className="text-4xl font-bold">{formatTime(totalTime)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>WPM Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={wpmChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="wpm" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                          name="WPM"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="accuracy" 
                          stroke="#82ca9d" 
                          name="Accuracy %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>WPM Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={wpmChartData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="wpm" fill="#8884d8" name="WPM" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Topics Practiced</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={topicData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {topicData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Languages</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={languageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {languageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Recent Tests</h2>
                <Button variant="outline" className="text-destructive" onClick={handleClearResults}>
                  <Delete className="mr-2 h-4 w-4" />
                  Clear All Results
                </Button>
              </div>
              
              <div className="space-y-4">
                {results.slice(0, 5).map((result, index) => (
                  <Card key={index} className="glass">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="font-bold text-lg">{result.topic}</h3>
                          <p className="text-sm text-muted-foreground">{result.language}</p>
                          <p className="text-xs mt-1">
                            {new Date(result.date).toLocaleDateString()} at {new Date(result.date).toLocaleTimeString()}
                          </p>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">WPM</p>
                            <p className="text-xl font-bold">{result.wpm}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                            <p className="text-xl font-bold">{result.accuracy}%</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="text-xl font-bold">{formatTime(result.time)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4">No Results Yet</h2>
              <p className="text-muted-foreground mb-8">
                Complete some typing tests to see your performance statistics here.
              </p>
              <Link to="/test">
                <Button size="lg">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Take a Test
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Results;
