"use client";

import generateClothingSuggestions from "@/lib/openai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ClothingSuggestionForm = ({ clothes, weather }) => {
  const [eventType, setEventType] = useState("");
  const [mood, setMood] = useState("");
  const [suggestions, setSuggestions] = useState("");
const [outfitsDisplay, setOutfitsDisplay] = useState(null);


  useEffect(() => {
    if (suggestions.length > 0) {
      getUserOutfit().then(setOutfitsDisplay);
    }
  }, [suggestions]);
  const weatherTemp = weather.current.temp_c;
  const weatherCond = weather.current.condition.text;
  const wind = weather.current.wind_kph;
  const { data: session } = useSession();
  const email = session && session.user.email;

  const clothingDescriptions = clothes.map((item) => {
    let description = `${item.colors.join(" with ")} ${item.category}`;
    if (item.pattern) {
      description += ` ${item.pattern}`;
    }

    description += `, ${item._id};`;
    return description;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const suggestions = await generateClothingSuggestions(
      eventType,
      mood,
      weatherTemp,
      weatherCond,
      clothingDescriptions,
      wind
    );

    setSuggestions(suggestions);
  };

  const getUserOutfit = async () => {
    const response = await fetch(`/api/findItemsUser?email=${email}`);
    const userItems = await response.json();
    console.log(userItems, "items");
   const outfitsText = suggestions ? suggestions.split("\n\n") : [];
   console.log(outfitsText, "outfits");
   if (outfitsText) {
  const groupedOutfits = outfitsText.map((outfitText) => {
    // Find all product IDs within the outfit text
    const outfitProductIds = outfitText.match(/\b[\w\d]{24}\b/g);
    console.log(outfitProductIds, "outfitProductIds");
    // Check if outfitProductIds is not null before mapping
    const outfitItems = outfitProductIds
      ? outfitProductIds.map((productId) => {
          return userItems.find((item) => item._id === productId);
        })
      : [];
    // Return the full outfit object with description and items
    return {
      description: outfitText.replace(/\(\w{24}\)/g, "").trim(), // Remove the product IDs from the description
      items: outfitItems,
    };
  });
  return (
    <div>
      {groupedOutfits.map((outfit, index) => (
        <div key={index} className="outfit">
         
          <p>{outfit.description}</p> 
          <div className="items">
            {outfit.items.map((item) => (
              <div key={item._id} className="item">
                <img src={item.photoUrl} alt={item.description} />
                <p>{item._id}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Event Type:
          <input
            type="text"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          />
        </label>
        <label>
          Mood:
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </label>
        <button type="submit">Get Suggestions</button>
      </form>

      {/* {suggestions && <div>{suggestions}</div>} */}
      {outfitsDisplay}
    </div>
  );
};

export default ClothingSuggestionForm;
