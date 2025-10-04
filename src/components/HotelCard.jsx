import React from 'react';
import { Hotel, Star, MapPin } from 'lucide-react';

export default function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hotel className="w-6 h-6 text-teal-600" />
        <h3 className="text-xl font-bold text-gray-800">Hotel</h3>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-gray-800 text-lg">{hotel.name}</h4>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
          <div>
            <p className="text-sm text-gray-600">Per Night</p>
            <p className="font-bold text-teal-600 text-xl">${hotel.pricePerNight}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total ({hotel.nights} nights)</p>
            <p className="font-bold text-gray-800 text-xl">${hotel.totalPrice}</p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          <p className="text-sm font-semibold text-blue-800 mb-1">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, i) => (
              <span key={i} className="text-xs bg-white px-2 py-1 rounded-full text-gray-700">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}