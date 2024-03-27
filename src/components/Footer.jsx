"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const year = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const { toast } = useToast();
  return (
    <section className="w-full h-full bg-border pt-10">
      <div className="text-center mb-5 px-5">
        <h3 className="text-2xl md:text-4xl font-semibold tracking-wide">
          Subscribe to our monthly newsletter
        </h3>
        <p className="text-sm md:text-base font-normal mt-3 opacity-50">
          Get exclusive offers, latest news, and insights sent to your inbox
          every month.
        </p>
        <div className="relative w-full mt-5 max-w-sm mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-10 pl-2 pr-20 border border-gray-300 rounded-full"
          />
          <button
            onClick={() => {
              toast({
                title: "This really does nothing",
                description: "We don't do newsletters but thank you for pressing the button",
                 variant: 'success',
              });
            }}
            className=" bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-300 ease-in delay-100 absolute h-8 top-[3.5px] -right-[33px] w-1/4  rounded-full -p-2 mr-9"
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="border-b-[1px] border-gray-300 mx-10 md:mx-20 lg:mx-40 ">
        <div className="flex items-center justify-between p-5 flex-row">
          <div className="w-[10%] md:w-[50%]">
            <div className="flex flex-row items-center ">
              <Image
                src="/logo2.png"
                alt="Logo"
                width={35}
                height={35}
                className={resolvedTheme === "dark" ? "" : "invert"}
              />
              <p className="text-2xl font-bold text1 -mb-0.5 hidden md:block">
                tyleSync
              </p>
            </div>
          </div>
          <div className="w-3/4 flex items-center justify-between">
            <Button variant="link" className="py-0 px-0 md:text-base">
              <Link href="#home">Home</Link>
            </Button>
            <Button variant="link" className="py-0 px-0 md:text-base">
              <Link href="#pricing">Pricing</Link>
            </Button>
            <Button variant="link" className="py-0 px-0 md:text-base">
              <Link href="#reviews">Reviews</Link>
            </Button>
            <Button
              variant="link"
              className="py-0 px-0 md:text-base"
              onClick={() => {
                signIn("google", { callbackUrl: "/clothes" });
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
      <p className="p-5 text-center">
        © {year} StyleSync. All rights reserved.
      </p>
    </section>
  );
};

export default Footer;
