"use client";

import { useSession } from "next-auth/react";
import axios from "axios";

import Heading from "@/components/Heading";
import React, { useState, useEffect } from "react";
import { fetchUserId } from "@/lib/fetchWeatherData";

import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import SubscriptionPlan from "@/components/SubscriptionPlan";

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

 

  if (session) {
    return (
      <div className="w-full h-full flex flex-col ">
        <Heading
          title={`${session.user?.name || session.user?.email.split("@")[0]}`}
          subTitle="Manage your account"
        />
       <SubscriptionPlan isPro={isPro} subscribeUser={subscribeUser} showText={true} />
        <h3 className="text-3xl font-semibold tracking-wide text-center my-5">
          Frequently Asked Questions
        </h3>
        <div className="max-w-md md:max-w-xl mx-auto w-full pb-10">
          <FrequentlyAskedQuestions />
        </div>
      </div>
    );
  }
};

export default DashboardPage;
