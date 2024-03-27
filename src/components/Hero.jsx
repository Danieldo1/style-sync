
import React from "react";
import Image from "next/image";
import LogInBtn from "./LogInBtn";

const Hero = () => {
  return (
    <section className="w-full h-[80vh] bg-border">
      <div className="flex flex-col items-center  justify-center h-full ">
        <div className="mb-3 mt-3">
          <h1 className="text-3xl md:text-5xl  font-bold text-center text1">
            Create your perfect outfit in seconds.
          </h1>
          <p className="text-lg text-center tracking-wide ">
            Join today to explore your new style, brought to you by your
            clothes, suggested by StyleSync.{" "}
          </p>
        </div>
        <LogInBtn />
        <p>
          Trusted by +1400 happy users{" "}
          <span className="text-yellow-500">★★★★★</span>
        </p>
        <div className="w-full flex justify-center rounded-lg relative h-full mt-2 md:mb-0">
          <div className="absolute w-40 h-40 z-10 right-[11rem] lg:right-[20rem] xl:right-[30rem] -top-[7rem] -rotate-[110deg] hidden md:block">
            <img src="/arrow.svg" alt="arrow" className="w-full h-full " />
          </div>
          <Image
            src="/hero1.png"
            alt="hero"
            fill
            priority={true}
            className=" object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
