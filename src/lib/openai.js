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
  console.log(clothingDescriptions, "clothingDescriptions", weatherCond,'weatherCond', weatherTemp, 'weatherTemp', wind, 'wind', mood, 'mood', eventType, 'eventType',);

  const prompt = `You are a fashion industry expert. Given only the following clothing items "${clothingDescriptions}", please construct 3 different outfit looks (if human doesn't specify or has any other clothes other than mentioned before, please do not make them up or don't come up with different colors that aren't provided, however only if the weather condition are to be considered you can add in parenthesis "suggested"). The person is going to ${eventType} and they are feeling ${mood}. Consider the current weather conditions: ${weatherCond}, with a wind speed of ${wind} km/h and ${weatherTemp}°C. Always return outfits in a structure of order, of top to bottom (attire wise) and attach exact product ids in the same order after each outfit return.`;


  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    max_tokens: 1000,
    temperature: 0.7,
  });
console.log(response.choices[0].text,'response OpenAI');
  return response.choices[0].text
};

export default generateClothingSuggestions;
