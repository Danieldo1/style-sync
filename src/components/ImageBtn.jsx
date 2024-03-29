"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageBtn = () => {
  const [currentImage, setCurrentImage] = useState("/reviews/user.png");
  const images = {
    Users: "/reviews/user.png",
    Followers: "/reviews/com.png",
    Retailers: "/reviews/own.png",
    Bloggers: "/reviews/infl.png",
    Schools: "/reviews/brand.png",
    Consultants: "/reviews/cons.png",
  };
  const isSelected = (imagePath) => currentImage === imagePath;
  return (
    <div className="flex flex-col w-full justify-center items-center my-5 ">
      <div className="flex justify-start md:justify-center items-center flex-row w-full mx-10 mb-5 overflow-auto scrollbar-hide">
        {Object.entries(images).map(([key, imagePath]) => (
          <button
            className={`p-2 md:p-3 border-border border-[1px] font-medium tracking-wide rounded-lg mx-1 md:mx-3  ${
              isSelected(imagePath)
                ? "bg-foreground text-background "
                : "bg-secondary text-foreground hover:bg-background hover:text-foreground/70 transition-all duration-300 ease-in-out"
            }`}
            onClick={() => setCurrentImage(imagePath)}
            key={key}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex flex-row w-[98%] md:w-[65%]  justify-center items-center mx-auto">
        <img src={currentImage} alt="display" className="w-full" />
      </div>
    </div>
  );
};

export default ImageBtn;
