import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  PieChart,
  Clock,
  Check,
  Brain,
  Activity,
  Target,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayText}</span>;
};

const PersonalizedRecommendations = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [aiThinking, setAiThinking] = useState(true);

  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Nutrition Plan",
      description: "Customized meal suggestions based on your metabolic profile",
      icon: <PieChart className="w-6 h-6 text-blue-500" />,
      actionButton: "View Plan",
      aiInsight: "Based on your recent activity patterns and nutritional preferences, I've noticed you tend to skip breakfast. I've adjusted your meal plan to include quick, protein-rich morning options.",
      confidence: 89
    },
    {
      id: 2,
      title: "Exercise Routine",
      description: "Tailored workout schedule matching your fitness goals",
      icon: <Activity className="w-6 h-6 text-green-500" />,
      actionButton: "Start Workout",
      aiInsight: "Your heart rate data shows optimal performance during evening workouts. I've scheduled high-intensity sessions between 6-8 PM.",
      confidence: 94
    },
    {
      id: 3,
      title: "Goal Progress",
      description: "AI-powered analysis of your fitness journey",
      icon: <Target className="w-6 h-6 text-purple-500" />,
      actionButton: "View Progress",
      aiInsight: "You're 15% ahead of your weight training goals compared to last month. I suggest increasing weights by 10% this week.",
      confidence: 92
    }
  ]);

  const learningResources = [
    {
      title: "Nutrition Basics",
      icon: <BookOpen className="w-5 h-5 text-orange-500" />,
      duration: "30 min",
      progress: 65
    },
    {
      title: "Stress Management",
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      duration: "45 min",
      progress: 30
    },
    {
      title: "Sleep Optimization",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      duration: "25 min",
      progress: 80
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsAnalyzing(false);
          setTimeout(() => setShowRecommendations(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {isAnalyzing ? (
        <Card className="border-2 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Sparkles className="w-6 h-6 text-blue-500 animate-pulse" />
              <div className="flex-1">
                <TypewriterText 
                  text="Analyzing your health data and generating personalized recommendations..." 
                />
                <Progress value={progress} className="mt-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-blue-500" />
              Personalized Recommendations
            </h1>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="text-sm text-purple-600">AI Assistant Active</span>
            </div>
          </div>

          {showRecommendations && (
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec) => (
                  <Card key={rec.id} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {rec.icon}
                        <span className="text-sm text-gray-500">
                          {rec.confidence}% confidence
                        </span>
                      </div>
                      <CardTitle className="text-lg mt-2">{rec.title}</CardTitle>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        className="w-full gap-2"
                        onClick={() => setSelectedInsight(rec.id)}
                      >
                        <MessageSquare className="w-4 h-4" />
                        View AI Insight
                      </Button>
                      {selectedInsight === rec.id && (
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                          <TypewriterText text={rec.aiInsight} />
                        </div>
                      )}
                      <Button variant="outline" className="w-full">
                        {rec.actionButton}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Learning Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {learningResources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center gap-4">
                          {resource.icon}
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {resource.duration}
                            </div>
                          </div>
                        </div>
                        <div className="w-32">
                          <Progress value={resource.progress} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PersonalizedRecommendations;
