import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="w-full h-[70vh] bg-gray-200">
      <div className="flex flex-col items-center  justify-center h-full pt-5">
        <h1 className="text-3xl md:text-5xl font-bold text-center text1">
          Create your perfect outfit in seconds.
        </h1>
        <p className="text-lg text-center tracking-wide ">
          Join today to explore your new style, brought to you by your clothes,
          suggested by StyleSync.{" "}
        </p>
        <Button className="mt-5">Get Started</Button>
        or
        <Button className="mt-5">Login</Button>
        <p>Trusted by +1400 happy users  ★★★★★</p>
        <div className="w-full flex justify-center rounded-lg relative h-full mt-5">
          <Image
            src="/hero.png"
            alt="hero"
            fill
            className=" object-contain rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
