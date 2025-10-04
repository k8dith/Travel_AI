import React from 'react';
import { ArrowLeft } from 'lucide-react';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';
import ActivityCard from './ActivityCard';
import RestaurantCard from './RestaurantCard';
import Itinerary from './Itinerary';
import BudgetSummary from './BudgetSummary';

export default function TripResults({ tripPlan, onStartOver }) {
  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onStartOver}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Start New Trip
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Perfect Trip to {tripPlan.destination}</h2>
      <p className="text-gray-600 mb-8">{tripPlan.dates}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <FlightCard flight={tripPlan.flight} />
          <HotelCard hotel={tripPlan.hotel} />
          <ActivityCard activities={tripPlan.activities} />
          <RestaurantCard restaurants={tripPlan.restaurants} />
          <Itinerary itinerary={tripPlan.itinerary} />
        </div>

        <div className="lg:col-span-1">
          <BudgetSummary budget={tripPlan.budget} />
        </div>
      </div>
    </div>
  );
}