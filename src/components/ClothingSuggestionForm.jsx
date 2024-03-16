"use client";

import generateClothingSuggestions from "@/lib/openai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

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
    
    const outfitsText = suggestions ? suggestions.split("\n\n") : [];
  
    if (outfitsText) {
      const groupedOutfits = outfitsText.map((outfitText) => {
        
      const outfitProductIds = outfitText.match(/[\w\d]{6}/g) || [];
      const outfitItems = outfitProductIds.map((productId) => {
        const productIdLowercase = productId.toLowerCase(); 
        return userItems.find(
          (item) => item._id.toLowerCase() === productIdLowercase
        );
      });
          
        return {
          description: outfitText.replace(/\(([\w\d]{6})\)/g, "").trim(),
          items: outfitItems,
        };
      });
      return (
        <div>
          {groupedOutfits.map((outfit, index) => (
            <div key={index} className="flex flex-col">
              {outfit.description.split(" ").slice(0, 2).join(" ")}
              <div className="flex flex-wrap">
                {outfit.items
                  .filter((item) => item !== null && item !== undefined)
                  .map((item, index) => (
                    <div
                      key={item._id + index}
                      className="relative h-20 w-20"
                      style={{ transform: `rotate(${item.rotationDegree}deg)` }}
                    >
                      <img
                        src={item.photoUrl}
                        alt={item.description}
                        className=" object-cover"
                      />
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
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col ">
        <div className="mb-5 flex flex-col gap-2 lg:flex-row md:max-w-4xl md:mx-auto">
          <label className="text-xl font-semibold">
            I'm going to
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="bg-transparent h-4 w-60 border-b border-foreground focus:outline-none mx-2"
            />
          </label>

          <label className="text-xl font-semibold">
            {" "}
            I'm feeling
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="bg-transparent h-4 w-64 border-b border-foreground focus:outline-none mx-2"
            />
          </label>
        </div>

        <Button
          type="submit"
          className="text-xl font-semibold max-w-xl w-full mx-auto"
        >
          Get Suggestions
        </Button>
      </form>
      <div className="mt-5 flex flex-col items-center">
        <div className="flex items-center gap-2 w-full md:max-w-xl md:mx-auto">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="text-lg font-base px-2">or</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <Button
         onClick={()=>{}} 
          className="text-xl font-semibold mt-5 max-w-xl w-full mx-auto"
        >
          Randomize
        </Button>
      </div>
      {outfitsDisplay}
    </div>
  );
};

export default ClothingSuggestionForm;
