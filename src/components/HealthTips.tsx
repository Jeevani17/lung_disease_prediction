import React from 'react';
import { Shield, Heart, Activity, Stethoscope, Wind, Apple } from 'lucide-react';

const HealthTips: React.FC = () => {
  const tips = [
    {
      id: '1',
      title: 'Quit Smoking',
      description: 'Smoking is the leading cause of lung disease. Quitting at any age can significantly reduce your risk and improve lung function.',
      category: 'prevention',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-red-100 text-red-600',
      details: [
        'Seek professional help or counseling',
        'Consider nicotine replacement therapy',
        'Join support groups',
        'Avoid triggers and smoking environments'
      ]
    },
    {
      id: '2',
      title: 'Regular Exercise',
      description: 'Physical activity strengthens respiratory muscles and improves lung capacity and overall cardiovascular health.',
      category: 'lifestyle',
      icon: <Activity className="h-6 w-6" />,
      color: 'bg-green-100 text-green-600',
      details: [
        'Aim for 150 minutes of moderate exercise weekly',
        'Include both cardio and strength training',
        'Start slowly and gradually increase intensity',
        'Consider activities like walking, swimming, or cycling'
      ]
    },
    {
      id: '3',
      title: 'Healthy Diet',
      description: 'A balanced diet rich in antioxidants, vitamins, and minerals supports lung health and immune function.',
      category: 'lifestyle',
      icon: <Apple className="h-6 w-6" />,
      color: 'bg-orange-100 text-orange-600',
      details: [
        'Eat plenty of fruits and vegetables',
        'Include omega-3 rich foods like fish',
        'Limit processed and high-sodium foods',
        'Stay hydrated with plenty of water'
      ]
    },
    {
      id: '4',
      title: 'Air Quality Awareness',
      description: 'Protect yourself from air pollution, dust, and harmful chemicals that can damage lung tissue.',
      category: 'prevention',
      icon: <Wind className="h-6 w-6" />,
      color: 'bg-blue-100 text-blue-600',
      details: [
        'Check daily air quality index',
        'Use air purifiers indoors',
        'Wear masks in polluted environments',
        'Avoid outdoor activities during high pollution days'
      ]
    },
    {
      id: '5',
      title: 'Regular Check-ups',
      description: 'Early detection through regular medical screenings can identify lung problems before symptoms appear.',
      category: 'screening',
      icon: <Stethoscope className="h-6 w-6" />,
      color: 'bg-purple-100 text-purple-600',
      details: [
        'Annual chest X-rays for high-risk individuals',
        'Discuss lung cancer screening with your doctor',
        'Monitor symptoms like persistent cough',
        'Get vaccinated against respiratory infections'
      ]
    },
    {
      id: '6',
      title: 'Breathing Exercises',
      description: 'Practice deep breathing techniques to improve lung function and reduce stress on respiratory system.',
      category: 'lifestyle',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-pink-100 text-pink-600',
      details: [
        'Practice diaphragmatic breathing daily',
        'Try pursed-lip breathing technique',
        'Consider yoga or meditation',
        'Use breathing apps for guided exercises'
      ]
    }
  ];

  const categories = {
    prevention: { name: 'Prevention', count: tips.filter(tip => tip.category === 'prevention').length },
    lifestyle: { name: 'Lifestyle', count: tips.filter(tip => tip.category === 'lifestyle').length },
    screening: { name: 'Screening', count: tips.filter(tip => tip.category === 'screening').length }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lung Health Tips</h2>
        <p className="text-gray-600">Evidence-based recommendations to maintain and improve your lung health.</p>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <div key={key} className="bg-white rounded-xl shadow-lg p-6 card-shadow">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{category.count}</div>
              <div className="text-sm text-gray-600 capitalize">{category.name} Tips</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-xl shadow-lg p-6 card-shadow hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${tip.color} flex-shrink-0`}>
                {tip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    tip.category === 'prevention' ? 'bg-red-100 text-red-700' :
                    tip.category === 'lifestyle' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {tip.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{tip.description}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Actions:</h4>
                  <ul className="space-y-1">
                    {tip.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Need More Information?</h3>
          <p className="text-gray-600 mb-6">
            For personalized advice and comprehensive lung health assessment, consult with healthcare professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 shadow-sm">
              Find a Pulmonologist
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              Schedule Screening
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Warning */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-semibold text-red-900 mb-2">When to Seek Immediate Medical Attention</h4>
            <p className="text-red-800 mb-3">Contact emergency services or visit the nearest emergency room if you experience:</p>
            <ul className="space-y-1 text-red-700">
              <li>• Severe shortness of breath or difficulty breathing</li>
              <li>• Chest pain that worsens or doesn't improve</li>
              <li>• Coughing up blood or blood-tinged sputum</li>
              <li>• Sudden onset of severe symptoms</li>
              <li>• Blue lips or fingernails (cyanosis)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTips;