import React from 'react';
import { Hotel, Star, MapPin, ArrowLeft, DollarSign } from 'lucide-react';

export default function HotelSelection({ hotelOptions, onSelectHotel, onBack, destination, budget, nights }) {
  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Flights
      </button>

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Hotel in {destination}</h2>
        <p className="text-gray-600 mb-2">Hotel budget: ${budget} | {nights} nights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelOptions.map((hotel, index) => (
          <div 
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-teal-500"
            onClick={() => onSelectHotel(hotel)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Per Night</p>
                <p className="text-2xl font-bold text-teal-600">${hotel.pricePerNight}</p>
              </div>
            </div>

            <div className="bg-teal-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Total for {nights} nights</span>
                <span className="text-xl font-bold text-teal-700">${hotel.totalPrice}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.slice(0, 6).map((amenity, i) => (
                  <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Select This Hotel
            </button>
          </div>
        ))}
      </div>

      {hotelOptions.length === 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
          <p className="text-yellow-800">No hotels found within your budget. Try increasing your hotel budget.</p>
        </div>
      )}
    </div>
  );
}