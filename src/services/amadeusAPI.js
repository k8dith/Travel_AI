import axios from 'axios';

const AMADEUS_AUTH_URL = 'https://test.api.amadeus.com/v1/security/oauth2/token';
const AMADEUS_FLIGHT_URL = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
const AMADEUS_HOTEL_URL = 'https://test.api.amadeus.com/v3/shopping/hotel-offers';

let accessToken = null;
let tokenExpiry = null;

// Get access token
const getAccessToken = async () => {
  // If token exists and hasn't expired, return it
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(
      AMADEUS_AUTH_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_AMADEUS_API_KEY,
        client_secret: process.env.REACT_APP_AMADEUS_API_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Search for flights
export const searchFlights = async (origin, destination, departureDate, adults = 1) => {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(AMADEUS_FLIGHT_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
        adults: adults,
        max: 5
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('Error searching flights:', error.response?.data || error);
    throw error;
  }
};

// Search for hotels
export const searchHotels = async (cityCode, checkInDate, checkOutDate) => {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(AMADEUS_HOTEL_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        cityCode: cityCode,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: 1,
        roomQuantity: 1,
        radius: 20,
        radiusUnit: 'KM',
        currency: 'USD',
        bestRateOnly: true
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('Error searching hotels:', error.response?.data || error);
    throw error;
  }
};