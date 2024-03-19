'use server';

import OpenAI from "openai";


const openaiApiKey = process.env.OPEN_AI_API_KEY;

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});

 const generateClothingSuggestions = async (
   event,
   feeling,
   weatherTemp,
   weatherCond,
   clothingDescriptions,
   wind,
   includeEventAndMood
 ) => {
   
   const prompt = `You are a fashion industry expert. Given the following clothing items "${clothingDescriptions}", construct 3 different suitable and complete outfit looks for a person going to ${
     includeEventAndMood ? event : ""
   }, feeling ${
     includeEventAndMood ? feeling : ""
   }. Each outfit should include one top (like a shirt or blouse), one bottom (like pants or a skirt), and a pair of shoes. Additional accessories or layers can be suggested based on the weather conditions: ${weatherCond}, wind speed of ${wind} km/h, and temperature of ${weatherTemp}°C. Cold temperatures range from -20° to 0°, cooler weather ranges from 0° to 20°, and warm weather ranges from 20° to 40°. Present the outfits in order from top to bottom and list the exact product ids after each outfit description, ensure that there is no space before and after each outfit. Remember to use only the provided clothing items and do not invent new items or colors. Additionally give a catchy name for each outfit with exactly 3 words.`;

   const response = await openai.completions.create({
     model: "gpt-3.5-turbo-instruct",
     prompt,
     max_tokens: 1000,
     temperature: 0.1,
   });

   return response.choices[0].text;
 };

export default generateClothingSuggestions;



export const getUserLatLng = async () => {
  try {
   const response = await fetch(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.GEOAPIFY_API_KEY}`
    );
  return  response.json();
  } catch (error) {
    console.error("Error fetching user location:", error);
  }
};

