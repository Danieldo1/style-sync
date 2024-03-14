import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateClothingSuggestions = async (
  category,
  colors,
  pattern,
  weather
) => {
  const prompt = `You are a fashion industry expert. Given the category "${category}", colors "${colors.join(
    ", "
  )}", and pattern "${pattern}", please construct 3 different outfit looks. Consider the current weather conditions: ${
    weather.weather[0].description
  } and ${weather.main.temp}°C.`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1000,
    temperature: 0.7,
  });

  return response.data.choices[0].text.trim();
};

export default generateClothingSuggestions;
