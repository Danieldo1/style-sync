import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="w-full h-[80vh] bg-gray-200">
      <div className="flex flex-col items-center  justify-center h-full ">
        <div className="mb-3">
          <h1 className="text-3xl md:text-5xl font-bold text-center text1">
            Create your perfect outfit in seconds.
          </h1>
          <p className="text-lg text-center tracking-wide ">
            Join today to explore your new style, brought to you by your
            clothes, suggested by StyleSync.{" "}
          </p>
        </div>
        <div className="mb-3">
          <Button className="mt-3">Get Started</Button>
          or
          <Button className="mt-3">Login</Button>
        </div>
        <p>Trusted by +1400 happy users ★★★★★</p>
        <div className="w-full flex justify-center rounded-lg relative h-full mt-5 -mb-28 md:mb-0">
            
          <Image
            src="/hero.png"
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
