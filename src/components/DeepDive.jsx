import React from "react";
import ImageView from "./ImageView";

const DeepDive = () => {
  return (
    <section className="bg-destructive-foreground h-[70hv]">
      <div className="px-10">
        <h2 className="text-3xl md:text-5xl font-bold my-5">Turn your clothes into your style</h2>
        <p className="text-lg text-center md:px-20">
          With StyleSync you can create various outfits, depending on your mood
          and weather. Or if you need fresh new ideas, StyleSync will always be
          in your sync.
        </p>
      </div>
      <div className="px-10">
        <ImageView />
      </div>
    </section>
  );
};

export default DeepDive;
