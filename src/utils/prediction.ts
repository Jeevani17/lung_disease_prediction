import { PatientData, PredictionResult } from '../types';

export function predictLungDisease(data: PatientData): PredictionResult {
  let riskScore = 0;
  const riskFactors: string[] = [];
  const recommendations: string[] = [];

  // Age factor (0-30 points)
  if (data.age >= 65) {
    riskScore += 30;
    riskFactors.push('Advanced age (65+ years) increases lung disease risk');
  } else if (data.age >= 50) {
    riskScore += 20;
    riskFactors.push('Age over 50 is a moderate risk factor');
  } else if (data.age >= 40) {
    riskScore += 10;
  }

  // Smoking history (0-40 points)
  if (data.smokingHistory === 'current') {
    riskScore += 40;
    riskFactors.push('Current smoking significantly increases lung disease risk');
    recommendations.push('Quit smoking immediately - seek professional help if needed');
  } else if (data.smokingHistory === 'former') {
    riskScore += 20;
    riskFactors.push('Former smoking history contributes to elevated risk');
    recommendations.push('Continue to avoid smoking and maintain smoke-free environment');
  }

  // Pack years (0-25 points)
  if (data.packYears > 30) {
    riskScore += 25;
    riskFactors.push(`Heavy smoking history (${data.packYears} pack-years)`);
  } else if (data.packYears > 20) {
    riskScore += 20;
    riskFactors.push(`Significant smoking history (${data.packYears} pack-years)`);
  } else if (data.packYears > 10) {
    riskScore += 15;
    riskFactors.push(`Moderate smoking history (${data.packYears} pack-years)`);
  } else if (data.packYears > 0) {
    riskScore += 10;
  }

  // Family history (0-15 points)
  if (data.familyHistory) {
    riskScore += 15;
    riskFactors.push('Family history of lung disease increases genetic predisposition');
    recommendations.push('Discuss family history with your doctor for personalized screening');
  }

  // Occupational exposure (0-15 points)
  if (data.occupationalExposure) {
    riskScore += 15;
    riskFactors.push('Occupational exposure to harmful substances');
    recommendations.push('Use proper protective equipment and follow safety protocols at work');
  }

  // Symptoms scoring
  const symptoms = [
    { key: 'chronicCough', points: 10, description: 'Chronic cough' },
    { key: 'shortnessOfBreath', points: 15, description: 'Shortness of breath' },
    { key: 'chestPain', points: 12, description: 'Chest pain' },
    { key: 'weightLoss', points: 18, description: 'Unexplained weight loss' },
    { key: 'fatigue', points: 8, description: 'Persistent fatigue' },
    { key: 'bloodInSputum', points: 25, description: 'Blood in sputum' },
  ];

  symptoms.forEach(symptom => {
    if (data[symptom.key as keyof PatientData]) {
      riskScore += symptom.points;
      riskFactors.push(`Presence of ${symptom.description}`);
    }
  });

  // Gender factor (slight adjustment)
  if (data.gender === 'male') {
    riskScore += 5;
  }

  // Calculate probability (0-100%)
  const probability = Math.min(Math.round((riskScore / 200) * 100), 100);

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  if (probability < 25) {
    riskLevel = 'low';
  } else if (probability < 50) {
    riskLevel = 'moderate';
  } else if (probability < 75) {
    riskLevel = 'high';
  } else {
    riskLevel = 'very-high';
  }

  // Add general recommendations
  recommendations.push('Maintain regular exercise and healthy diet');
  recommendations.push('Avoid exposure to air pollution and secondhand smoke');
  recommendations.push('Get regular health check-ups and lung function tests');

  if (riskLevel === 'moderate' || riskLevel === 'high' || riskLevel === 'very-high') {
    recommendations.push('Schedule an appointment with a pulmonologist');
    recommendations.push('Consider lung cancer screening if eligible');
  }

  if (riskLevel === 'high' || riskLevel === 'very-high') {
    recommendations.push('Seek immediate medical evaluation');
    recommendations.push('Discuss symptoms with healthcare provider urgently');
  }

  // Calculate confidence based on number of data points
  const dataPoints = Object.values(data).filter(value => 
    typeof value === 'boolean' ? value : value !== 0 && value !== 'never'
  ).length;
  
  const confidence = Math.min(Math.round((dataPoints / 12) * 100), 95);

  return {
    riskLevel,
    probability,
    riskFactors,
    recommendations: [...new Set(recommendations)], // Remove duplicates
    confidence,
  };
}