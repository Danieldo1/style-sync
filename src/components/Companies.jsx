import React from 'react'
import CarouselLogos from './CarouselLogos';

const Companies = () => {
  return (
    <section className="w-full h-[20vh] bg-destructive-foreground ">
      <div className="flex justify-center flex-col items-center ">
        <h1 className="text-xl font-semibold mt-2 md:mt-10 text-[#6B7280]">
          Trusted Partners
        </h1>
      </div>
      <div className="md:mt-5  overflow-hidden">
        <CarouselLogos />
      </div>
    </section>
  );
}

export default Companies