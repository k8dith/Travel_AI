import React, { useState } from 'react';
import Header from './components/Header';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import TripResults from './components/TripResults';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [tripPlan, setTripPlan] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateTrip = () => {
    setIsGenerating(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const plan = {
        destination: 'Cancun, Mexico',
        dates: `${formData.startDate} to ${formData.endDate}`,
        flight: {
          airline: 'Southwest Airlines',
          price: 450,
          duration: '3h 15m',
          route: `${formData.from} → Cancun`
        },
        hotel: {
          name: 'Playa Del Carmen Resort',
          stars: 4,
          location: 'Hotel Zone, Cancun',
          pricePerNight: 120,
          nights: 5,
          totalPrice: 600,
          amenities: ['Pool', 'Beach Access', 'WiFi', 'Breakfast', 'Gym']
        },
        activities: [
          {
            name: 'Chichen Itza Tour',
            description: 'Explore ancient Mayan ruins with a guided tour',
            price: 89,
            duration: '8 hours',
            category: 'Culture'
          },
          {
            name: 'Snorkeling Adventure',
            description: 'Discover colorful marine life in crystal clear waters',
            price: 65,
            duration: '4 hours',
            category: 'Adventure'
          },
          {
            name: 'Sunset Cruise',
            description: 'Romantic evening cruise with dinner included',
            price: 95,
            duration: '3 hours',
            category: 'Relaxation'
          }
        ],
        restaurants: [
          {
            name: 'La Habichuela',
            cuisine: 'Mexican & Caribbean',
            rating: 5,
            description: 'Authentic Mexican cuisine in a tropical garden setting',
            priceRange: '$$-$$$',
            specialty: 'Seafood'
          },
          {
            name: 'Puerto Madero',
            cuisine: 'Argentinian Steakhouse',
            rating: 4,
            description: 'Premium cuts and waterfront views',
            priceRange: '$$$',
            specialty: 'Steak'
          },
          {
            name: 'Taqueria Coapango',
            cuisine: 'Street Tacos',
            rating: 5,
            description: 'Best authentic street tacos in Cancun',
            priceRange: '$',
            specialty: 'Tacos'
          }
        ],
        itinerary: [
          {
            title: 'Arrival Day',
            date: formData.startDate,
            activities: [
              { time: '10:00 AM', activity: 'Arrive at Cancun Airport', location: 'CUN Airport' },
              { time: '12:00 PM', activity: 'Check-in at hotel', location: 'Playa Del Carmen Resort' },
              { time: '2:00 PM', activity: 'Lunch at beachfront restaurant' },
              { time: '4:00 PM', activity: 'Relax by the pool or beach' },
              { time: '7:00 PM', activity: 'Dinner at La Habichuela' }
            ]
          },
          {
            title: 'Adventure Day',
            date: 'Day 2',
            activities: [
              { time: '7:00 AM', activity: 'Early breakfast' },
              { time: '8:00 AM', activity: 'Depart for Chichen Itza Tour' },
              { time: '5:00 PM', activity: 'Return to hotel' },
              { time: '8:00 PM', activity: 'Dinner at Taqueria Coapango' }
            ]
          },
          {
            title: 'Beach & Water Day',
            date: 'Day 3',
            activities: [
              { time: '9:00 AM', activity: 'Breakfast at hotel' },
              { time: '10:00 AM', activity: 'Snorkeling Adventure' },
              { time: '3:00 PM', activity: 'Free time - beach or shopping' },
              { time: '6:00 PM', activity: 'Sunset Cruise with dinner' }
            ]
          }
        ],
        budget: {
          total: parseInt(formData.totalBudget),
          spent: 1299,
          breakdown: [
            { category: 'Flight', amount: 450 },
            { category: 'Hotel', amount: 600 },
            { category: 'Activities', amount: 249 }
          ]
        }
      };

      setTripPlan(plan);
      setIsGenerating(false);
      setStep(3);
    }, 2000);
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