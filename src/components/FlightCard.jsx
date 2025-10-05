import React from 'react';
import { Plane, Clock, ExternalLink } from 'lucide-react';

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <Plane className="w-6 h-6 text-blue-600" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">{flight.airline}</h3>
            <p className="text-sm text-gray-600">Flight {flight.flightNumber}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
          <p className="text-sm text-gray-500">Round Trip</p>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Outbound - {flight.outbound.date}</p>
        <div className="bg-gray-50 rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-600">Departure</p>
              <p className="font-semibold text-gray-800">{flight.outbound.departureTime}</p>
              <p className="text-sm text-gray-600">{flight.from}</p>
            </div>
            <div className="text-center">
              <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">{flight.outbound.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Arrival</p>
              <p className="font-semibold text-gray-800">{flight.outbound.arrivalTime}</p>
              <p className="text-sm text-gray-600">{flight.to}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Return - {flight.return.date}</p>
        <div className="bg-gray-50 rounded-lg p-3 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-600">Departure</p>
              <p className="font-semibold text-gray-800">{flight.return.departureTime}</p>
              <p className="text-sm text-gray-600">{flight.to}</p>
            </div>
            <div className="text-center">
              <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">{flight.return.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600">Arrival</p>
              <p className="font-semibold text-gray-800">{flight.return.arrivalTime}</p>
              <p className="text-sm text-gray-600">{flight.from}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}</span>
        <span>{flight.cabinClass}</span>
      </div>

      <a
        href={flight.bookingLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        <ExternalLink className="w-4 h-4 inline mr-2" />
        View on {flight.bookingSite}
      </a>
    </div>
  );
}