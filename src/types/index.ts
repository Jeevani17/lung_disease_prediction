export interface PatientData {
  age: number;
  gender: 'male' | 'female';
  smokingHistory: 'never' | 'former' | 'current';
  packYears: number;
  familyHistory: boolean;
  occupationalExposure: boolean;
  chronicCough: boolean;
  shortnessOfBreath: boolean;
  chestPain: boolean;
  weightLoss: boolean;
  fatigue: boolean;
  bloodInSputum: boolean;
}

export interface PredictionResult {
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  probability: number;
  riskFactors: string[];
  recommendations: string[];
  confidence: number;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: 'prevention' | 'lifestyle' | 'screening';
  icon: string;
}