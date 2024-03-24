import React from 'react'
import CarouselLogos from './CarouselLogos';

const Companies = () => {
  return (
    <section className="w-full h-[20vh] bg-gray-400 ">
      <div className="flex justify-center flex-col items-center ">
        <h1 className="text-xl font-bold mt-5">Trusted Partners</h1>
      </div>
      <div className=''>
        <CarouselLogos />
      </div>
    </section>
  );
}

export default Companies