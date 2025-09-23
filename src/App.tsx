import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Button } from './components/ui/button';
import LandingPage from './components/LandingPage';
import CameraCapture from './components/CameraCapture';
import StudentInput from './components/StudentInput';
import ProcessingPage from './components/ProcessingPage';
import ResultPage from './components/ResultPage';
import TeacherDashboard from './components/TeacherDashboard';
import { PageType, StudentData, Analysis } from './types';
import { generateMockAnalysis } from './utils/mockData';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleScanAnswer = () => {
    setCurrentPage('camera');
  };

  const handleTypeAnswer = () => {
    setCurrentPage('input');
  };

  const handleCameraCapture = (data: StudentData) => {
    setStudentData(data);
    setCurrentPage('input');
  };

  const handleStudentInput = (data: StudentData) => {
    setStudentData(data);
    setCurrentPage('processing');
    
    // Simulate AI processing
    setTimeout(() => {
      const generatedAnalysis = generateMockAnalysis(data.answer, data.subject);
      setAnalysis(generatedAnalysis);
      setCurrentPage('results');
    }, 3000);
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setStudentData(null);
    setAnalysis(null);
  };

  const handleBackToEdit = () => {
    if (studentData?.capturedImage) {
      setCurrentPage('input');
    } else {
      setCurrentPage('input');
    }
  };

  const handleTryAgain = () => {
    setCurrentPage('landing');
    setStudentData(null);
    setAnalysis(null);
  };

  const handleTeacherView = () => {
    setCurrentPage('teacher');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onScanAnswer={handleScanAnswer}
            onTypeAnswer={handleTypeAnswer}
          />
        );
      
      case 'camera':
        return (
          <CameraCapture 
            onBack={handleBackToLanding}
            onCapture={handleCameraCapture}
          />
        );
      
      case 'input':
        return (
          <StudentInput 
            onBack={studentData?.capturedImage ? () => setCurrentPage('camera') : handleBackToLanding}
            onSubmit={handleStudentInput}
            initialData={studentData || undefined}
          />
        );
      
      case 'processing':
        return (
          <ProcessingPage 
            subject={studentData?.subject || ''}
          />
        );
      
      case 'results':
        return studentData && analysis ? (
          <ResultPage 
            studentData={studentData}
            analysis={analysis}
            onBack={handleBackToEdit}
            onTryAgain={handleTryAgain}
          />
        ) : null;
      
      case 'teacher':
        return (
          <TeacherDashboard 
            onBack={handleBackToLanding}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fixed Teacher View Button */}
      {currentPage !== 'teacher' && (
        <Button
          onClick={handleTeacherView}
          className="fixed top-4 right-4 z-50 gradient-secondary shadow-soft-lg"
          size="sm"
        >
          <Users className="w-4 h-4 mr-2" />
          Teacher View
        </Button>
      )}
      
      {renderCurrentPage()}
    </div>
  );
}

export default App;