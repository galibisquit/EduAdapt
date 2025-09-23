export interface StudentData {
  answer: string;
  subject: string;
  capturedImage?: string;
  timestamp: Date;
}

export interface Analysis {
  understandingLevel: 'understands' | 'partial' | 'needs-remedial';
  confidence: number;
  explanation: string;
  keyPoints: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  type: 'pdf' | 'video' | 'quiz' | 'practice';
  title: string;
  description: string;
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
}

export interface StudentProgress {
  id: string;
  name: string;
  subject: string;
  understandingLevel: Analysis['understandingLevel'];
  confidence: number;
  timestamp: Date;
  answer: string;
}

export type PageType = 'landing' | 'camera' | 'input' | 'processing' | 'results' | 'teacher';