import React from "react";
import ImageBtn from "./ImageBtn";

const Showcase = () => {
  return (
    <section className="w-full h-1/2 mt-16">
      <h2 className="text-3xl md:text-5xl md:leading-tight font-bold text-center mb-10 px-7">
        With StyleSync, our customers can create the impossible possible
      </h2>

      <ImageBtn />
      <div className="flex flex-col items-center">
        <h4 className="text-lg font-semibold text-muted-foreground ">
          The top rated outfit tool
        </h4>
        <div className="flex flex-row items-center space-y-5 -mt-10">
          <div>
            <img
              src="/googlerev.png"
              alt="google"
              className="w-36 h-36 "
            />
            <p className="text-center font-bold -mt-10">5.0 (218)</p>
          </div>
          <div>
            <img
              src="/badge.png"
              alt="badge"
              className="w-36 h-36"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
