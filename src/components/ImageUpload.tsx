import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, FileImage, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
  onReset: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, isLoading, onReset }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
    onImageUpload(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onReset();
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <ImageIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Chest X-Ray Analysis</h2>
        <h2 className="text-xl font-semibold text-gray-900">Lung Cancer Detection</h2>
      </div>

      {!uploadedImage ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors duration-200 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={isLoading}
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-gray-400" />
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-amber-800 mb-1">AI Screening Tool</h4>
                Upload Chest X-Ray for Cancer Detection
              </h3>
                This AI tool is designed to assist in lung cancer screening. It is not a replacement for professional 
                medical diagnosis. Always consult with qualified healthcare professionals for definitive diagnosis and treatment.
              </p>
            </div>

            <button
              type="button"
              onClick={onButtonClick}
              disabled={isLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileImage className="h-4 w-4 mr-2" />
              Choose Image
            </button>

            <div className="text-xs text-gray-500 space-y-1">
              <p>Supported formats: JPEG, PNG, WEBP</p>
              <p>Maximum file size: 10MB</p>
              <p>Best results: High-quality PA chest X-rays</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded chest X-ray"
              className="w-full h-64 object-contain bg-gray-50 rounded-lg border"
            />
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <FileImage className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700 truncate">{fileName}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="w-full btn-secondary"
            disabled={isLoading}
          >
            Upload Different Image
          </button>
        </div>
      )}

      {/* Important Notice */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <li>• Persistent cough lasting more than 3 weeks</li>
              <li>• Unexplained weight loss or fatigue</li>
            <p className="text-red-800 mb-3">Consult a healthcare professional immediately if you have:</p>
              <li>• Chest pain or shortness of breath</li>
              <li>• History of smoking or lung disease</li>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;