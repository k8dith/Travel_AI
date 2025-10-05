import React from 'react';
import { Plane, Clock, DollarSign, ArrowLeft } from 'lucide-react';

export default function FlightSelection({ flightOptions, onSelectFlight, onBack, budget }) {
  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Budget
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Destination</h2>
        <p className="text-gray-600 mb-4">Based on your flight budget of ${budget}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flightOptions.map((option, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500"
            onClick={() => onSelectFlight(option)}
          >
            <div className="text-4xl mb-3 text-center">{option.emoji}</div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">
              {option.destination}
            </h3>
            <p className="text-sm text-gray-600 mb-4 text-center">{option.country}</p>
            
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Flight Price</span>
                <span className="text-2xl font-bold text-blue-600">${option.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{option.duration}</span>
                </div>
                <span>{option.stops === 0 ? 'Non-stop' : `${option.stops} stop(s)`}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{option.description}</p>
            
            <div className="text-xs text-gray-500 mb-3">
              <div>Airline: {option.airline}</div>
              <div>Class: {option.cabinClass}</div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Select This Flight
            </button>
          </div>
        ))}
      </div>

      {flightOptions.length === 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800">No flights found within your budget. Try increasing your flight budget.</p>
        </div>
      )}
    </div>
  );
}