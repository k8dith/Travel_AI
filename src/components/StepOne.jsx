import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, DollarSign, Plane, Loader } from 'lucide-react';
import { searchLocations } from '../services/amadeusService';

// Location Search Input Component
function LocationInput({ label, value, onChange, placeholder }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search locations with debounce
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchLocations(query);
        setSuggestions(results || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowDropdown(true);
  };

  const handleSelect = (location) => {
    const cityState = location.address 
      ? `${location.address.cityName}, ${location.address.stateCode || location.address.countryCode}`
      : location.name;
    
    setQuery(cityState);
    onChange({
      display: cityState,
      iataCode: location.iataCode,
      name: location.name,
      type: location.subType
    });
    setShowDropdown(false);
    setSuggestions([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        <MapPin className="w-4 h-4 inline mr-1" />
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder={placeholder}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Loader className="w-5 h-5 animate-spin text-blue-500" />
          </div>
        )}
      </div>
      
      {/* Dropdown with suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((location, index) => (
            <div
              key={`${location.iataCode}-${index}`}
              onClick={() => handleSelect(location)}
              className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {location.address?.cityName && `${location.address.cityName}, `}
                    {location.address?.stateCode || location.address?.countryCode}
                    {location.iataCode && ` • ${location.iataCode}`}
                  </div>
                </div>
                <Plane className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      {showDropdown && !isLoading && query.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg p-4 text-gray-500 text-center">
          No locations found. Try a different city name.
        </div>
      )}
    </div>
  );
}

// Main StepOne Component
export default function StepOne({ formData, onChange, onNext }) {
  const handleLocationChange = (field, locationData) => {
    onChange({
      ...formData,
      [field]: locationData
    });
  };

  const handleInputChange = (e) => {
    onChange({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isFormValid = () => {
    return (
      formData.from?.iataCode &&
      formData.to?.iataCode &&
      formData.startDate &&
      formData.endDate &&
      formData.totalBudget
    );
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell us about your trip</h2>
      
      <div className="space-y-6">
        {/* From Location */}
        <LocationInput
          label="Where are you traveling from?"
          value={formData.from}
          onChange={(data) => handleLocationChange('from', data)}
          placeholder="Enter city name (e.g., New York)"
        />

        {/* To Location */}
        <LocationInput
          label="Where do you want to go?"
          value={formData.to}
          onChange={(data) => handleLocationChange('to', data)}
          placeholder="Enter destination city"
        />

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Departure Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate || ''}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Return Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate || ''}
              onChange={handleInputChange}
              min={formData.startDate || new Date().toISOString().split('T')[0]}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Budget Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Total Budget
          </label>
          <input
            type="number"
            name="totalBudget"
            value={formData.totalBudget || ''}
            onChange={handleInputChange}
            placeholder="e.g., 2000"
            min="0"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Flight Budget
            </label>
            <input
              type="number"
              name="flightBudget"
              value={formData.flightBudget || ''}
              onChange={handleInputChange}
              placeholder="800"
              min="0"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hotel Budget
            </label>
            <input
              type="number"
              name="hotelBudget"
              value={formData.hotelBudget || ''}
              onChange={handleInputChange}
              placeholder="700"
              min="0"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Activity Budget
            </label>
            <input
              type="number"
              name="activityBudget"
              value={formData.activityBudget || ''}
              onChange={handleInputChange}
              placeholder="500"
              min="0"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            isFormValid()
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Preferences →
        </button>
      </div>

      {/* Selected Locations Display */}
      {(formData.from || formData.to) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-2">✈️ Your Route:</h3>
          {formData.from && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">From:</span> {formData.from.display} 
              <span className="text-gray-500"> ({formData.from.iataCode})</span>
            </div>
          )}
          {formData.to && (
            <div className="text-sm text-gray-700">
              <span className="font-medium">To:</span> {formData.to.display}
              <span className="text-gray-500"> ({formData.to.iataCode})</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}