import React from 'react';
import { Camera, Clock, DollarSign } from 'lucide-react';

export default function ActivityCard({ activities }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">Activities & Tours</h3>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-gray-800">{activity.name}</h4>
              <span className="font-bold text-purple-600">${activity.price}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{activity.duration}</span>
              </div>
              <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">
                {activity.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t-2 border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Total Activities Cost</span>
          <span className="font-bold text-purple-600 text-xl">
            ${activities.reduce((sum, a) => sum + a.price, 0)}
          </span>
        </div>
      </div>
    </div>
  );//kfnf
}