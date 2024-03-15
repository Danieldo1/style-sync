'use client'
import Heading from '@/components/Heading'
import { formatLatLong } from '@/lib';
import React, { useEffect, useState } from 'react'
import WeatherWidget from '@/components/WeatherWidget'
import LoadingWeather from '@/components/LoadingWeather'
import fetchWeatherData from '@/lib/fetchWeatherData';
import ClothingSuggestionForm from '@/components/ClothingSuggestionForm';
import { useSession } from 'next-auth/react';

const OutfitPage = () => {
  const [latLang, setLatLang] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothes, setClothes] = useState([]);

   const { data: session } = useSession();
   const email = session && session.user.email;

  useEffect(() => {
    getUserLatLng()
   
  }, []);

    useEffect(() => {
      if (email) {
        getUserItems();
      }
    }, [email]);

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
      const response = await fetchWeatherData(latLongString);
      const data = response;
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user weather:', error);
    }
  }

 const getUserItems = async () => {
  
   try {
     const response = await fetch(`/api/findItemsUser?email=${email}`);
     if (response.ok) {
       const items = await response.json();
       setClothes(items);
     } else {
       console.error("Failed to fetch user items");
     }
   } catch (error) {
     console.error("Error fetching user items:", error);
   } 
 };

  return (
    <div>
      <Heading title="Pick an outfit" subTitle="Time to get dressed" />
      {loading && Object.keys(weather).length === 0 && <LoadingWeather />}
      {!loading && Object.keys(weather).length > 0 && (
        <>
          <WeatherWidget weather={weather} />
          <ClothingSuggestionForm weather={weather} clothes={clothes} />
        </>
      )}
    </div>
  );
}

export default OutfitPage