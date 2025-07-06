import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, AlertTriangle, Activity } from 'lucide-react';

const Statistics: React.FC = () => {
  const riskDistribution = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Moderate Risk', value: 30, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#F97316' },
    { name: 'Very High Risk', value: 5, color: '#EF4444' },
  ];

  const ageGroups = [
    { age: '18-30', predictions: 120, highRisk: 5 },
    { age: '31-45', predictions: 250, highRisk: 25 },
    { age: '46-60', predictions: 180, highRisk: 45 },
    { age: '61-75', predictions: 90, highRisk: 35 },
    { age: '75+', predictions: 60, highRisk: 25 },
  ];

  const monthlyTrends = [
    { month: 'Jan', predictions: 65, accuracy: 92 },
    { month: 'Feb', predictions: 78, accuracy: 94 },
    { month: 'Mar', predictions: 85, accuracy: 91 },
    { month: 'Apr', predictions: 92, accuracy: 95 },
    { month: 'May', predictions: 88, accuracy: 93 },
    { month: 'Jun', predictions: 95, accuracy: 96 },
  ];

  const stats = [
    {
      title: 'Total Predictions',
      value: '1,247',
      change: '+12%',
      icon: <Activity className="h-6 w-6" />,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Active Users',
      value: '892',
      change: '+8%',
      icon: <Users className="h-6 w-6" />,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'High Risk Cases',
      value: '156',
      change: '-3%',
      icon: <AlertTriangle className="h-6 w-6" />,
      color: 'text-red-600 bg-red-100',
    },
    {
      title: 'Model Accuracy',
      value: '94.2%',
      change: '+1.2%',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-purple-600 bg-purple-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">Comprehensive insights into lung disease prediction patterns and model performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Group Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk by Age Group</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="predictions" fill="#3B82F6" name="Total Predictions" />
              <Bar dataKey="highRisk" fill="#EF4444" name="High Risk Cases" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="predictions" fill="#3B82F6" name="Predictions" />
            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} name="Accuracy %" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6 card-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Age Factor Impact</p>
                <p className="text-sm text-gray-600">Patients aged 46-60 show the highest prediction volume with significant risk factors.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Model Performance</p>
                <p className="text-sm text-gray-600">Prediction accuracy has improved by 1.2% this month, reaching 94.2%.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Risk Patterns</p>
                <p className="text-sm text-gray-600">75% of patients fall into low to moderate risk categories, indicating effective early screening.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-gray-900">Usage Growth</p>
                <p className="text-sm text-gray-600">Monthly predictions have increased by 12%, showing growing adoption of the tool.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;