import React from 'react';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';

export default function StepOne({ formData, onChange, onNext }) {
  const handleNext = () => {
    // Validate that user filled out required fields
    if (!formData.from || !formData.departureDate || !formData.returnDate || !formData.travelers || !formData.totalBudget) {
      alert('Please fill out all fields');
      return;
    }

    // Validate that return date is after departure date
    if (new Date(formData.returnDate) <= new Date(formData.departureDate)) {
      alert('Return date must be after departure date');
      return;
    }

    onNext();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell us about your trip</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Where are you traveling from? *
          </label>
          <input
            type="text"
            value={formData.from || ''}
            onChange={(e) => onChange('from', e.target.value)}
            placeholder="e.g., Dallas, TX"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Enter your city and state</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Departure Date *
            </label>
            <input
              type="date"
              value={formData.departureDate || ''}
              onChange={(e) => onChange('departureDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Return Date *
            </label>
            <input
              type="date"
              value={formData.returnDate || ''}
              onChange={(e) => onChange('returnDate', e.target.value)}
              min={formData.departureDate || new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Number of Travelers *
          </label>
          <input
            type="number"
            value={formData.travelers || ''}
            onChange={(e) => onChange('travelers', e.target.value)}
            placeholder="e.g., 2"
            min="1"
            max="10"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Total Budget *
          </label>
          <input
            type="number"
            value={formData.totalBudget || ''}
            onChange={(e) => onChange('totalBudget', e.target.value)}
            placeholder="e.g., 1500"
            min="100"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Total budget for the entire trip</p>
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}