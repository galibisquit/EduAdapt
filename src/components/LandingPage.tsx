import React from 'react';
import { Camera, Edit, GraduationCap, Brain, Users, Award } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onScanAnswer: () => void;
  onTypeAnswer: () => void;
}

export default function LandingPage({ onScanAnswer, onTypeAnswer }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="gradient-primary rounded-2xl p-4">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="gradient-primary bg-clip-text text-transparent">
              EduAdapt
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            AI for Inclusive Learning
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transform your learning experience with AI-powered analysis that understands your answers 
            and provides personalized recommendations to help you succeed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Button
            onClick={onScanAnswer}
            size="lg"
            className="gradient-primary hover:shadow-soft-lg transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
          >
            <Camera className="w-6 h-6 mr-3" />
            Scan Handwritten Answer
          </Button>
          
          <Button
            onClick={onTypeAnswer}
            variant="outline"
            size="lg"
            className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Edit className="w-6 h-6 mr-3" />
            Type Your Answer
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-soft-lg transition-all duration-300">
            <div className="gradient-secondary rounded-xl p-3 w-fit mx-auto mb-4">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Advanced AI analyzes your answers to understand your learning progress and identify areas for improvement.
            </p>
          </div>
          
          <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-soft-lg transition-all duration-300">
            <div className="bg-gradient-to-br from-success-400 to-success-600 rounded-xl p-3 w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personalized Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Get customized recommendations for videos, articles, and practice materials tailored to your needs.
            </p>
          </div>
          
          <div className="glass-effect rounded-2xl p-8 text-center hover:shadow-soft-lg transition-all duration-300">
            <div className="bg-gradient-to-br from-warning-400 to-warning-600 rounded-xl p-3 w-fit mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Track Progress</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your learning journey with detailed analytics and celebrate your achievements along the way.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-sm text-gray-600">Students Helped</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-secondary-600 mb-2">95%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-success-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Subjects Covered</div>
          </div>
          <div className="p-6">
            <div className="text-3xl md:text-4xl font-bold text-warning-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}