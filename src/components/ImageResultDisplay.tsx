import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, Clock, Zap, Eye, Lightbulb, Shield, Target } from 'lucide-react';
import { LungCancerPredictionResult } from '../types';

interface ImageResultDisplayProps {
  result: LungCancerPredictionResult | null;
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
            <p className="text-gray-600 font-medium">Analyzing for lung cancer...</p>
            <p className="text-sm text-gray-500 mt-2">
              {processingStage || 'Processing with deep learning models'}
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>Image analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-3 w-3" />
                <span>Cancer detection</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Risk assessment</span>
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
            <p className="text-gray-600 text-lg font-medium">Ready for Lung Cancer Detection</p>
            <p className="text-sm text-gray-500 mt-2">
              Upload a chest X-ray image to detect lung cancer with AI
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getCancerStatusColor = (hasCancer: boolean) => {
    return hasCancer ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100';
  };

  const getCancerStatusIcon = (hasCancer: boolean) => {
    return hasCancer ? <XCircle className="h-8 w-8" /> : <CheckCircle className="h-8 w-8" />;
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'very-high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
        <div className="p-2 bg-blue-100 rounded-lg">
          <Target className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Lung Cancer Detection Results</h2>
      </div>

      {/* Main Result */}
      <div className="mb-6">
        <div className="text-center mb-4">
          <div className={`inline-flex items-center space-x-3 px-6 py-4 rounded-2xl ${getCancerStatusColor(result.hasCancer)} mb-4`}>
            {getCancerStatusIcon(result.hasCancer)}
            <div>
              <div className="text-2xl font-bold">
                {result.hasCancer ? 'CANCER DETECTED' : 'NO CANCER DETECTED'}
              </div>
              <div className="text-sm opacity-80">
                {result.hasCancer ? 'Suspicious findings identified' : 'No malignant features found'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Risk Level */}
        <div className="text-center mb-4">
          <span className="text-sm text-gray-600 mr-2">Risk Level:</span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(result.riskLevel)}`}>
            {result.riskLevel.toUpperCase().replace('-', ' ')}
          </span>
        </div>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Detection Confidence</span>
          <span className="text-sm font-semibold text-gray-900">{result.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              result.confidence >= 90 ? (result.hasCancer ? 'bg-red-500' : 'bg-green-500') :
              result.confidence >= 75 ? (result.hasCancer ? 'bg-orange-500' : 'bg-blue-500') :
              result.confidence >= 60 ? 'bg-yellow-500' : 'bg-gray-500'
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
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
          <div>
            <span className="text-gray-600">Suspicious Areas:</span>
            <span className="font-medium ml-2">{result.technicalDetails.suspiciousAreas}</span>
          </div>
        </div>
      </div>

      {/* Findings */}
      {result.findings.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Diagnostic Findings</h3>
          </div>
          <ul className="space-y-2">
            {result.findings.map((finding, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${result.hasCancer ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <span className="text-sm text-gray-700">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className={`h-5 w-5 ${result.hasCancer ? 'text-red-500' : 'text-green-500'}`} />
          <h3 className="font-semibold text-gray-900">Medical Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${result.hasCancer ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-sm text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Medical Disclaimer */}
      <div className={`p-4 border rounded-lg ${result.hasCancer ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className="flex items-start space-x-2">
          <Shield className={`h-5 w-5 flex-shrink-0 mt-0.5 ${result.hasCancer ? 'text-red-600' : 'text-amber-600'}`} />
          <div>
            <h4 className={`text-sm font-semibold mb-1 ${result.hasCancer ? 'text-red-900' : 'text-amber-900'}`}>
              {result.hasCancer ? 'URGENT MEDICAL ATTENTION REQUIRED' : 'Medical Disclaimer'}
            </h4>
            <p className={`text-xs ${result.hasCancer ? 'text-red-800' : 'text-amber-800'}`}>
              {result.hasCancer 
                ? 'This AI detected potential lung cancer. Seek immediate medical consultation for proper diagnosis and treatment. This is not a definitive diagnosis.'
                : 'This AI analysis is for screening purposes only. Regular medical check-ups are still recommended. Consult healthcare professionals for comprehensive evaluation.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageResultDisplay;