Import React, { useState } from ‘react’;
Import { 
  Zap, 
  Shield, 
  HelpCircle, 
  Stethoscope, 
  Brain, 
  Target,
  ChevronDown,
  ChevronUp,
  Sparkles
} from ‘lucide-react’;
Import { motion } from ‘framer-motion’;
Import { Button } from ‘@/components/ui/button’;
Import { Card, CardContent, CardHeader, CardTitle } from ‘@/components/ui/card’;

Const LearnMorePage = () => {
  Const [activeSection, setActiveSection] = useState(null);
  Const [openFAQ, setOpenFAQ] = useState(null);

  Const sections = [
    {
      Icon: <Brain className=”w-12 h-12 text-purple-500” />,
      Title: “AI-Powered Insights”,
      Description: “Our advanced artificial intelligence analyzes your health data with unprecedented depth and precision.”,
      Details: [
        “Machine learning algorithms continuously improve recommendations”,
        “Comprehensive analysis of multiple health metrics”,
        “Personalized insights tailored to your unique health profile”
      ]
    },
    {
      Icon: <Stethoscope className=”w-12 h-12 text-blue-500” />,
      Title: “Comprehensive Health Monitoring”,
      Description: “Track and understand every aspect of your health journey with cutting-edge technology.”,
      Details: [
        “Real-time tracking of physical and mental health indicators”,
        “Predictive health risk assessment”,
        “Holistic approach combining multiple health data points”
      ]
    },
    {
      Icon: <Shield className=”w-12 h-12 text-green-500” />,
      Title: “Data Privacy & Security”,
      Description: “Your health information is protected with state-of-the-art security measures.”,
      Details: [
        “End-to-end encryption of personal health data”,
        “HIPAA-compliant data handling”,
        “Transparent data usage policies”
      ]
    }
  ];

  Const faqItems = [
    {
      Question: “How does the AI Health Coach work?”,
      Answer: “Our AI analyzes your health data from various sources, including wearable devices, medical records, and personal inputs. It then generates personalized recommendations for diet, exercise, mental health, and preventive care.”
    },
    {
      Question: “Is my personal health data safe?”,
      Answer: “Absolutely. We use bank-level encryption and follow strict HIPAA guidelines to ensure your data remains completely confidential and secure.”
    },
    {
      Question: “Can the AI replace my doctor?”,
      Answer: “No, our AI Health Coach is designed to complement professional medical care, providing insights and recommendations that you can discuss with your healthcare provider.”
    }
  ];

  Const animationVariants = {
    Hidden: { opacity: 0, y: 50 },
    Visible: { 
      Opacity: 1, 
      Y: 0,
      Transition: { 
        Duration: 0.6,
        Ease: “easeOut”
      }
    }
  };

  Return (
    <div className=”min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden”>
      {/* Hero Section */}
      <motion.div 
        Initial=”hidden”
        whileInView=”visible”
        variants={animationVariants}
        className=”container mx-auto px-4 py-16 text-center”
      >
        <h1 className=”text-5xl font-extrabold text-gray-900 mb-6 flex justify-center items-center”>
          Discover AI Health Coach 
          <Sparkles className=”ml-3 text-yellow-500 animate-pulse” />
        </h1>
        <p className=”text-xl text-gray-600 max-w-3xl mx-auto mb-12”>
          Revolutionizing personal health management through intelligent, personalized, and proactive AI-driven insights and recommendations.
        </p>
      </motion.div>

      {/* Core Features Section */}
      <section className=”container mx-auto px-4 py-16”>
        <div className=”grid md:grid-cols-3 gap-8”>
          {sections.map((section, index) => (
            <motion.div
              Key={index}
              Initial=”hidden”
              whileInView=”visible”
              variants={animationVariants}
            >
              <Card 
                className={`hover:shadow-xl transition-all duration-300 ${
                  activeSection === index 
                    ? ‘scale-105 border-blue-300 shadow-lg’ 
                    : ‘border-gray-200’
                }`}
                onMouseEnter={() => setActiveSection(index)}
                onMouseLeave={() => setActiveSection(null)}
              >
                <CardHeader>
                  <CardTitle className=”flex items-center”>
                    {section.icon}
                    <span className=”ml-3”>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className=”text-gray-600 mb-4”>{section.description}</p>
                  <ul className=”space-y-2 text-sm text-gray-500”>
                    {section.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className=”flex items-center”>
                        <Target className=”mr-2 w-4 h-4 text-blue-500” />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className=”container mx-auto px-4 py-16”>
        <motion.div
          Initial=”hidden”
          whileInView=”visible”
          variants={animationVariants}
        >
          <h2 className=”text-3xl font-bold text-center mb-12”>
            Frequently Asked Questions
          </h2>
          <div className=”max-w-2xl mx-auto space-y-4”>
            {faqItems.map((item, index) => (
              <div 
                Key={index} 
                className=”bg-white rounded-lg border border-gray-200 overflow-hidden”
              >
                <button 
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className=”w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors”
                >
                  <div className=”flex items-center”>
                    <HelpCircle className=”mr-3 text-blue-500” />
                    <span className=”font-semibold text-gray-800”>{item.question}</span>
                  </div>
                  {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === index && (
                  <div className=”p-4 bg-gray-50 text-gray-600”>
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className=”container mx-auto px-4 py-16 text-center”>
        <motion.div
          Initial=”hidden”
          whileInView=”visible”
          variants={animationVariants}
          className=”bg-white rounded-xl shadow-xl p-12”
        >
          <h2 className=”text-4xl font-bold text-gray-900 mb-6 flex justify-center items-center”>
            Ready to Transform Your Health? 
            <Zap className=”ml-3 text-yellow-500” />
          </h2>
          <p className=”text-xl text-gray-600 max-w-3xl mx-auto mb-8”>
            Take the first step towards a healthier, more informed you. Our AI Health Coach is here to guide your wellness journey.
          </p>
          <div className=”flex justify-center space-x-4”>
            <Button size=”lg” variant=”default”>
              Get Started
            </Button>
            <Button size=”lg” variant=”outline”>
              Schedule Demo
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

Export default LearnMorePage;

