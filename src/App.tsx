import React, { useState } from 'react';
import { Settings as Lungs, Activity, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import ResultDisplay from './components/ResultDisplay';
import HealthTips from './components/HealthTips';
import Statistics from './components/Statistics';
import { PredictionResult, PatientData } from './types';
import { predictLungDisease } from './utils/prediction';

function App() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'predict' | 'stats' | 'tips'>('predict');

  const handlePrediction = async (data: PatientData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const prediction = predictLungDisease(data);
    setResult(prediction);
    setIsLoading(false);
  };

  const resetPrediction = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lungs className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LungCare AI</h1>
                <p className="text-sm text-gray-600">Advanced Lung Disease Prediction</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('predict')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'predict'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Prediction</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'stats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Statistics</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'tips'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Health Tips</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'predict' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <PredictionForm 
                onSubmit={handlePrediction} 
                isLoading={isLoading}
                onReset={resetPrediction}
              />
            </div>
            <div>
              <ResultDisplay 
                result={result} 
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && <Statistics />}
        {activeTab === 'tips' && <HealthTips />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2025 LungCare AI. This tool is for educational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;