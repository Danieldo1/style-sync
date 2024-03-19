'use client'
import Heading from '@/components/Heading'
import { formatLatLong } from '@/lib';
import React, { useEffect, useState } from 'react'
import WeatherWidget from '@/components/WeatherWidget'
import LoadingWeather from '@/components/LoadingWeather'
import fetchWeatherData from '@/lib/fetchWeatherData';
import ClothingSuggestionForm from '@/components/ClothingSuggestionForm';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { getUserLatLng } from '@/lib/openai';


const OutfitPage = () => {
  const [latLang, setLatLang] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [clothes, setClothes] = useState([]);

   const { data: session } = useSession();
   const email = session && session.user.email;

  useEffect(() => {
    fetchUserLatLong();
  }, []);

    useEffect(() => {
      if (email) {
        getUserItems();
      }
    }, [email]);

  useEffect(() => {
    if (latLang && latLang !== '') {
      getUserWeather();
    }
  }, [latLang]);

  const fetchUserLatLong = async () => {
    try {
      const latLang = await getUserLatLng();
  
     setLatLang(latLang);
  } catch (error) {
    console.error('Error fetching user lat/long:', error);
  }
}
  
  const getUserWeather = async () => {
   // const latLongString = formatLatLong(latLang);
   const latLongString = `${latLang.location.latitude},${latLang.location.longitude}`;
   
    try {
      const response = await fetchWeatherData(latLongString);
      const data = response;
      setWeather(data);
      
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
       setLoading(false);
     } else {
       console.error("Failed to fetch user items");
       setLoading(false);
     }
   } catch (error) {
     console.error("Error fetching user items:", error);
     setLoading(false);
   } 
 };

 const renderClothingSuggestionForm = () => {
   if (clothes.length <= 10) {
     return (
       <div className=" max-w-3xl mx-auto h-[60vh] flex flex-col items-center mt-20">
         <p className="text-2xl font-semibold">Please add more clothes</p>
         <img src="/empty.png" alt="Clothes" className="object-cover " />
         <Link
           href="/clothes"
           className="bg-secondary my-5 p-2 px-3 rounded-md border-primary border-[1px] hover:border-secondary hover:bg-primary text-primary hover:text-secondary transition-all duration-300 ease-in"
         >
           <p className="text-center text-2xl font-semibold">
             Add Clothes
           </p>
         </Link>
       </div>
     );
   } else {
     return <ClothingSuggestionForm weather={weather} clothes={clothes} />;
   }
 };


  return (
    <div className="ml-3">
      <Heading title="Pick an outfit" subTitle="Time to get dressed" />
      {loading && Object.keys(weather).length === 0 && <LoadingWeather />}
      {!loading && Object.keys(weather).length > 0 && (
        <>
          <WeatherWidget weather={weather} />
          {renderClothingSuggestionForm()}
        </>
      )}
    </div>
  );
}

export default OutfitPage