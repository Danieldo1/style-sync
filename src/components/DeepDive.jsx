import React from "react";
import ImageView from "./ImageView";

const DeepDive = () => {
  return (
    <section className="bg-border h-[70hv] pt-5">
      <div className="">
        <h2 className="text-3xl md:text-5xl font-bold my-5 text-center px-7">
          Turn your clothes into your style
        </h2>
        <p className="text-lg text-center px-10 md:px-20 mb-7">
          With StyleSync you can create various outfits, depending on your mood
          and weather. Or if you need fresh new ideas, StyleSync will always be
          in your sync.
        </p>
      </div>
      <div className="">
        <ImageView />
      </div>
    </section>
  );
};

export default DeepDive;
