import React, { useState } from 'react';
import { Settings as Lungs, Activity, Image as ImageIcon, CheckCircle, BarChart3 } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import ImageResultDisplay from './components/ImageResultDisplay';
import HealthTips from './components/HealthTips';
import Statistics from './components/Statistics';
import { LungCancerPredictionResult } from './types';
import { analyzeLungCancer, processingStages } from './utils/imageAnalysis';

function App() {
  const [result, setResult] = useState<LungCancerPredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'analyze' | 'stats' | 'tips'>('analyze');
  const [processingStage, setProcessingStage] = useState<string>('');

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setResult(null);
    
    // Simulate processing stages
    for (let i = 0; i < processingStages.length; i++) {
      setProcessingStage(processingStages[i]);
      await new Promise(resolve => setTimeout(resolve, 600));
    }
    
    try {
      const analysis = await analyzeLungCancer(file);
      setResult(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    
    setIsLoading(false);
    setProcessingStage('');
  };

  const resetAnalysis = () => {
    setResult(null);
    setProcessingStage('');
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
                <h1 className="text-2xl font-bold text-gray-900">LungCancer AI</h1>
                <p className="text-sm text-gray-600">AI-Powered Lung Cancer Detection</p>
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
              onClick={() => setActiveTab('analyze')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'analyze'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-4 w-4" />
                <span>Cancer Detection</span>
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
        {activeTab === 'analyze' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                isLoading={isLoading}
                onReset={resetAnalysis}
              />
            </div>
            <div>
              <ImageResultDisplay 
                result={result} 
                isLoading={isLoading}
                processingStage={processingStage}
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
              © 2025 LungCancer AI. This screening tool is for educational purposes only. Always consult healthcare professionals for medical diagnosis and treatment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;