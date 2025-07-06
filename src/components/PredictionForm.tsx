import React, { useState } from 'react';
import { User, Cigarette, Briefcase, Heart } from 'lucide-react';
import { PatientData } from '../types';

interface PredictionFormProps {
  onSubmit: (data: PatientData) => void;
  isLoading: boolean;
  onReset: () => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading, onReset }) => {
  const [formData, setFormData] = useState<PatientData>({
    age: 45,
    gender: 'male',
    smokingHistory: 'never',
    packYears: 0,
    familyHistory: false,
    occupationalExposure: false,
    chronicCough: false,
    shortnessOfBreath: false,
    chestPain: false,
    weightLoss: false,
    fatigue: false,
    bloodInSputum: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      age: 45,
      gender: 'male',
      smokingHistory: 'never',
      packYears: 0,
      familyHistory: false,
      occupationalExposure: false,
      chronicCough: false,
      shortnessOfBreath: false,
      chestPain: false,
      weightLoss: false,
      fatigue: false,
      bloodInSputum: false,
    });
    onReset();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Smoking History */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Cigarette className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium text-gray-900">Smoking History</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Smoking Status
              </label>
              <select
                value={formData.smokingHistory}
                onChange={(e) => setFormData({ ...formData, smokingHistory: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus"
              >
                <option value="never">Never Smoked</option>
                <option value="former">Former Smoker</option>
                <option value="current">Current Smoker</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pack Years (if applicable)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.packYears}
                onChange={(e) => setFormData({ ...formData, packYears: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus"
                disabled={formData.smokingHistory === 'never'}
              />
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium text-gray-900">Risk Factors</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.familyHistory}
                onChange={(e) => setFormData({ ...formData, familyHistory: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Family History of Lung Disease</span>
            </label>
            
            <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.occupationalExposure}
                onChange={(e) => setFormData({ ...formData, occupationalExposure: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Occupational Exposure</span>
            </label>
          </div>
        </div>

        {/* Symptoms */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-red-500" />
            <h3 className="text-lg font-medium text-gray-900">Current Symptoms</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { key: 'chronicCough', label: 'Chronic Cough' },
              { key: 'shortnessOfBreath', label: 'Shortness of Breath' },
              { key: 'chestPain', label: 'Chest Pain' },
              { key: 'weightLoss', label: 'Unexplained Weight Loss' },
              { key: 'fatigue', label: 'Persistent Fatigue' },
              { key: 'bloodInSputum', label: 'Blood in Sputum' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[key as keyof PatientData] as boolean}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              'Predict Risk'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary"
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictionForm;