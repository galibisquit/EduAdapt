import { Analysis, Recommendation, StudentProgress } from '../types';

const recommendations: Record<string, Recommendation[]> = {
  math: [
    {
      type: 'pdf',
      title: 'Algebra Fundamentals Guide',
      description: 'Comprehensive guide covering basic algebraic concepts and operations',
      url: '#',
      difficulty: 'beginner',
      estimatedTime: '15 min'
    },
    {
      type: 'video',
      title: 'Khan Academy: Linear Equations',
      description: 'Step-by-step video tutorial on solving linear equations',
      url: '#',
      difficulty: 'beginner',
      estimatedTime: '12 min'
    },
    {
      type: 'quiz',
      title: 'Practice Quiz: Basic Algebra',
      description: 'Interactive quiz to test your understanding',
      url: '#',
      difficulty: 'beginner',
      estimatedTime: '10 min'
    }
  ],
  science: [
    {
      type: 'pdf',
      title: 'Cell Structure and Function',
      description: 'Detailed overview of cellular components and their roles',
      url: '#',
      difficulty: 'intermediate',
      estimatedTime: '20 min'
    },
    {
      type: 'video',
      title: 'Photosynthesis Explained',
      description: 'Visual explanation of the photosynthesis process',
      url: '#',
      difficulty: 'intermediate',
      estimatedTime: '15 min'
    }
  ],
  english: [
    {
      type: 'pdf',
      title: 'Essay Writing Techniques',
      description: 'Guide to structuring and writing effective essays',
      url: '#',
      difficulty: 'intermediate',
      estimatedTime: '25 min'
    },
    {
      type: 'practice',
      title: 'Grammar Practice Exercises',
      description: 'Interactive exercises for improving grammar skills',
      url: '#',
      difficulty: 'beginner',
      estimatedTime: '18 min'
    }
  ]
};

export function generateMockAnalysis(answer: string, subject: string): Analysis {
  const wordCount = answer.split(' ').length;
  const hasKeywords = /important|because|therefore|however|analyze|explain|describe/i.test(answer);
  const isDetailed = answer.length > 100;
  
  let confidence: number;
  let understandingLevel: Analysis['understandingLevel'];
  let explanation: string;
  
  if (wordCount > 50 && hasKeywords && isDetailed) {
    confidence = Math.floor(Math.random() * 20 + 80); // 80-100%
    understandingLevel = 'understands';
    explanation = 'The answer demonstrates a strong understanding of the core concepts with detailed explanations and proper use of subject-specific terminology.';
  } else if (wordCount > 20 && (hasKeywords || isDetailed)) {
    confidence = Math.floor(Math.random() * 30 + 50); // 50-79%
    understandingLevel = 'partial';
    explanation = 'The answer shows partial understanding but lacks depth in explanation or misses some key concepts that would demonstrate full comprehension.';
  } else {
    confidence = Math.floor(Math.random() * 30 + 20); // 20-49%
    understandingLevel = 'needs-remedial';
    explanation = 'The answer indicates limited understanding of the topic. Additional study and practice with fundamental concepts would be beneficial.';
  }
  
  const keyPoints = [
    'Student demonstrates engagement with the material',
    understandingLevel === 'understands' ? 'Strong grasp of core concepts' : 'Room for improvement in conceptual understanding',
    understandingLevel !== 'needs-remedial' ? 'Good use of relevant terminology' : 'Would benefit from vocabulary building'
  ];
  
  return {
    understandingLevel,
    confidence,
    explanation,
    keyPoints,
    recommendations: recommendations[subject.toLowerCase()] || recommendations.math
  };
}

export const mockStudentProgress: StudentProgress[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    subject: 'Mathematics',
    understandingLevel: 'understands',
    confidence: 87,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    answer: 'To solve this quadratic equation, I first identify the coefficients...'
  },
  {
    id: '2',
    name: 'Alex Chen',
    subject: 'Science',
    understandingLevel: 'partial',
    confidence: 62,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    answer: 'Photosynthesis is when plants make food from sunlight...'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    subject: 'English',
    understandingLevel: 'understands',
    confidence: 94,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    answer: 'The author uses symbolism throughout the novel to represent...'
  },
  {
    id: '4',
    name: 'Michael Brown',
    subject: 'History',
    understandingLevel: 'needs-remedial',
    confidence: 34,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    answer: 'The war happened because countries fought.'
  },
  {
    id: '5',
    name: 'Lisa Garcia',
    subject: 'Mathematics',
    understandingLevel: 'partial',
    confidence: 71,
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000), // 10 hours ago
    answer: 'I think the answer is 42 but I\'m not sure about the steps...'
  }
];

export function simulateOCRExtraction(imageData: string): string {
  // Simulate OCR extraction with various possible text outputs
  const mockTexts = [
    "The process of photosynthesis involves the conversion of light energy into chemical energy. Plants use chlorophyll to capture sunlight and combine carbon dioxide from the air with water from the roots to produce glucose and oxygen.",
    "To solve this equation: 2x + 5 = 15, I need to isolate x. First, I subtract 5 from both sides to get 2x = 10. Then I divide both sides by 2 to find x = 5.",
    "Shakespeare's use of dramatic irony in Romeo and Juliet creates tension because the audience knows information that the characters do not. This technique enhances the tragic impact of the story.",
    "The causes of World War I included militarism, alliances, imperialism, and nationalism. The assassination of Archduke Franz Ferdinand was the immediate trigger that started the conflict."
  ];
  
  return mockTexts[Math.floor(Math.random() * mockTexts.length)];
}