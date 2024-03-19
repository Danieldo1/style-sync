'use server'

const fetchWeatherData = async (latLongString) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${latLongString}&aqi=no`
  );

  return response.json();
};

export default fetchWeatherData;
