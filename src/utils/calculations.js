// Calculate number of nights between two dates
export const calculateNights = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
};

// Calculate budget breakdown if user doesn't provide one
export const calculateBudgetBreakdown = (totalBudget, flightBudget, hotelBudget, funBudget) => {
  const total = parseInt(totalBudget) || 0;
  
  return {
    flight: parseInt(flightBudget) || Math.floor(total * 0.35),
    hotel: parseInt(hotelBudget) || Math.floor(total * 0.40),
    fun: parseInt(funBudget) || Math.floor(total * 0.25)
  };
};

// Calculate if budget is sufficient for a trip
export const isBudgetSufficient = (totalBudget, minRequired = 250) => {
  return parseInt(totalBudget) >= minRequired;
};

// Calculate remaining budget
export const calculateRemaining = (totalBudget, spent) => {
  return parseInt(totalBudget) - parseInt(spent);
};

// Calculate percentage of budget used
export const calculateBudgetPercentage = (spent, total) => {
  if (!total || total === 0) return 0;
  return Math.min(((spent / total) * 100), 100);
};

// Distribute activities budget evenly
export const distributeActivityBudget = (totalActivityBudget, numberOfActivities = 3) => {
  const budget = parseInt(totalActivityBudget);
  const perActivity = Math.floor(budget / numberOfActivities);
  
  return Array(numberOfActivities).fill(0).map((_, index) => {
    // Give slightly more to first activity, less to last
    if (index === 0) return Math.floor(perActivity * 1.1);
    if (index === numberOfActivities - 1) return Math.floor(perActivity * 0.9);
    return perActivity;
  });
};

// Calculate hotel total from per-night rate
export const calculateHotelTotal = (pricePerNight, nights) => {
  return Math.floor(parseInt(pricePerNight) * parseInt(nights));
};

// Smart budget allocation to ensure we stay under budget
export const smartBudgetAllocation = (totalBudget, nights) => {
  const budget = parseInt(totalBudget);
  
  // Leave 5% buffer to ensure we never go over
  const usableBudget = Math.floor(budget * 0.95);
  
  // Allocate by priority
  const flightBudget = Math.floor(usableBudget * 0.35);
  const hotelBudget = Math.floor(usableBudget * 0.40);
  const activityBudget = Math.floor(usableBudget * 0.25);
  
  // Calculate per-night hotel cost
  const hotelPerNight = Math.floor(hotelBudget / nights);
  const hotelTotal = hotelPerNight * nights;
  
  // Distribute activity budget
  const activities = distributeActivityBudget(activityBudget, 3);
  
  return {
    flight: flightBudget,
    hotel: {
      total: hotelTotal,
      perNight: hotelPerNight
    },
    activities: activities,
    totalAllocated: flightBudget + hotelTotal + activities.reduce((a, b) => a + b, 0)
  };
};