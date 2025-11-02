import { ImagePredictionResult } from '../types';

// Simulated AI analysis function
export function analyzeChestXray(imageFile: File): Promise<ImagePredictionResult> {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      // Simulate different outcomes based on file name or random selection
      const outcomes = [
        {
          riskLevel: 'normal' as const,
          confidence: 92,
          findings: [
            'Clear lung fields with no acute abnormalities',
            'Normal heart size and mediastinal contours',
            'No pleural effusion or pneumothorax detected'
          ],
          recommendations: [
            'Continue regular health maintenance',
            'Annual chest X-ray screening as recommended by physician',
            'Maintain healthy lifestyle habits'
          ]
        },
        {
          riskLevel: 'pneumonia' as const,
          confidence: 87,
          findings: [
            'Consolidation in right lower lobe consistent with pneumonia',
            'Increased opacity in affected area',
            'No signs of pleural effusion'
          ],
          recommendations: [
            'Immediate medical consultation required',
            'Antibiotic treatment may be necessary',
            'Follow-up chest X-ray in 2-3 weeks',
            'Monitor symptoms closely'
          ]
        },
        {
          riskLevel: 'covid-19' as const,
          confidence: 78,
          findings: [
            'Bilateral ground-glass opacities',
            'Peripheral distribution pattern',
            'Findings consistent with viral pneumonia'
          ],
          recommendations: [
            'COVID-19 testing recommended',
            'Isolation precautions advised',
            'Monitor oxygen saturation',
            'Seek medical attention if symptoms worsen'
          ]
        },
        {
          riskLevel: 'tuberculosis' as const,
          confidence: 85,
          findings: [
            'Upper lobe infiltrates with cavitation',
            'Hilar lymphadenopathy present',
            'Pattern suggestive of pulmonary tuberculosis'
          ],
          recommendations: [
            'Urgent referral to infectious disease specialist',
            'Sputum culture and TB testing required',
            'Contact tracing may be necessary',
            'Isolation precautions until ruled out'
          ]
        },
        {
          riskLevel: 'other-abnormality' as const,
          confidence: 73,
          findings: [
            'Nodular opacity in left upper lobe',
            'Size approximately 2.5cm',
            'Further evaluation needed to characterize'
          ],
          recommendations: [
            'CT scan of chest recommended',
            'Pulmonology consultation advised',
            'Compare with previous imaging if available',
            'Follow-up in 3-6 months if benign'
          ]
        }
      ];

      // Select outcome based on filename or randomly
      const fileName = imageFile.name.toLowerCase();
      let selectedOutcome;
      
      if (fileName.includes('normal') || fileName.includes('healthy')) {
        selectedOutcome = outcomes[0];
      } else if (fileName.includes('pneumonia')) {
        selectedOutcome = outcomes[1];
      } else if (fileName.includes('covid') || fileName.includes('corona')) {
        selectedOutcome = outcomes[2];
      } else if (fileName.includes('tb') || fileName.includes('tuberculosis')) {
        selectedOutcome = outcomes[3];
      } else {
        // Random selection for demo purposes
        selectedOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      }

      const result: ImagePredictionResult = {
        ...selectedOutcome,
        technicalDetails: {
          imageQuality: getImageQuality(imageFile.size),
          processingTime: Math.floor(Math.random() * 3000) + 1500, // 1.5-4.5 seconds
          modelVersion: 'ChestXNet-v2.1.0'
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
  'Preprocessing image...',
  'Extracting features...',
  'Running AI models...',
  'Analyzing patterns...',
  'Generating report...'
];