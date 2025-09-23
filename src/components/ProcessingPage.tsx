import React, { useEffect, useState } from 'react';
import { Brain, BookOpen, Target, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface ProcessingPageProps {
  studentName?: string;
  subject: string;
}

export default function ProcessingPage({ studentName, subject }: ProcessingPageProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: BookOpen,
      title: 'Reading Your Answer',
      description: 'Analyzing the content and structure of your response'
    },
    {
      icon: Brain,
      title: 'AI Understanding',
      description: 'Evaluating comprehension and identifying key concepts'
    },
    {
      icon: Target,
      title: 'Assessing Knowledge',
      description: 'Determining your understanding level and confidence'
    },
    {
      icon: TrendingUp,
      title: 'Generating Recommendations',
      description: 'Curating personalized learning materials for you'
    }
  ];

  useEffect(() => {
    const totalDuration = 3000; // 3 seconds
    const stepDuration = totalDuration / steps.length;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (totalDuration / 100));
        
        // Update current step based on progress
        const newStep = Math.min(
          Math.floor((newProgress / 100) * steps.length),
          steps.length - 1
        );
        setCurrentStep(newStep);
        
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 flex items-center justify-center">
      <div className="max-w-lg w-full">
        <div className="glass-effect rounded-2xl p-8 text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="animate-pulse-soft mx-auto mb-4 p-4 gradient-primary rounded-full w-fit">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Analyzing Your {subject} Answer
            </h1>
            {studentName && (
              <p className="text-gray-600">
                Working on it, {studentName}...
              </p>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-3 mb-4" />
            <p className="text-sm text-gray-600">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                    isActive 
                      ? 'bg-primary-50 border border-primary-200' 
                      : isCompleted
                        ? 'bg-success-50 border border-success-200'
                        : 'bg-gray-50 border border-gray-200 opacity-60'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'gradient-primary' 
                      : isCompleted
                        ? 'bg-gradient-to-br from-success-400 to-success-600'
                        : 'bg-gray-300'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isActive || isCompleted ? 'text-white' : 'text-gray-500'
                    }`} />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-medium ${
                      isActive || isCompleted ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      isActive || isCompleted ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fun Facts */}
          <div className="mt-8 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
            <p className="text-sm text-gray-600">
              💡 <strong>Did you know?</strong> Our AI processes over 1000+ factors to understand your learning style and provide the most relevant recommendations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}