import React, { useState, useRef, useEffect } from 'react';
import { Camera, ArrowLeft, Upload, RotateCcw, Check } from 'lucide-react';
import { Button } from './ui/button';
import { StudentData } from '../types';
import { simulateOCRExtraction } from '../utils/mockData';
import PermissionModal from './PermissionModal';

interface CameraCaptureProps {
  onBack: () => void;
  onCapture: (data: StudentData) => void;
}

type CameraState = 'permission' | 'denied' | 'stream' | 'captured' | 'processing' | 'error';

export default function CameraCapture({ onBack, onCapture }: CameraCaptureProps) {
  const [cameraState, setCameraState] = useState<CameraState>('permission');
  const [capturedImage, setCapturedImage] = useState<string>('');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePermissionAllow = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraState('stream');
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraState('denied');
    }
  };

  const handlePermissionDeny = () => {
    setCameraState('denied');
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      setCameraState('captured');
      
      // Stop the stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  const retakePhoto = async () => {
    setCapturedImage('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraState('stream');
    } catch (error) {
      setCameraState('error');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        setCameraState('captured');
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    setCameraState('processing');
    
    // Simulate OCR processing
    setTimeout(() => {
      const extractedText = simulateOCRExtraction(capturedImage);
      
      const studentData: StudentData = {
        answer: extractedText,
        subject: '', // Will be selected in the next step
        capturedImage,
        timestamp: new Date()
      };
      
      onCapture(studentData);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      // Cleanup stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const renderContent = () => {
    switch (cameraState) {
      case 'permission':
        return (
          <PermissionModal 
            isOpen={true}
            onAllow={handlePermissionAllow}
            onDeny={handlePermissionDeny}
          />
        );
        
      case 'denied':
        return (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 p-4 bg-error-100 rounded-full w-fit">
              <Camera className="w-12 h-12 text-error-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Camera Access Needed</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We need camera access to scan your handwritten answers. You can also upload an image file instead.
            </p>
            <div className="space-y-4">
              <Button onClick={handlePermissionAllow} className="gradient-primary">
                <Camera className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <div className="text-sm text-gray-500">or</div>
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image File
              </Button>
            </div>
          </div>
        );
        
      case 'stream':
        return (
          <div className="relative">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              className="w-full max-w-md mx-auto rounded-xl shadow-soft"
            />
            <div className="mt-6 text-center">
              <p className="text-gray-600 mb-4">Position your handwritten answer in the frame</p>
              <Button onClick={capturePhoto} size="lg" className="gradient-primary">
                <Camera className="w-5 h-5 mr-2" />
                Capture Answer
              </Button>
            </div>
          </div>
        );
        
      case 'captured':
        return (
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <img 
                src={capturedImage} 
                alt="Captured answer"
                className="max-w-md w-full rounded-xl shadow-soft"
              />
              <div className="absolute -top-2 -right-2 bg-success-500 rounded-full p-2">
                <Check className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Perfect! Answer Captured</h3>
            <p className="text-gray-600 mb-6">
              We'll now extract the text from your handwritten answer using AI
            </p>
            <div className="space-x-4">
              <Button 
                variant="outline" 
                onClick={retakePhoto}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              <Button 
                onClick={processImage}
                className="gradient-primary"
              >
                <Check className="w-4 h-4 mr-2" />
                Process Answer
              </Button>
            </div>
          </div>
        );
        
      case 'processing':
        return (
          <div className="text-center py-16">
            <div className="animate-pulse-soft mx-auto mb-6 p-4 gradient-primary rounded-full w-fit">
              <Camera className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Extracting Text...</h2>
            <p className="text-gray-600">Our AI is reading your handwritten answer</p>
            <div className="mt-6 max-w-xs mx-auto bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        );
        
      case 'error':
        return (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 p-4 bg-error-100 rounded-full w-fit">
              <Camera className="w-12 h-12 text-error-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Camera Error</h2>
            <p className="text-gray-600 mb-8">
              There was an issue accessing your camera. Please try again or upload an image file.
            </p>
            <div className="space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCameraState('permission')}
              >
                Try Again
              </Button>
              <Button 
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="text-gray-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Scan Answer</h1>
          <div></div>
        </div>

        {/* Content */}
        <div className="glass-effect rounded-2xl p-8">
          {renderContent()}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}