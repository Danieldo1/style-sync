import OpenAI from "openai";

const openaiApiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true,
});

const generateClothingSuggestions = async (
  eventType,
  mood,
  weatherTemp,
  weatherCond,
  clothingDescriptions, 
  wind,

) => {
  

  // const prompt = `You are a fashion industry expert. Given only the following clothing items "${clothingDescriptions}", please construct 3 different outfit looks (if human doesn't specify or has any other clothes other than mentioned before, please do not make them up or don't come up with different colors that aren't provided, however only if the weather condition are to be considered you can add in parenthesis "suggested"). The person is going to ${eventType} and they are feeling ${mood}. Consider the current weather conditions: ${weatherCond}, with a wind speed of ${wind} km/h and ${weatherTemp}°C. Always return outfits in a structure of order, of top to bottom (attire wise) and attach exact product ids in the same order after each outfit return.`;
  const prompt = `You are a fashion industry expert. Given the following clothing items "${clothingDescriptions}", construct 3 different suitable and complete outfit looks for a person going to ${eventType}, feeling ${mood}. Each outfit should include one top (like a shirt or blouse), one bottom (like pants or a skirt), and a pair of shoes. Additional accessories or layers can be suggested based on the weather conditions: ${weatherCond}, wind speed of ${wind} km/h, and temperature of ${weatherTemp}°C. Cold temperatures range from -20° to 0°, cooler weather ranges from 0° to 20°, and warm weather ranges from 20° to 40°. Present the outfits in order from top to bottom and list the exact product ids after each outfit description. Remember to use only the provided clothing items and do not invent new items or colors. Additionally give a catchy name for each outfit with exactly 3 words. Ensure that there is no space before and after each outfit.`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    max_tokens: 1000,
    temperature: 0.2,
  });
console.log(response.choices[0].text,'response OpenAI');
  return response.choices[0].text
};

export default generateClothingSuggestions;
