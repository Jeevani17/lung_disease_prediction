export interface LungCancerPredictionResult {
  hasCancer: boolean;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  findings: string[];
  recommendations: string[];
  technicalDetails: {
    imageQuality: 'excellent' | 'good' | 'fair' | 'poor';
    processingTime: number;
    modelVersion: string;
    suspiciousAreas: number;
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