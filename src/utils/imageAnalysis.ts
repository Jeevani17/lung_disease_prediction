import { LungCancerPredictionResult } from '../types';

// Simulated AI analysis function
export function analyzeLungCancer(imageFile: File): Promise<LungCancerPredictionResult> {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Simulate lung cancer detection outcomes
      const outcomes = [
        {
          hasCancer: false,
          confidence: 94,
          riskLevel: 'low' as const,
          findings: [
            'No suspicious nodules or masses detected',
            'Clear lung fields bilaterally',
            'Normal lung parenchyma pattern',
            'No signs of malignancy'
          ],
          recommendations: [
            'Continue routine screening as recommended',
            'Maintain healthy lifestyle',
            'Annual follow-up chest imaging'
          ],
          suspiciousAreas: 0
        },
        {
          hasCancer: true,
          confidence: 89,
          riskLevel: 'high' as const,
          findings: [
            'Suspicious mass in right upper lobe (3.2cm)',
            'Irregular borders and spiculated margins',
            'Possible hilar lymphadenopathy',
            'Features consistent with primary lung malignancy'
          ],
          recommendations: [
            'URGENT: Immediate oncology referral required',
            'CT chest with contrast recommended',
            'Tissue biopsy for definitive diagnosis',
            'Staging workup if malignancy confirmed'
          ],
          suspiciousAreas: 2
        },
        {
          hasCancer: true,
          confidence: 76,
          riskLevel: 'moderate' as const,
          findings: [
            'Small nodule in left lower lobe (1.8cm)',
            'Well-defined borders, possibly benign',
            'No obvious metastatic disease',
            'Requires further evaluation'
          ],
          recommendations: [
            'Pulmonology consultation recommended',
            'High-resolution CT scan needed',
            'Consider PET scan for characterization',
            'Follow-up in 3 months if benign features'
          ],
          suspiciousAreas: 1
        },
        {
          hasCancer: false,
          confidence: 82,
          riskLevel: 'low' as const,
          findings: [
            'Small calcified granuloma in right middle lobe',
            'Likely benign, consistent with old infection',
            'No active disease process',
            'Stable appearance compared to prior imaging'
          ],
          recommendations: [
            'Routine follow-up sufficient',
            'Annual screening chest X-ray',
            'No immediate intervention needed',
            'Monitor for any changes'
          ],
          suspiciousAreas: 0
        },
        {
          hasCancer: true,
          confidence: 91,
          riskLevel: 'very-high' as const,
          findings: [
            'Large mass in left upper lobe (5.1cm)',
            'Irregular, lobulated contours',
            'Mediastinal lymphadenopathy present',
            'Possible pleural involvement'
          ],
          recommendations: [
            'URGENT: Immediate oncology referral',
            'Staging CT chest/abdomen/pelvis',
            'Brain MRI for staging',
            'Multidisciplinary team evaluation'
          ],
          suspiciousAreas: 3
        }
      ];

      // Select outcome based on filename or randomly
      const fileName = imageFile.name.toLowerCase();
      let selectedOutcome;
      
      if (fileName.includes('normal') || fileName.includes('healthy') || fileName.includes('clear')) {
        selectedOutcome = outcomes[0];
      } else if (fileName.includes('cancer') || fileName.includes('malignant') || fileName.includes('tumor')) {
        selectedOutcome = outcomes[1];
      } else if (fileName.includes('nodule') || fileName.includes('mass')) {
        selectedOutcome = outcomes[2];
      } else if (fileName.includes('benign') || fileName.includes('granuloma')) {
        selectedOutcome = outcomes[3];
      } else if (fileName.includes('large') || fileName.includes('advanced')) {
        selectedOutcome = outcomes[4];
      } else {
        // Random selection for demo purposes
        selectedOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      }

      const result: LungCancerPredictionResult = {
        ...selectedOutcome,
        technicalDetails: {
          ...selectedOutcome,
          imageQuality: getImageQuality(imageFile.size),
          processingTime: Math.floor(Math.random() * 3000) + 1500, // 1.5-4.5 seconds
          modelVersion: 'LungCancerNet-v3.2.1',
          suspiciousAreas: selectedOutcome.suspiciousAreas
        }
      };

      resolve(result);
    }, 3000); // 3 second delay to simulate processing
  });
}

function getImageQuality(fileSize: number): 'excellent' | 'good' | 'fair' | 'poor' {
  if (fileSize > 2 * 1024 * 1024) return 'excellent'; // > 2MB
  if (fileSize > 1 * 1024 * 1024) return 'good';      // > 1MB
  if (fileSize > 500 * 1024) return 'fair';           // > 500KB
  return 'poor';                                       // <= 500KB
}

// Processing stages for loading indicator
export const processingStages = [
  'Preprocessing chest X-ray...',
  'Detecting lung regions...',
  'Scanning for abnormalities...',
  'Analyzing suspicious areas...',
  'Calculating cancer probability...',
  'Generating diagnostic report...'
];