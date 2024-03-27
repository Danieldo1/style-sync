"use client";
import React from "react";
import SubscriptionPlan from "./SubscriptionPlan";

import {  signIn, } from "next-auth/react";
const PricingCards = () => {
    
  return (
    <section className="w-full h-full pt-10">
      <div className="text-center mb-5 px-5">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-wide">
          Simple Pricing,
          <br />
          Powerful Features
        </h2>
        <p className="text-base md:text-lg font-normal mt-3 opacity-50">
          Simple, transparent pricing.Try free and explore the features that
          matter most.
        </p>
      </div>
      <div className="flex w-full flex-col md:flex-row md:justify-around md:items-stretch p-8">
        <SubscriptionPlan
          isPro={false}
          subscribeUser={() => {
            signIn("google", { callbackUrl: "/dashboard" });
          }}
          showText={false}
        />
      </div>
    </section>
  );
};

export default PricingCards;
