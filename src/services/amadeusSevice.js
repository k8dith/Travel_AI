export const searchLocations = async (keyword) => {
  try {
    const token = await getAccessToken();
    
    const response = await axios.get(AMADEUS_LOCATION_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        subType: 'CITY,AIRPORT',
        keyword: keyword,
        'page[limit]': 10
      }
    });

    return response.data.data;
  } catch (error) {
    console.error('Error searching locations:', error.response?.data || error);
    throw error;
  }
};