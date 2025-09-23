import React from 'react';
import { ArrowLeft, RefreshCw, CheckCircle, AlertTriangle, XCircle, ExternalLink, Play, FileText, PenTool } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Analysis, StudentData } from '../types';

interface ResultPageProps {
  studentData: StudentData;
  analysis: Analysis;
  onBack: () => void;
  onTryAgain: () => void;
}

const getUnderstandingConfig = (level: Analysis['understandingLevel']) => {
  switch (level) {
    case 'understands':
      return {
        icon: CheckCircle,
        color: 'success',
        bgColor: 'bg-success-50',
        borderColor: 'border-success-200',
        textColor: 'text-success-700',
        title: 'Understands Well',
        description: 'Great job! You have a solid grasp of the concepts.'
      };
    case 'partial':
      return {
        icon: AlertTriangle,
        color: 'warning',
        bgColor: 'bg-warning-50',
        borderColor: 'border-warning-200',
        textColor: 'text-warning-700',
        title: 'Partial Understanding',
        description: 'Good start! Some additional practice will help strengthen your knowledge.'
      };
    case 'needs-remedial':
      return {
        icon: XCircle,
        color: 'error',
        bgColor: 'bg-error-50',
        borderColor: 'border-error-200',
        textColor: 'text-error-700',
        title: 'Needs Additional Support',
        description: 'No worries! Everyone learns at their own pace. Let\'s build up those fundamentals.'
      };
  }
};

const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'video': return Play;
    case 'pdf': return FileText;
    case 'quiz': return PenTool;
    default: return ExternalLink;
  }
};

export default function ResultPage({ studentData, analysis, onBack, onTryAgain }: ResultPageProps) {
  const config = getUnderstandingConfig(analysis.understandingLevel);
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Learning Analysis</h1>
          <Button variant="outline" onClick={onTryAgain}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Understanding Level Card */}
            <div className="glass-effect rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-xl ${config.bgColor} ${config.borderColor} border`}>
                  <Icon className={`w-8 h-8 ${config.textColor}`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                    {config.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{config.description}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Confidence Level</span>
                        <span className={`text-sm font-semibold ${config.textColor}`}>
                          {analysis.confidence}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 bg-gradient-to-r ${
                            analysis.understandingLevel === 'understands' 
                              ? 'from-success-400 to-success-600'
                              : analysis.understandingLevel === 'partial'
                                ? 'from-warning-400 to-warning-600'
                                : 'from-error-400 to-error-600'
                          }`}
                          style={{ width: `${analysis.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Analysis Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Detailed Analysis</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {analysis.explanation}
                </p>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Key Observations:</h4>
                  <ul className="space-y-1">
                    {analysis.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Original Answer */}
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your {studentData.subject} Answer
              </h3>
              
              {studentData.capturedImage && (
                <div className="mb-4">
                  <img 
                    src={studentData.capturedImage}
                    alt="Your handwritten answer"
                    className="w-40 h-40 object-cover rounded-xl shadow-soft float-right ml-4 mb-4"
                  />
                </div>
              )}
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {studentData.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <div className="space-y-6">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                📚 Recommended for You
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Based on your answer, here are some resources to help you learn:
              </p>
              
              <div className="space-y-3">
                {analysis.recommendations.map((rec, index) => {
                  const RecommendationIcon = getRecommendationIcon(rec.type);
                  
                  return (
                    <div 
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-soft transition-all duration-200 cursor-pointer hover:border-primary-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          rec.type === 'video' ? 'bg-red-100' :
                          rec.type === 'pdf' ? 'bg-blue-100' :
                          rec.type === 'quiz' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          <RecommendationIcon className={`w-4 h-4 ${
                            rec.type === 'video' ? 'text-red-600' :
                            rec.type === 'pdf' ? 'text-blue-600' :
                            rec.type === 'quiz' ? 'text-green-600' : 'text-purple-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 mb-1 leading-tight">
                            {rec.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                            {rec.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span className={`px-2 py-1 rounded-full ${
                                rec.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                rec.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {rec.difficulty}
                              </span>
                              <span>•</span>
                              <span>{rec.estimatedTime}</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                🎯 Next Steps
              </h3>
              
              <div className="space-y-3">
                <Button className="w-full gradient-primary justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Start Learning Path
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <PenTool className="w-4 h-4 mr-2" />
                  Practice Similar Questions
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={onTryAgain}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Another Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}