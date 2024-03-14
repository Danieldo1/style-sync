'use client'
import Heading from '@/components/Heading'
import { formatLatLong } from '@/lib';
import React, { useEffect, useState } from 'react'
import WeatherWidget from '@/components/WeatherWidget'
import LoadingWeather from '@/components/LoadingWeather'

const OutfitPage = () => {
  const [latLang, setLatLang] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserLatLng()
   
  }, []);

  useEffect(() => {
    if (latLang) {
      getUserWeather();
    }
  }, [latLang]);

  const getUserLatLng = async () => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
      );
      const data = await response.json();
      setLatLang(data.location);
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  }

  
  const getUserWeather = async () => {
    const latLongString = formatLatLong(latLang);
    
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latLongString}&aqi=no`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user weather:', error);
    }
  }
 

  return (
    <div>
      <Heading title="Pick an outfit" subTitle="Time to get dressed" />
      {loading && Object.keys(weather).length === 0 && <LoadingWeather />}
      {!loading && Object.keys(weather).length > 0 && (
        <WeatherWidget weather={weather} />
      )}
    </div>
  );
}

export default OutfitPage