import React from 'react';
import { Plane, Hotel, Camera } from 'lucide-react';

export default function StepTwo({ formData, onChange, onBack, onGenerate, isGenerating }) {
  const preferences = ['Beach', 'City', 'Adventure', 'Culture', 'Food', 'Nature', 'Nightlife', 'Relaxation'];

  const togglePreference = (pref) => {
    const current = formData.preferences || [];
    if (current.includes(pref)) {
      onChange('preferences', current.filter(p => p !== pref));
    } else {
      onChange('preferences', [...current, pref]);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Break down your budget</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Plane className="w-4 h-4 inline mr-1" />
            Flight Budget
          </label>
          <input
            type="number"
            value={formData.flightBudget || ''}
            onChange={(e) => onChange('flightBudget', e.target.value)}
            placeholder="e.g., 500"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Hotel className="w-4 h-4 inline mr-1" />
            Hotel Budget
          </label>
          <input
            type="number"
            value={formData.hotelBudget || ''}
            onChange={(e) => onChange('hotelBudget', e.target.value)}
            placeholder="e.g., 600"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Camera className="w-4 h-4 inline mr-1" />
            Fun & Activities Budget
          </label>
          <input
            type="number"
            value={formData.funBudget || ''}
            onChange={(e) => onChange('funBudget', e.target.value)}
            placeholder="e.g., 400"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What are you interested in?
          </label>
          <div className="flex flex-wrap gap-2">
            {preferences.map(pref => (
              <button
                key={pref}
                onClick={() => togglePreference(pref)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  (formData.preferences || []).includes(pref)
                    ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
          >
            Back
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            {isGenerating ? '✨ Generating your trip...' : 'Generate My Trip!'}
          </button>
        </div>
      </div>
    </div>
  );
}