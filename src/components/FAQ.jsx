import React from "react";
import FrequentlyAskedQuestions from "./FrequentlyAskedQuestions";

const FAQ = () => {
  return (
    <section className="w-full h-full pt-10">
      <div className="text-center mb-5 px-5">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-wide">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-lg font-normal mt-3 opacity-50">
          Everything you need to know about the product and billing
        </p>
      </div>
      <div className="px-10 md:px-20 lg:px-40 xl:px-60 2xl:px-80 pb-10">
        <FrequentlyAskedQuestions />
      </div>
    </section>
  );
};

export default FAQ;
