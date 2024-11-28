import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/card';
  {/* Corrected import path */}
  import { Button } from '../components/ui/button';  {/* Corrected import path */}
  import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
  } from '../components/ui/dialog';  {/* Corrected import path */}
  import { Input } from '../components/ui/input';  {/* Corrected import path */}
  import { Label } from '../components/ui/label';  {/* Corrected import path */}
  
  import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  UserCheck, 
  ClipboardCheck, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Upload 
} from 'lucide-react';
import { motion } from 'framer-motion';

const GetStartedPage = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    healthGoals: '',
    medicalHistory: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const progressSteps = [
    {
      icon: <UserCheck className="w-12 h-12 text-blue-500" />,
      title: "Personal Profile",
      description: "Create your personalized health profile"
    },
    {
      icon: <ClipboardCheck className="w-12 h-12 text-green-500" />,
      title: "Health Assessment",
      description: "Complete a comprehensive health questionnaire"
    },
    {
      icon: <Upload className="w-12 h-12 text-purple-500" />,
      title: "Data Integration",
      description: "Connect health tracking devices and records"
    }
  ];

  const handleNextStep = () => {
    if (step < progressSteps.length) {
      setStep(prev => prev + 1);
    } else {
      setIsDialogOpen(true);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              Create Your Profile 
              <Sparkles className="ml-3 text-yellow-500 animate-pulse" />
            </h2>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input 
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label>Age</Label>
                <Input 
                  name="age"
                  type="number"
                  value={userData.age}
                  onChange={handleInputChange}
                  placeholder="Enter your age"
                />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Health Goals & History
            </h2>
            <div className="space-y-4">
              <div>
                <Label>What are your primary health goals?</Label>
                <Input 
                  name="healthGoals"
                  value={userData.healthGoals}
                  onChange={handleInputChange}
                  placeholder="e.g., Weight loss, Muscle gain, Stress reduction"
                />
              </div>
              <div>
                <Label>Relevant Medical History</Label>
                <Input 
                  name="medicalHistory"
                  value={userData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="Brief overview of any medical conditions"
                />
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Connect Your Health Data
            </h2>
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-3 text-red-500" />
                    Fitness Trackers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Connect devices like Fitbit, Apple Health, or Garmin</p>
                  <Button variant="outline" className="mt-4">
                    Connect Devices
                  </Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardCheck className="mr-3 text-green-500" />
                    Medical Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Upload or link your medical records securely</p>
                  <Button variant="outline" className="mt-4">
                    Upload Records
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Progress Indicators */}
          <div className="flex justify-between mb-8">
            {progressSteps.map((progressStep, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center ${
                  step > index ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {progressStep.icon}
                <span className="mt-2 text-sm font-medium">{progressStep.title}</span>
                {step > index && (
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                )}
              </div>
            ))}
          </div>

          {/* Dynamic Content */}
          {renderStepContent()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(prev => prev - 1)}
              >
                Previous Step
              </Button>
            )}
            <Button 
              className="ml-auto flex items-center group"
              onClick={handleNextStep}
            >
              {step < progressSteps.length ? 'Next Step' : 'Complete Setup'}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Completion Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              Welcome to AI Health Coach! 
              <Sparkles className="ml-3 text-yellow-500 animate-pulse" />
            </DialogTitle>
            <DialogDescription>
              Your personalized health journey begins now. Our AI Health Coach will guide you every step of the way!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetStartedPage;
