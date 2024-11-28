import React, { useState } from 'react';
import { Brain, Heart, Activity, User, Lock, Mail, Scale, Ruler, Pulse, Coffee } from 'lucide-react';

const Card = ({ className, children }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);

const Input = ({ className, ...props }) => (
  <input
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
    {...props}
  />
);

const Select = ({ children, value, onChange, className }) => (
  <select
    value={value}
    onChange={onChange}
    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white ${className}`}
  >
    {children}
  </select>
);

const Button = ({ variant = 'default', className, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-lg transition-colors";
  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
    link: "text-blue-600 hover:text-blue-800 bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Label = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    healthCondition: '',
    lifestyleHabit: ''
  });

  const healthConditions = [
    "None",
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Other"
  ];

  const lifestyleHabits = [
    "Sedentary",
    "Moderately Active",
    "Active",
    "Very Active"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl grid md:grid-cols-5">
        {/* Left Panel */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-l-lg text-white">
          <div className="flex items-center gap-2 mb-8">
            <Brain className="w-8 h-8" />
            <h1 className="text-2xl font-bold">HealthAI Coach</h1>
          </div>
          <p className="text-lg mb-6">Your personal AI-powered health journey begins here.</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-300" />
              <p>Personalized health recommendations</p>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-green-300" />
              <p>AI-driven workout planning</p>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-purple-300" />
              <p>Smart nutrition guidance</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:col-span-3 p-8 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-600">{isLogin ? 'Access your AI health coach' : 'Start your journey'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isLogin ? (
              <>
                <div className="space-y-2">
                  <Label>Username/Email address</Label>
                  <Input
                    name="username"
                    placeholder="Username/Email address"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Username/Email address</Label>
                  <Input
                    name="username"
                    placeholder="Username/Email address"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Create Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Create Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input
                      name="weight"
                      type="number"
                      placeholder="Weight in kg"
                      value={formData.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Height (cm)</Label>
                  <Input
                    name="height"
                    type="number"
                    placeholder="Height in cm"
                    value={formData.height}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Health Condition</Label>
                  <Select
                    name="healthCondition"
                    value={formData.healthCondition}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Health Condition</option>
                    {healthConditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Lifestyle Habit</Label>
                  <Select
                    name="lifestyleHabit"
                    value={formData.lifestyleHabit}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Lifestyle Habit</option>
                    {lifestyleHabits.map(habit => (
                      <option key={habit} value={habit}>{habit}</option>
                    ))}
                  </Select>
                </div>
              </>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <Button variant="link">
                  Forgot password?
                </Button>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
