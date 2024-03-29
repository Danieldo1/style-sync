"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import CountUp from "react-countup";
const LogInBtn = () => {
  return (
    <>
      <div className="mb-5 w-full flex justify-center items-center">
        <Button
          onClick={() =>
            signIn(["google", "credentials"], { callbackUrl: "/clothes" })
          }
          className="mr-5"
        >
          Get Started
        </Button>
        <p>or</p>
        <Button
          variant="outline"
          className="ml-5 z-20 cursor-pointer hover:bg-gray-400 hover:text-white transition-all delay-100 ease-in-out"
          onClick={() =>
            signIn(["google", "credentials"], { callbackUrl: "/clothes" })
          }
        >
          Login
        </Button>
      </div>
      <div className="flex flex-row ">
        <p className="mr-1">Trusted by </p>
<div className="h-10 w-14">
        <CountUp
          start={0}
          end={1400}
          duration={5}
          prefix="+ "
      
          enableScrollSpy={true}
          scrollSpyDelay={500}
        />
        </div>
        <p className="ml-1">
          happy users <span className="text-yellow-500">★★★★★</span>
        </p>
      </div>
    </>
  );
};

export default LogInBtn;
