import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Clock, Zap, Eye, Lightbulb, Shield } from 'lucide-react';
import { ImagePredictionResult } from '../types';

interface ImageResultDisplayProps {
  result: ImagePredictionResult | null;
  isLoading: boolean;
  processingStage?: string;
}

const ImageResultDisplay: React.FC<ImageResultDisplayProps> = ({ result, isLoading, processingStage }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Analyzing chest X-ray...</p>
            <p className="text-sm text-gray-500 mt-2">
              {processingStage || 'Processing image with AI models'}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>Image preprocessing</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>AI analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Report generation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Eye className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">Ready for Analysis</p>
            <p className="text-sm text-gray-500 mt-2">
              Upload a chest X-ray image to get AI-powered diagnostic insights
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'pneumonia': return 'text-orange-600 bg-orange-100';
      case 'tuberculosis': return 'text-red-600 bg-red-100';
      case 'lung-cancer': return 'text-red-600 bg-red-100';
      case 'covid-19': return 'text-purple-600 bg-purple-100';
      case 'other-abnormality': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'normal': return <CheckCircle className="h-6 w-6" />;
      case 'pneumonia': return <AlertTriangle className="h-6 w-6" />;
      case 'tuberculosis': return <XCircle className="h-6 w-6" />;
      case 'lung-cancer': return <XCircle className="h-6 w-6" />;
      case 'covid-19': return <AlertCircle className="h-6 w-6" />;
      case 'other-abnormality': return <AlertCircle className="h-6 w-6" />;
      default: return <AlertCircle className="h-6 w-6" />;
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'normal': return 'No significant abnormalities detected in the chest X-ray.';
      case 'pneumonia': return 'Possible pneumonia detected. Immediate medical consultation recommended.';
      case 'tuberculosis': return 'Possible tuberculosis detected. Urgent medical evaluation required.';
      case 'lung-cancer': return 'Suspicious findings that may indicate lung cancer. Immediate specialist consultation required.';
      case 'covid-19': return 'Findings consistent with COVID-19 pneumonia. Medical evaluation recommended.';
      case 'other-abnormality': return 'Other abnormalities detected. Further medical evaluation recommended.';
      default: return 'Analysis completed.';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Eye className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">AI Analysis Results</h2>
      </div>

      {/* Diagnosis */}
      <div className="mb-6">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getRiskColor(result.riskLevel)}`}>
          {getRiskIcon(result.riskLevel)}
          <span className="font-semibold capitalize">{result.riskLevel.replace('-', ' ')}</span>
        </div>
        <p className="text-gray-600 mt-2">{getRiskDescription(result.riskLevel)}</p>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">AI Confidence</span>
          <span className="text-sm font-semibold text-gray-900">{result.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              result.confidence >= 90 ? 'bg-green-500' :
              result.confidence >= 75 ? 'bg-blue-500' :
              result.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {result.confidence >= 90 ? 'Very High Confidence' :
           result.confidence >= 75 ? 'High Confidence' :
           result.confidence >= 60 ? 'Moderate Confidence' : 'Low Confidence'}
        </p>
      </div>

      {/* Technical Details */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Technical Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Image Quality:</span>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${getQualityColor(result.technicalDetails.imageQuality)}`}>
              {result.technicalDetails.imageQuality}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Processing Time:</span>
            <span className="font-medium ml-2">{result.technicalDetails.processingTime}ms</span>
          </div>
          <div>
            <span className="text-gray-600">Model Version:</span>
            <span className="font-medium ml-2">{result.technicalDetails.modelVersion}</span>
          </div>
        </div>
      </div>

      {/* Findings */}
      {result.findings.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Key Findings</h3>
          </div>
          <ul className="space-y-2">
            {result.findings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold text-gray-900">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Medical Disclaimer */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-red-900 mb-1">Medical Disclaimer</h4>
            <p className="text-xs text-red-800">
              This AI analysis is for educational and research purposes only. It is not a substitute for professional 
              medical diagnosis, treatment, or advice. Always consult with qualified healthcare professionals for 
              medical decisions. In case of emergency, seek immediate medical attention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResultDisplay;