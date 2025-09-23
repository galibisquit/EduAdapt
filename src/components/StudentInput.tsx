import React, { useState } from 'react';
import { ArrowLeft, Send, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { StudentData } from '../types';

interface StudentInputProps {
  onBack: () => void;
  onSubmit: (data: StudentData) => void;
  initialData?: Partial<StudentData>;
}

const subjects = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'Social Studies'
];

export default function StudentInput({ onBack, onSubmit, initialData }: StudentInputProps) {
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!answer.trim() || !subject) return;
    
    setIsSubmitting(true);
    
    const studentData: StudentData = {
      answer: answer.trim(),
      subject,
      capturedImage: initialData?.capturedImage,
      timestamp: new Date()
    };
    
    // Simulate processing delay
    setTimeout(() => {
      onSubmit(studentData);
    }, 1000);
  };

  const isValid = answer.trim().length > 10 && subject;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-gray-600" disabled={isSubmitting}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">
            {initialData?.capturedImage ? 'Review Your Answer' : 'Type Your Answer'}
          </h1>
          <div></div>
        </div>

        <div className="glass-effect rounded-2xl p-8">
          {initialData?.capturedImage && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Extracted from your image:</h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <img 
                  src={initialData.capturedImage} 
                  alt="Captured answer"
                  className="w-32 h-32 object-cover rounded-lg float-right ml-4 mb-4"
                />
                <p className="text-gray-700 leading-relaxed">{answer}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                You can edit the text above if our AI made any mistakes in reading your handwriting.
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <Select value={subject} onValueChange={setSubject} disabled={isSubmitting}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subject..." />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {subj}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Answer Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer *
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your detailed answer here..."
                disabled={isSubmitting}
                className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Minimum 10 characters ({answer.length}/10)
                </p>
                {answer.length >= 10 && (
                  <p className="text-sm text-success-600">✓ Good length for analysis</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              size="lg"
              className="w-full gradient-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Analyze My Answer
                </>
              )}
            </Button>

            {!isValid && answer.length > 0 && (
              <p className="text-sm text-error-600 text-center">
                {!subject && "Please select a subject. "}
                {answer.length <= 10 && "Please write a more detailed answer (at least 10 characters)."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}