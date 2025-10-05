// Format price with $ and commas
export const formatPrice = (price) => {
  const num = parseInt(price) || 0;
  return `$${num.toLocaleString('en-US')}`;
};

// Format date to readable format (e.g., "Jan 15, 2025")
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Format date range (e.g., "Jan 15 - Jan 20, 2025")
export const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = start.getMonth() === end.getMonth();
  
  if (sameYear && sameMonth) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`;
  } else if (sameYear) {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  } else {
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }
};

// Format duration (e.g., "3h 45m")
export const formatDuration = (minutes) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// Format currency with proper decimals
export const formatCurrency = (amount, currency = 'USD') => {
  const num = parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
};

// Format percentage
export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

// Extract airport code from city name (e.g., "Dallas, TX" → "DFW")
export const extractAirportCode = (cityString) => {
  // This is a simple version - in production you'd use an airport API
  const airportCodes = {
    'dallas': 'DFW',
    'new york': 'JFK',
    'los angeles': 'LAX',
    'chicago': 'ORD',
    'miami': 'MIA',
    'houston': 'IAH',
    'atlanta': 'ATL',
    'san francisco': 'SFO',
    'boston': 'BOS',
    'seattle': 'SEA'
  };
  
  const city = cityString.toLowerCase();
  for (const [key, code] of Object.entries(airportCodes)) {
    if (city.includes(key)) {
      return code;
    }
  }
  
  return null;
};

// Format airline route (e.g., "DFW → CUN")
export const formatRoute = (origin, destination) => {
  return `${origin} → ${destination}`;
};

// Capitalize first letter of each word
export const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Format location (city, country)
export const formatLocation = (city, country) => {
  if (city && country) {
    return `${city}, ${country}`;
  }
  return city || country || '';
};