import React from "react";

const BentoBox = () => {
  return (
    <section className="w-[100vw] h-full py-10 ">
      <h2 className="text-3xl md:text-5xl text-center font-bold tracking-wider px-7">
        Turn messy closet into organized outfits
      </h2>
      <div className="grid grid-cols-2 gap-7 px-10 mx-auto mt-7">
        <div className="w-full h-full bg-blue-200 rounded-lg p-5 flex flex-col justify-center text-center items-center text-black">
          <h4 className="text-3xl font-bold mb-3">Be part of our community</h4>
          <p className="text-lg mb-4">
            Get suggestion from AI and discover your next look
          </p>
          <p className="text-md mb-2">Learn more ➫</p>
          <img src="/community.png" alt="placeholder" />
        </div>

        <div className="w-full h-full bg-purple-200 rounded-lg p-5 flex flex-col justify-center text-center items-center text-black">
          <h4 className="text-3xl font-bold mb-3">Join latest trends</h4>
          <p className="text-lg mb-4">
            Find your next look with the latest trends, based of your preferences
          </p>
          <p className="text-md mb-2">Learn more ➫</p>
          <img src="/discover.png" alt="placeholder" />
        </div>

        <div className="w-full h-full bg-amber-200  col-span-2 rounded-lg p-5 flex flex-col justify-center text-center items-center text-black">
          <div className="flex justify-between">
            <div className="w-1/2 flex items-center justify-center flex-col">
              <h4 className="text-3xl font-bold mb-3">
                Turn messy closet into organized
              </h4>
              <p className="text-lg mb-4">
                With hundreds of various ways to organize your clothes and discover new outfits 
              </p>
              <p className="text-md mb-2">Learn more ➫</p>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <img src="/man-find.png" alt="placeholder" />
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default BentoBox;
