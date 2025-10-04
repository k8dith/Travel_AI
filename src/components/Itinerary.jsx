import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Itinerary({ itinerary }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800">Day-by-Day Itinerary</h3>
      </div>

      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div key={index} className="relative pl-8 pb-6 border-l-2 border-indigo-200 last:border-l-0 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-1">{day.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{day.date}</p>
              
              <div className="space-y-3">
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="bg-white rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-indigo-600 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 text-sm">{activity.time}</p>
                        <p className="text-sm text-gray-700">{activity.activity}</p>
                        {activity.location && (
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <p className="text-xs text-gray-500">{activity.location}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}