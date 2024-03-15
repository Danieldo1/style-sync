
import axios from "axios";

const fetchWeatherData = async (latLongString) => {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latLongString}&aqi=no`
  );
  return response.data;
};

export default fetchWeatherData;
