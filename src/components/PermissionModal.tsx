import React from 'react';
import { Camera, Shield, Lock, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface PermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export default function PermissionModal({ isOpen, onAllow, onDeny }: PermissionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onDeny}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary-100 rounded-full w-fit">
            <Camera className="w-8 h-8 text-primary-600" />
          </div>
          <DialogTitle className="text-xl font-semibold">
            EduAdapt wants to use your camera
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            We need access to your camera to scan handwritten answers and convert them to text for analysis.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-6">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">Your privacy is protected</div>
              <div className="text-gray-600">Images are processed locally and not stored on our servers</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Lock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">Secure processing</div>
              <div className="text-gray-600">All analysis happens in your browser for maximum security</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={onDeny}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Don't Allow
          </Button>
          <Button 
            onClick={onAllow}
            className="flex-1 gradient-primary"
          >
            <Camera className="w-4 h-4 mr-2" />
            Allow Camera
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}