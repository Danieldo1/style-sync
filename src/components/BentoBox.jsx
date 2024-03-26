import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const BentoBox = () => {
  return (
    <section className="w-[100vw] h-full py-10 ">
      <h2 className="text-3xl md:text-5xl text-center font-bold tracking-wider px-7">
        Turn messy closet into organized outfits
      </h2>

      <div className="grid grid-cols-2 justify-self-center justify-items-center gap-2 md:gap-7 px-2 md:px-10 lg:px-20 xl:px-40 2xl:px-60 mx-auto mt-7 ">
        <div className="w-full h-full md:h-96 md:w-96 bg-blue-200 rounded-lg p-5 flex flex-col justify-between text-center items-center text-black">
          <h4 className="text-lg md:text-3xl font-bold mb-3">
            Be part of our community
          </h4>
          <p className="text-base md:text-lg mb-4">
            Get suggestion from AI and discover your next look
          </p>
          <div className="flex  flex-row items-center">
            <p className="text-sm md:text-base mr-2">Learn more</p>
            <FaArrowAltCircleRight />
          </div>
          <img src="/community.png" alt="placeholder" />
        </div>

        <div className="w-full h-full md:h-96 md:w-96 overflow-hidden bg-purple-200 rounded-lg p-5 flex flex-col justify-between text-center items-center text-black">
          <h4 className="text-lg md:text-3xl font-bold mb-3">
            Join latest trends
          </h4>
          <p className="text-base md:text-lg mb-4">
            Find your next look with the latest trends, based of your
            preferences
          </p>
          <div className="flex  flex-row items-center">
            <p className="text-sm md:text-base mr-2">Learn more</p>
            <FaArrowAltCircleRight />
          </div>
          <img
            src="/discover.png"
            alt="placeholder"
            className="md:hidden"
          />
          <div className="w-1/2 hidden md:flex items-center justify-center">
            <img
              src="/discover.png"
              alt="placeholder"
              className="object-cover w-96 h-full"
            />
          </div>
        </div>

        <div className="w-full h-full bg-amber-200 md:h-96 overflow-hidden col-span-2 rounded-lg p-5 flex flex-col justify-center text-center items-center text-black">
          <div className="flex justify-between">
            <div className="w-1/2 flex items-center justify-center flex-col">
              <h4 className="text-lg md:text-3xl font-bold mb-3">
                Turn messy closet into organized
              </h4>
              <p className="text-base md:text-lg mb-4">
                With hundreds of various ways to organize your clothes and
                discover new outfits
              </p>
              <div className="flex  flex-row items-center">
                <p className="text-sm md:text-base mr-2">Learn more</p>
                <FaArrowAltCircleRight />
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <img
                src="/man-find.png"
                alt="placeholder"
                className="object-cover w-64 h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoBox;
