import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BiSolidZap } from "react-icons/bi";
import { GoZap } from "react-icons/go";

const SubscriptionPlan = ({ isPro, subscribeUser }) => {
     const pricingPlans = [
       {
         icon: <GoZap />,
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
         icon: <BiSolidZap />,
         title: "Pro Plan",
         description: "Full features for just $10/month",
         features: [
           "Unlimited uploads",
           "Better suggestions",
           "Cancel anytime",
         ],
         buttonText: "Subscribe Now",
         buttonClasses:
           "bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out text-white",
         onClick: subscribeUser,
       },
     ];
  return (
    <div>
      {isPro && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold tracking-wide text-center">
            Hey,{session.user?.name.split(" ")[0]} it seems that you are a Pro
            user{" "}
          </h2>
          <img src="/prouser.png" alt="user" className="w-80 h-80 " />
          <button
            onClick={subscribeUser}
            className="bg-blue-500 mt-5 p-2 max-w-sm mx-auto rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-white"
          >
            Manage Subscription
          </button>
        </div>
      )}
      {!isPro && (
        <>
          <h3 className="text-3xl font-semibold tracking-wide text-center my-5">
            Pricing Plans
          </h3>
          <div className="flex flex-col md:flex-row md:justify-around md:space-x-4 p-4">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.title}
                className="mb-4 md:mb-0 flex flex-col w-full justify-center items-center max-w-md md:max-w-lg mx-auto "
              >
                <CardHeader>
                  <CardTitle className="text-6xl text-center flex items-center justify-center">
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
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
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
        </>
      )}
    </div>
  );
}

export default SubscriptionPlan