import React from "react";
import ImageBtn from "./ImageBtn";

const Showcase = () => {
  return (
    <section className="w-full h-1/2 mt-16">
      <h2 className="text-3xl md:text-5xl md:leading-loose font-bold text-center mb-10 px-7">
        With StyleSync, our customers can create the impossible possible
      </h2>

      <ImageBtn />
      <div className="flex flex-col items-center">
        <h4 className="text-lg font-semibold text-muted-foreground ">The top rated outfit tool</h4>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
