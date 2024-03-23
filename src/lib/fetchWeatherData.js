"use server";
import connectDB from "./connectDB";
import User from "./models/User";
import { countAtom, incrementAtomCount, decrementAtomCount } from "./atomStore";



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
  const userPlainObject = {
    count: user.count,
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,
    isPro: user.isPro,
    subscribedOn: user.subscribedOn.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    items: user.items,
  };

  return userPlainObject;
};

export const incrementCount = async (email) => {
  await connectDB();
  const user = await User.findOne({ email: email });
  user.count = user.count + 1;
  await user.save();
 
};

export const decrementCount = async (email) => {
  try {
    await connectDB();

    const user = await User.findOne({ email: email });
    if (!user) {
      console.error("User not found");
      return;
    }

    user.count = user.count - 1;
    await user.save();

    console.log("Count decremented successfully");
  } catch (error) {
    console.error("Error decrementing count:", error);
  }
};

export const getCount = async (email) => {
  await connectDB();
  const user = await User.findOne({ email: email });
  return user.count;
  
}