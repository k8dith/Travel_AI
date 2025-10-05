import React, { useState } from 'react';
import Header from './components/Header';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import TripResults from './components/TripResults';
import { searchFlights, searchHotels } from './services/amadeusAPI';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [tripPlan, setTripPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);      

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTrip = async () => {
    setIsGenerating(true);
    
    try {
      // Calculate trip length
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      // Get user's budget and preferences
      const totalBudget = parseInt(formData.totalBudget);
      const flightBudget = parseInt(formData.flightBudget) || Math.floor(totalBudget * 0.35);
      const hotelBudget = parseInt(formData.hotelBudget) || Math.floor(totalBudget * 0.40);
      const preferences = formData.preferences || [];
      
      // Function to get destination options based on budget
      const getDestinationOptions = (budget, prefs) => {
        const options = [];
        
        if (budget < 600) {
          // Low budget - nearby Texas cities
          options.push(
            { name: 'Austin', code: 'AUS', country: 'Texas, USA', description: 'Live music capital, 3 hours away', type: 'nearby' },
            { name: 'Houston', code: 'IAH', country: 'Texas, USA', description: 'Space city with diverse culture', type: 'nearby' },
            { name: 'San Antonio', code: 'SAT', country: 'Texas, USA', description: 'Historic River Walk and Alamo', type: 'nearby' }
          );
        } else if (budget < 1000) {
          // Medium budget - regional options
          if (prefs.includes('Beach')) {
            options.push(
              { name: 'Cancun', code: 'CUN', country: 'Mexico', description: 'Caribbean paradise', type: 'main' },
              { name: 'South Padre Island', code: 'BRO', country: 'Texas, USA', description: 'Texas beach getaway', type: 'cheaper' },
              { name: 'Galveston', code: 'HOU', country: 'Texas, USA', description: 'Historic beach town', type: 'budget' }
            );
          } else if (prefs.includes('City')) {
            options.push(
              { name: 'Miami', code: 'MIA', country: 'Florida, USA', description: 'Vibrant beach city', type: 'main' },
              { name: 'Austin', code: 'AUS', country: 'Texas, USA', description: 'Live music and tech hub', type: 'cheaper' },
              { name: 'New Orleans', code: 'MSY', country: 'Louisiana, USA', description: 'Jazz and cuisine', type: 'budget' }
            );
          } else {
            options.push(
              { name: 'Denver', code: 'DEN', country: 'Colorado, USA', description: 'Mountain adventures', type: 'main' },
              { name: 'Santa Fe', code: 'SAF', country: 'New Mexico, USA', description: 'Art and culture', type: 'cheaper' },
              { name: 'Austin', code: 'AUS', country: 'Texas, USA', description: 'Hill country escape', type: 'budget' }
            );
          }
        } else if (budget < 2000) {
          // Good budget - major destinations
          if (prefs.includes('Beach')) {
            options.push(
              { name: 'Hawaii', code: 'HNL', country: 'Hawaii, USA', description: 'Tropical paradise', type: 'main' },
              { name: 'Cancun', code: 'CUN', country: 'Mexico', description: 'Caribbean beaches', type: 'cheaper' },
              { name: 'Miami', code: 'MIA', country: 'Florida, USA', description: 'Beach and nightlife', type: 'budget' }
            );
          } else if (prefs.includes('City')) {
            options.push(
              { name: 'New York City', code: 'JFK', country: 'New York, USA', description: 'The Big Apple', type: 'main' },
              { name: 'Chicago', code: 'ORD', country: 'Illinois, USA', description: 'Architecture and food', type: 'cheaper' },
              { name: 'Austin', code: 'AUS', country: 'Texas, USA', description: 'Tech and music hub', type: 'budget' }
            );
          } else {
            options.push(
              { name: 'Los Angeles', code: 'LAX', country: 'California, USA', description: 'Hollywood glamour', type: 'main' },
              { name: 'San Diego', code: 'SAN', country: 'California, USA', description: 'Perfect weather year-round', type: 'cheaper' },
              { name: 'Las Vegas', code: 'LAS', country: 'Nevada, USA', description: 'Entertainment capital', type: 'budget' }
            );
          }
        } else {
          // High budget - international
          if (prefs.includes('Beach')) {
            options.push(
              { name: 'Bali', code: 'DPS', country: 'Indonesia', description: 'Exotic island paradise', type: 'main' },
              { name: 'Hawaii', code: 'HNL', country: 'Hawaii, USA', description: 'Tropical paradise', type: 'cheaper' },
              { name: 'Cancun', code: 'CUN', country: 'Mexico', description: 'All-inclusive resorts', type: 'budget' }
            );
          } else if (prefs.includes('City')) {
            options.push(
              { name: 'Paris', code: 'CDG', country: 'France', description: 'City of lights', type: 'main' },
              { name: 'New York City', code: 'JFK', country: 'New York, USA', description: 'The Big Apple', type: 'cheaper' },
              { name: 'Los Angeles', code: 'LAX', country: 'California, USA', description: 'West coast vibes', type: 'budget' }
            );
          } else {
            options.push(
              { name: 'Tokyo', code: 'NRT', country: 'Japan', description: 'Where tradition meets future', type: 'main' },
              { name: 'London', code: 'LHR', country: 'United Kingdom', description: 'Historic capital', type: 'cheaper' },
              { name: 'San Francisco', code: 'SFO', country: 'California, USA', description: 'Golden Gate and tech', type: 'budget' }
            );
          }
        }
        
        return options;
      };
      
      const destinationOptions = getDestinationOptions(totalBudget, preferences);
      
      // Generate trip plan for the FIRST option (main recommendation)
      const destination = destinationOptions[0];
      
      let selectedFlight = null;
      
      // Try to fetch REAL flight data
      try {
        console.log(`AI Selected Destination: ${destination.name}`);
        console.log('Searching for flights...');
        const flights = await searchFlights('DFW', destination.code, formData.startDate, 1);
        
        // Find cheapest flight BELOW or AT flight budget (never above)
        for (let flight of flights) {
          const price = parseFloat(flight.price.total);
          if (price <= flightBudget) {
            selectedFlight = {
              airline: flight.validatingAirlineCodes[0],
              price: Math.round(price),
              duration: flight.itineraries[0].duration.replace('PT', '').toLowerCase(),
              route: `${formData.from} → ${destination.name}`
            };
            break;
          }
        }
        
        // If no flight within budget found, use cheapest available (should still be reasonable)
        if (!selectedFlight && flights.length > 0) {
          const cheapest = flights[0];
          const price = Math.round(parseFloat(cheapest.price.total));
          // Only use if it's close to budget
          if (price <= flightBudget * 1.1) {
            selectedFlight = {
              airline: cheapest.validatingAirlineCodes[0],
              price: price,
              duration: cheapest.itineraries[0].duration.replace('PT', '').toLowerCase(),
              route: `${formData.from} → ${destination.name}`
            };
          }
        }
      } catch (flightError) {
        console.log('Could not fetch real flights, using calculated price');
      }
      
      // If flight API failed or no affordable flights, use calculated price WITHIN budget
      if (!selectedFlight) {
        selectedFlight = {
          airline: 'Southwest Airlines',
          price: Math.floor(flightBudget * 0.90), // Use 90% of flight budget
          duration: '2h 45m',
          route: `${formData.from} → ${destination.name}`
        };
      }
      
      // Calculate available hotel budget
      const remainingBudget = totalBudget - selectedFlight.price;
      const adjustedHotelBudget = Math.min(hotelBudget, remainingBudget * 0.50);

      let selectedHotel = null;

      // Try to fetch REAL hotel data
      try {
        console.log('Searching for hotels...');
        const hotels = await searchHotels(destination.code, formData.startDate, formData.endDate);
        
        // Find hotel within adjusted budget
        for (let hotel of hotels) {
          const totalPrice = parseFloat(hotel.offers[0].price.total);
          const pricePerNight = Math.round(totalPrice / nights);
          
          if (totalPrice <= adjustedHotelBudget) {
            selectedHotel = {
              name: hotel.hotel.name,
              stars: hotel.hotel.rating || 4,
              location: `${destination.name}, ${destination.country}`,
              pricePerNight: pricePerNight,
              nights: nights,
              totalPrice: Math.round(totalPrice),
              amenities: hotel.hotel.amenities?.slice(0, 5) || ['Pool', 'WiFi', 'Breakfast', 'Gym']
            };
            break;
          }
        }
        
        // If no hotel within budget, try cheapest one
        if (!selectedHotel && hotels.length > 0) {
          const cheapest = hotels[0];
          const totalPrice = parseFloat(cheapest.offers[0].price.total);
          
          // Only use if reasonably close to budget
          if (totalPrice <= adjustedHotelBudget * 1.1) {
            selectedHotel = {
              name: cheapest.hotel.name,
              stars: cheapest.hotel.rating || 4,
              location: `${destination.name}, ${destination.country}`,
              pricePerNight: Math.round(totalPrice / nights),
              nights: nights,
              totalPrice: Math.round(totalPrice),
              amenities: cheapest.hotel.amenities?.slice(0, 5) || ['Pool', 'WiFi', 'Breakfast', 'Gym']
            };
          }
        }
      } catch (hotelError) {
        console.log('Could not fetch real hotels, using calculated price');
      }

      // If hotel API failed, use calculated price within budget
      if (!selectedHotel) {
        const hotelTotal = Math.floor(adjustedHotelBudget * 0.95);
        selectedHotel = {
          name: `${destination.name} Resort & Spa`,
          stars: 4,
          location: `${destination.name}, ${destination.country}`,
          pricePerNight: Math.floor(hotelTotal / nights),
          nights: nights,
          totalPrice: hotelTotal,
          amenities: ['Pool', 'WiFi', 'Breakfast', 'Gym', 'Spa']
        };
      }
      
      // Activities within remaining budget
      const spentSoFar = selectedFlight.price + selectedHotel.totalPrice;
      const remainingForActivities = Math.max(0, totalBudget - spentSoFar - 50); // Leave $50 buffer
      const activity1Price = Math.floor(remainingForActivities * 0.40);
      const activity2Price = Math.floor(remainingForActivities * 0.35);
      const activity3Price = Math.floor(remainingForActivities * 0.25);
      
      const totalSpent = spentSoFar + activity1Price + activity2Price + activity3Price;
  
      const plan = {
        destination: `${destination.name}, ${destination.country}`,
        destinationDescription: destination.description,
        dates: `${formData.startDate} to ${formData.endDate}`,
        alternativeOptions: destinationOptions, // Pass all options for display
        flight: selectedFlight,
        hotel: selectedHotel,
        activities: [
          {
            name: `${destination.name} Highlights Tour`,
            description: `Explore the best of ${destination.name} with a local guide`,
            price: activity1Price,
            duration: '6 hours',
            category: 'Culture'
          },
          {
            name: 'Local Experience',
            description: `Unique activities in ${destination.name}`,
            price: activity2Price,
            duration: '4 hours',
            category: 'Adventure'
          },
          {
            name: 'Evening Activity',
            description: `Enjoy ${destination.name} nightlife or sunset views`,
            price: activity3Price,
            duration: '3 hours',
            category: 'Relaxation'
          }
        ],
        restaurants: [
          {
            name: `Top Rated ${destination.name}`,
            cuisine: 'Local Cuisine',
            rating: 5,
            description: 'Authentic local dining experience',
            priceRange: '$$',
            specialty: 'Regional Dishes'
          },
          {
            name: `Waterfront Dining`,
            cuisine: 'International',
            rating: 4,
            description: 'Beautiful views with great food',
            priceRange: '$$$',
            specialty: 'Seafood'
          }
        ],
        itinerary: [
          {
            title: 'Arrival Day',
            date: formData.startDate,
            activities: [
              { time: '10:00 AM', activity: `Arrive at ${destination.name}`, location: destination.code },
              { time: '12:00 PM', activity: 'Check-in at hotel', location: selectedHotel.name },
              { time: '2:00 PM', activity: 'Lunch and explore nearby area' },
              { time: '5:00 PM', activity: 'Relax at hotel' },
              { time: '7:00 PM', activity: 'Welcome dinner at local restaurant' }
            ]
          }
        ],
        budget: {
          total: totalBudget,
          spent: totalSpent,
          breakdown: [
            { category: 'Flight', amount: selectedFlight.price },
            { category: 'Hotel', amount: selectedHotel.totalPrice },
            { category: 'Activities', amount: activity1Price + activity2Price + activity3Price }
          ]
        }
      };
  
      setTripPlan(plan);
      setStep(3);
    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Sorry, there was an error generating your trip. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const startOver = () => {
    setStep(1);
    setFormData({});
    setTripPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 py-8 px-4">
      <Header />
      
      <div className="mt-8">
        {step === 1 && (
          <StepOne
            formData={formData}
            onChange={handleChange}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepTwo
            formData={formData}
            onChange={handleChange}
            onBack={() => setStep(1)}
            onGenerate={generateTrip}
            isGenerating={isGenerating}
          />
        )}

        {step === 3 && tripPlan && (
          <TripResults
            tripPlan={tripPlan}
            onStartOver={startOver}
          />
        )}
      </div>
    </div>
  );
}

export default App;