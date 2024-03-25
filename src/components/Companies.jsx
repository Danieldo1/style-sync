import React from 'react'
import CarouselLogos from './CarouselLogos';

const Companies = () => {
  return (
    <section className="w-full h-[20vh] bg-gray-400 ">
      <div className="flex justify-center flex-col items-center ">
        <h1 className="text-3xl font-bold mt-10">Trusted Partners</h1>
      </div>
      <div className="mt-5 overflow-hidden">
        <CarouselLogos />
      </div>
    </section>
  );
}

export default Companies