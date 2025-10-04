import React from 'react';
import { UtensilsCrossed, Star, DollarSign } from 'lucide-react';

export default function RestaurantCard({ restaurants }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <UtensilsCrossed className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-800">Recommended Restaurants</h3>
      </div>

      <div className="space-y-4">
        {restaurants.map((restaurant, index) => (
          <div key={index} className="border-2 border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-800">{restaurant.name}</h4>
                <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(restaurant.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{restaurant.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{restaurant.priceRange}</span>
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                {restaurant.specialty}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}