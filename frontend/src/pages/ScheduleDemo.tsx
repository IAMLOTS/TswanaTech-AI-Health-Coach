Import React, { useState, useEffect } from ‘react’;
Import { 
  Sparkles, 
  Calendar, 
  Clock, 
  UserCheck, 
  Send, 
  Brain,
  Zap
} from ‘lucide-react’;
Import { motion } from ‘framer-motion’;
Import { Button } from ‘@/components/ui/button’;
Import { Input } from ‘@/components/ui/input’;
Import { Card, CardContent, CardHeader, CardTitle } from ‘@/components/ui/card’;

Const ScheduleDemoPage = () => {
  Const [step, setStep] = useState(1);
  Const [demoPreference, setDemoPreference] = useState(null);
  Const [selectedTime, setSelectedTime] = useState(null);
  Const [userData, setUserData] = useState({
    Name: ‘’,
    Email: ‘’,
    phoneNumber: ‘’
  });
  Const [availableTimes, setAvailableTimes] = useState([]);
  Const [aiSuggestion, setAiSuggestion] = useState(null);

  // Simulate AI-powered time suggestions
  useEffect(() => {
    if (demoPreference) {
      const generateAITimes = () => {
        const baseTime = new Date();
        const suggestions = [1, 2, 3].map((offset) => {
          const suggestedTime = new Date(baseTime.getTime() + offset * 24 * 60 * 60 * 1000);
          const hours = [9, 11, 14, 16];
          const randomHour = hours[Math.floor(Math.random() * hours.length)];
          suggestedTime.setHours(randomHour, 0, 0, 0);
          return suggestedTime;
        });
        setAvailableTimes(suggestions);
        
        // AI-powered time suggestion logic
        Const aiSuggestedTime = suggestions[Math.floor(Math.random() * suggestions.length)];
        setAiSuggestion(aiSuggestedTime);
      };

      generateAITimes();
    }
  }, [demoPreference]);

  Const handleInputChange = € => {
    Const { name, value } = e.target;
    setUserData(prev => ({
      …prev,
      [name]: value
    }));
  };

  Const renderStep = () => {
    Switch(step) {
      Case 1:
        Return (
          <motion.div 
            Initial={{ opacity: 0, x: 50 }}
            Animate={{ opacity: 1, x: 0 }}
            className=”space-y-6”
          >
            <h2 className=”text-3xl font-bold text-gray-900 flex items-center”>
              Select Demo Type 
              <Brain className=”ml-3 text-purple-500 animate-pulse” />
            </h2>
            <div className=”grid md:grid-cols-3 gap-4”>
              {[
                { 
                  Title: “Personal Health Coaching”, 
                  Description: “Personalized 1:1 AI Health Insights”,
                  Icon: <UserCheck className=”w-12 h-12 text-blue-500” />
                },
                { 
                  Title: “Enterprise Solutions”, 
                  Description: “AI Health Management for Organizations”,
                  Icon: <Zap className=”w-12 h-12 text-yellow-500” />
                },
                { 
                  Title: “Research & Development”, 
                  Description: “Advanced AI Health Technologies”,
                  Icon: <Sparkles className=”w-12 h-12 text-green-500” />
                }
              ].map((option, index) => (
                <Card 
                  Key={index}
                  className={`hover:shadow-xl transition-all cursor-pointer ${
                    demoPreference === index 
                      ? ‘border-blue-500 shadow-lg scale-105’ 
                      : ‘border-gray-200’
                  }`}
                  onClick={() => setDemoPreference(index)}
                >
                  <CardHeader>
                    <CardTitle className=”flex items-center”>
                      {option.icon}
                      <span className=”ml-3”>{option.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className=”text-gray-600”>{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        );
      
      Case 2:
        Return (
          <motion.div 
            Initial={{ opacity: 0, x: 50 }}
            Animate={{ opacity: 1, x: 0 }}
            className=”space-y-6”
          >
            <h2 className=”text-3xl font-bold text-gray-900 flex items-center”>
              AI-Powered Time Suggestions 
              <Sparkles className=”ml-3 text-yellow-500 animate-pulse” />
            </h2>
            <div className=”space-y-4”>
              {aiSuggestion && (
                <div className=”bg-blue-50 border-l-4 border-blue-500 p-4”>
                  <p className=”flex items-center text-blue-700”>
                    <Brain className=”mr-3 text-purple-500” />
                    AI Recommended Time:
                  </p>
                  <p className=”font-bold text-lg”>
                    {aiSuggestion.toLocaleDateString(‘en-US’, {
                      Weekday: ‘long’, 
                      Year: ‘numeric’, 
                      Month: ‘long’, 
                      Day: ‘numeric’
                    })} at {aiSuggestion.toLocaleTimeString(‘en-US’, {
                      Hour: ‘2-digit’, 
                      Minute: ‘2-digit’
                    })}
                  </p>
                </div>
              )}
              <div className=”grid md:grid-cols-3 gap-4”>
                {availableTimes.map((time, index) => (
                  <Card 
                    Key={index}
                    className={`hover:shadow-xl transition-all cursor-pointer ${
                      selectedTime === index 
                        ? ‘border-green-500 shadow-lg scale-105’ 
                        : ‘border-gray-200’
                    }`}
                    onClick={() => setSelectedTime(index)}
                  >
                    <CardHeader>
                      <CardTitle className=”flex items-center”>
                        <Calendar className=”mr-3 text-blue-500” />
                        {time.toLocaleDateString(‘en-US’, {
                          Weekday: ‘short’, 
                          Month: ‘short’, 
                          Day: ‘numeric’
                        })}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className=”flex items-center”>
                        <Clock className=”mr-2 text-green-500” />
                        {time.toLocaleTimeString(‘en-US’, {
                          Hour: ‘2-digit’, 
                          Minute: ‘2-digit’
                        })}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        );
      
      Case 3:
        Return (
          <motion.div 
            Initial={{ opacity: 0, x: 50 }}
            Animate={{ opacity: 1, x: 0 }}
            className=”space-y-6”
          >
            <h2 className=”text-3xl font-bold text-gray-900 flex items-center”>
              Your Contact Details 
              <Send className=”ml-3 text-blue-500” />
            </h2>
            <div className=”space-y-4”>
              <div>
                <label className=”block mb-2”>Full Name</label>
                <Input 
                  Name=”name”
                  Value={userData.name}
                  onChange={handleInputChange}
                  placeholder=”Enter your full name”
                />
              </div>
              <div>
                <label className=”block mb-2”>Email Address</label>
                <Input 
                  Name=”email”
                  Type=”email”
                  Value={userData.email}
                  onChange={handleInputChange}
                  placeholder=”Enter your email”
                />
              </div>
              <div>
                <label className=”block mb-2”>Phone Number</label>
                <Input 
                  Name=”phoneNumber”
                  Type=”tel”
                  Value={userData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder=”Enter your phone number”
                />
              </div>
            </div>
          </motion.div>
        );
      
      Default:
        Return null;
    }
  };

  Const handleNextStep = () => {
    If (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  Const handlePreviousStep = () => {
    If (step > 1) {
      setStep(prev => prev – 1);
    }
  };

  Const handleSubmit = () => {
    // Simulate AI-powered scheduling confirmation
    Alert(`Demo Scheduled Successfully!
    Type: ${[‘Personal Health Coaching’, ‘Enterprise Solutions’, ‘Research & Development’][demoPreference]}
    Time: ${availableTimes[selectedTime].toLocaleString()}
    Name: ${userData.name}
    Email: ${userData.email}`);
  };

  Return (
    <div className=”min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden”>
      <div className=”container mx-auto px-4 py-16 max-w-3xl”>
        <div className=”bg-white rounded-xl shadow-xl p-8”>
          {/* Progress Indicators */}
          <div className=”flex justify-between mb-8”>
            {[
              { 
                Title: “Demo Type”, 
                Icon: <UserCheck className={`w-12 h-12 ${step >= 1 ? ‘text-blue-500’ : ‘text-gray-300’}`} />
              },
              { 
                Title: “Time Selection”, 
                Icon: <Calendar className={`w-12 h-12 ${step >= 2 ? ‘text-blue-500’ : ‘text-gray-300’}`} />
              },
              { 
                Title: “Contact Details”, 
                Icon: <Send className={`w-12 h-12 ${step === 3 ? ‘text-blue-500’ : ‘text-gray-300’}`} />
              }
            ].map((progressStep, index) => (
              <div 
                Key={index} 
                className=”flex flex-col items-center”
              >
                {progressStep.icon}
                <span className=”mt-2 text-sm font-medium”>{progressStep.title}</span>
              </div>
            ))}
          </div>

          {/* Dynamic Content */}
          {renderStep()}

          {/* Navigation */}
          <div className=”flex justify-between mt-8”>
            {step > 1 && (
              <Button 
                Variant=”outline” 
                onClick={handlePreviousStep}
              >
                Previous Step
              </Button>
            )}
            {step < 3 ? (
              <Button 
                className=”ml-auto flex items-center group”
                onClick={handleNextStep}
                disabled={
                  (step === 1 && demoPreference === null) || 
                  (step === 2 && selectedTime === null)
                }
              >
                Next Step
                <Sparkles className=”ml-2 group-hover:scale-110 transition-transform” />
              </Button>
            ) : (
              <Button 
                className=”ml-auto flex items-center group”
                onClick={handleSubmit}
                disabled={
                  !userData.name || 
                  !userData.email || 
                  !userData.phoneNumber
                }
              >
                Schedule Demo
                <Send className=”ml-2 group-hover:translate-x-1 transition-transform” />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Export default ScheduleDemoPage;

