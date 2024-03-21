"use client";

import { useSession} from "next-auth/react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading from "@/components/Heading";
import React, {  useState,useEffect } from 'react';
import { fetchUserId } from "@/lib/fetchWeatherData";



const DashboardPage = () => {
const [isPro, setIsPro] = useState(false);
  const { data: session } = useSession();
  const email = session && session.user.email;

  useEffect(() => {
    fetchAndSetUserData();
  }, [email]);

  const fetchAndSetUserData = async () => {
    if (email) {
      try {
        const userData = await fetchUserId(email);
        setIsPro(userData.isPro);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };
 
  const subscribeUser = async () => {
    try {
      const response = await axios.get("/api/payment?email=" + email);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Something went wrong, please try again later");
    }
  };

  const pricingPlans = [
    {
      icon: "💸",
      title: "Free Plan",
      description: "Basic access to the platform",
      features: [
        "Limited 20 uploads",
        "Free for ever",
        "No credit card required",
      ],
      buttonText: "Current Plan",
      buttonClasses: "bg-gray-300 text-gray-700 cursor-not-allowed",
      onClick: null, // No action for the free plan
    },
    {
      icon: "💰",
      title: "Pro Plan",
      description: "Full features for just $10/month",
      features: [
        "Unlimited uploads",
        "Better suggestions",
        "Cancel anytime",
      ],
      buttonText: 'Subscribe Now',
      buttonClasses: "bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white",
      onClick: subscribeUser,
    },
  ];

  if (session) {
    return (
      <div className="w-full h-screen flex flex-col overflow-hidden">
        <Heading
          title={`${session.user?.name}`}
          subTitle="Manage your account"
        />
        {isPro && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold tracking-wide text-center">
              Hey, it seems that you are a Pro member{" "}
            </h2>
            
            <button
              onClick={subscribeUser}
              className="bg-blue-500 mt-5 p-2 max-w-sm mx-auto rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-white"
            >
              Manage Subscription
            </button>
          </div>
        )}
        {!isPro && (
          <div className="flex flex-col md:flex-row md:justify-around md:space-x-4 p-4">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.title}
                className="mb-4 md:mb-0 flex flex-col w-full justify-center items-center max-w-md md:max-w-lg mx-auto "
              >
                <CardHeader>
                  <CardTitle className="text-6xl text-center">
                    {plan.icon}
                  </CardTitle>
                  <CardTitle className="text-2xl font-bold tracking-wide text-center">
                    {plan.title}
                  </CardTitle>
                  <CardDescription className="text-center  text-md">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="-mt-5">
                  <h3 className="text-lg font-bold mb-2">Features:</h3>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>○ {feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <button
                    onClick={plan.onClick}
                    className={`${plan.buttonClasses} rounded py-2 px-4`}
                  >
                    {plan.buttonText}
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default DashboardPage;
