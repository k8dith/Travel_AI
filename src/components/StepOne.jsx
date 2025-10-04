import React from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

export default function StepOne({ formData, onChange, onNext }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell us about your trip</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Where are you traveling from?
          </label>
          <input
            type="text"
            value={formData.from || ''}
            onChange={(e) => onChange('from', e.target.value)}
            placeholder="e.g., Dallas, TX"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate || ''}
              onChange={(e) => onChange('startDate', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate || ''}
              onChange={(e) => onChange('endDate', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Total Budget
          </label>
          <input
            type="number"
            value={formData.totalBudget || ''}
            onChange={(e) => onChange('totalBudget', e.target.value)}
            placeholder="e.g., 1500"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          Continue to Budget Breakdown
        </button>
      </div>
    </div>
  );
}