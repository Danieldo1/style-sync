import React from "react";

const Usage = () => {
  return (
    <section className="w-full h-1/2 ">
      <div className="flex flex-col items-center justify-center p-5">
        <h2 className="text-3xl md:text-5xl font-bold my-5">How it works</h2>
        <p className="text-lg text-center -mt-5 md:mt-0 md:px-40">
          StyleSync helps you create your perfect outfit,based on your clothes
          we are able to find your perfect outfit
        </p>
      </div>
      <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between p-2 md:p-5 ">
        <div className="flex flex-col items-center w-full  md:w-1/3 md:h-1/3 mx-5 relative">
          <img src="/upload.png" alt="upload" className="w-60 h-60 " />
          <h4 className="text-center text-xl font-semibold mb-2">
            Upload your clothes
          </h4>
          <p className="text-center px-5">
            Our smart bot will crop the background out and you tag the items by
            category or colors
          </p>
          <div className="absolute w-40 h-40 z-[5px] -right-[6rem] -top-[1rem] rotate-180 hidden md:block ">
            <img
              src="/arrow.svg"
              alt="arrow"
              className="w-full h-full scale-x-[-1]"
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full  md:w-1/3 md:h-1/3 mx-5 relative p-2 md:p-0">
          <img src="/find.png" alt="find" className="w-60 h-60 " />
          <h4 className="text-center text-xl font-semibold mb-2">
            Choose your style
          </h4>
          <p className="text-center px-5">
            We can help you create your perfect outfit by getting your local
            weather and where you are going
          </p>
          <div className="absolute w-40 h-40 z-[5px] -right-[6rem] top-[2rem] hidden md:block">
            <img src="/arrow.svg" alt="arrow" className="w-full h-full " />
          </div>
        </div>

        <div className="flex flex-col items-center w-full md:w-1/3 md:h-1/3 mx-5 p-2 md:p-0">
          <img src="/choose.png" alt="choose" className="w-60 h-60 " />
          <h4 className="text-center text-xl font-semibold mb-2">
            Save your favorite
          </h4>
          <p className="text-center px-5">
            StyleSync will purpose 3 outfits to choose from, which you will be
            able to save to your profile
          </p>
        </div>
      </div>
    </section>
  );
};

export default Usage;
