'use server'
import connectDB from "./connectDB";
import User from "./models/User";
 
const fetchWeatherData = async (latLongString) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${latLongString}&aqi=no`
  );

  return response.json();
};

export default fetchWeatherData;

export const fetchUserId = async (email) => {
  await connectDB();
  const user = await User.findOne({ email: email });
  const userId = user._id;
  return userId;
}


