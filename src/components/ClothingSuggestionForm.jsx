"use client";

import generateClothingSuggestions from "@/lib/openai";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { TiHeart } from "react-icons/ti";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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

  const handleRandomize = async () => {
    const suggestions = await generateClothingSuggestions(
      eventType,
      mood,
      weatherTemp,
      weatherCond,
      clothingDescriptions,
      wind,
      false
    );

    setSuggestions(suggestions);
  };

  const handleLikeOutfit = (index, outfitItems, email) => {
    const itemIds = outfitItems.map((item) => item._id);
   
    handleSaveLikedOutfit(itemIds, email);
  };

  const handleSaveLikedOutfit = async (itemIds, email) => {
    try {
      const response = await fetch("/api/saveLikedOutfit?email=" + email + "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemIds }),
      });
       await response.json();
      
      toast({
        title: "Item saved to Favorites",
        description: "Your item has been saved successfully.",
        variant: "success",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to save the item",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
      console.error(error);
    }
  };

  const getUserOutfit = async () => {
    const response = await fetch(`/api/findItemsUser?email=${email}`);
    const userItems = await response.json();

    const outfitsText = suggestions ? suggestions.trim().split(/\n{2,}/) : [];

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
        <div className="flex flex-col -gap-5 mt-5 max-w-3xl mx-auto">
          {groupedOutfits.length > 0 &&
            groupedOutfits.map((outfit, index) => {
              const firstQuoteIndex = outfit.description.indexOf('"') + 1;
              const lastQuoteIndex = outfit.description.lastIndexOf('"');
              const outfitPrefix = outfit.description.substring(
                0,
                firstQuoteIndex
              );

              const outfitName = outfit.description.substring(
                firstQuoteIndex,
                lastQuoteIndex + 1
              );
              const displayInformation = outfitPrefix + outfitName;
              return (
                <div key={index} className="w-full mt-5 relative">
                  <p className="text-xl font-semibold text-center">
                    {displayInformation}
                  </p>
                  <button
                    onClick={() =>
                      handleLikeOutfit(
                        index,
                        outfit.items.filter((item) => item),
                        email
                      )
                    }
                    className="absolute top-10 right-2 p-2 z-[8] rounded-md"
                  >
                    <TiHeart
                      className={`w-8 h-8 hover:text-red-500 transition-all duration-300 ease-in `}
                    />
                  </button>
                  
                  <div className="grid grid-cols-2 justify-self-center -gap-5 bg-secondary rounded-xl p-5">
                    {outfit.items
                      .filter((item) => item)
                      .map((item, itemIndex) => (
                        <div
                          key={item._id + itemIndex}
                          className="relative flex items-center justify-center w-full h-full"
                          style={{
                            transform: `rotate(${item.rotationDegree}deg)`,
                          }}
                        >
                          <img
                            src={item.photoUrl}
                            alt={item.description}
                            className="object-cover h-40 w-40"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
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
              className="bg-transparent h-4 w-44 md:w-60 border-b border-foreground focus:outline-none mx-2"
            />
          </label>

          <label className="text-xl font-semibold">
            {" "}
            I'm feeling
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="bg-transparent h-4 w-48 md:w-60 border-b border-foreground focus:outline-none mx-2"
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
          onClick={handleRandomize}
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
