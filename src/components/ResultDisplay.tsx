import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, XCircle, TrendingUp, Shield, Lightbulb } from 'lucide-react';
import { PredictionResult } from '../types';

interface ResultDisplayProps {
  result: PredictionResult | null;
  isLoading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing patient data...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
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
            <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-medium">Ready for Analysis</p>
            <p className="text-sm text-gray-500 mt-2">
              Fill out the patient information form to get a lung disease risk prediction
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'very-high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-6 w-6" />;
      case 'moderate': return <AlertCircle className="h-6 w-6" />;
      case 'high': return <AlertTriangle className="h-6 w-6" />;
      case 'very-high': return <XCircle className="h-6 w-6" />;
      default: return <AlertCircle className="h-6 w-6" />;
    }
  };

  const getRiskDescription = (level: string) => {
    switch (level) {
      case 'low': return 'Low risk of lung disease. Continue healthy lifestyle practices.';
      case 'moderate': return 'Moderate risk detected. Consider preventive measures and regular check-ups.';
      case 'high': return 'High risk identified. Recommend immediate medical consultation.';
      case 'very-high': return 'Very high risk detected. Urgent medical evaluation strongly recommended.';
      default: return 'Risk assessment completed.';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <TrendingUp className="h-6 w-6 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Risk Assessment Results</h2>
      </div>

      {/* Risk Level */}
      <div className="mb-6">
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getRiskColor(result.riskLevel)}`}>
          {getRiskIcon(result.riskLevel)}
          <span className="font-semibold capitalize">{result.riskLevel.replace('-', ' ')} Risk</span>
        </div>
        <p className="text-gray-600 mt-2">{getRiskDescription(result.riskLevel)}</p>
      </div>

      {/* Probability */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Risk Probability</span>
          <span className="text-sm font-semibold text-gray-900">{result.probability}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-1000 ${
              result.probability < 25 ? 'bg-green-500' :
              result.probability < 50 ? 'bg-yellow-500' :
              result.probability < 75 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${result.probability}%` }}
          ></div>
        </div>
      </div>

      {/* Confidence */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Prediction Confidence</span>
          <span className="text-sm font-semibold text-gray-900">{result.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Risk Factors */}
      {result.riskFactors.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <h3 className="font-semibold text-gray-900">Identified Risk Factors</h3>
          </div>
          <ul className="space-y-2">
            {result.riskFactors.map((factor, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Lightbulb className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Shield className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-600">
              <strong>Medical Disclaimer:</strong> This prediction is for educational purposes only and should not replace professional medical advice. 
              Please consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;