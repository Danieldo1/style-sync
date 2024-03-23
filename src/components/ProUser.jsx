"use client";

import React, { useState, useEffect , useRef} from "react";
import { Progress } from "@/components/ui/progress";
import { getCount } from "@/lib/fetchWeatherData";
import { Button } from "./ui/button";
import { LuZap } from "react-icons/lu";
import Link from "next/link";
import {useAtom} from 'jotai'
import { countAtom,incrementAtomCount,decrementAtomCount } from "@/lib/atomStore";

const ProUser = ({ email,loading }) => {

    const [count, setCount] = useAtom(countAtom);

  useEffect(() => {
    if (email) {
        fetchAndSetCount();
    }
}, [email,setCount]);
  
const fetchAndSetCount = async () => {
  const fetchedCount = await getCount(email); 
 setCount(fetchedCount);
};


 const progressPercentage = (count / 20) * 100;

  return (
    <>
      {loading === true ? (
        <div className=" rounded-lg  w-full animate-pulse">
          <div className="bg-gray-300 h-5 w-1/2 mb-4 mx-auto"></div>{" "}
          <div className="bg-gray-300 h-6 w-full rounded-full mb-2 "></div>{" "}
          <div className="bg-gray-300 h-10 w-full rounded-md mt-2"></div>{" "}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="font-semibold mb-2">Items Uploaded</h2>
          <div className="relative w-full items-center flex mb-2">
            <Progress value={progressPercentage} className="h-6 " />
            <p className="text-muted-foreground absolute text-center top-[0px] left-0 right-0 bottom-0">
              {count}/20
            </p>
          </div>
          <Link href="/dashboard" className="w-full">
            <Button
              className={`w-full mt-2 flex flex-row justify-center ${
                count <= 15 ? "" : "animate-pulse"
              } `}
            >
              <LuZap className="w-6 h-6 mr-2" />
              Upgrade
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ProUser;
