import React from 'react';
import { Plane, Clock, DollarSign } from 'lucide-react';

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Plane className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">Flight</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Airline</p>
            <p className="font-semibold text-gray-800">{flight.airline}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-bold text-blue-600 text-xl">${flight.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{flight.duration}</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600 mb-1">Route</p>
          <p className="font-semibold text-gray-800">{flight.route}</p>
        </div>
      </div>
    </div>
  );
}