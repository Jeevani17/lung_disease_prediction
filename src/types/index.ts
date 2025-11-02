export interface ImagePredictionResult {
  riskLevel: 'normal' | 'pneumonia' | 'tuberculosis' | 'lung-cancer' | 'covid-19' | 'other-abnormality';
  confidence: number;
  findings: string[];
  recommendations: string[];
  technicalDetails: {
    imageQuality: 'excellent' | 'good' | 'fair' | 'poor';
    processingTime: number;
    modelVersion: string;
  };
}

export interface ImageAnalysis {
  fileName: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
  uploadTime: Date;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: 'prevention' | 'lifestyle' | 'screening';
  icon: string;
}