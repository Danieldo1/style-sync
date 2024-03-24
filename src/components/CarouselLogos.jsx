"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const images = [
    "/comp/adidas.svg",
    "/comp/boss.svg",
    "/comp/burberry.svg",
    "/comp/converse.svg",
    "/comp/dolce.svg",
    "/comp/gucci.svg",
    "/comp/hm.svg",
    "/comp/hermes.svg",
    "/comp/jordan.svg",
    "/comp/nike.svg",
    "/comp/newbalance.svg",
    "/comp/puma.svg",
    "/comp/prada.svg",
    "/comp/reebok.svg",
    "/comp/rayban.svg",
    "/comp/supreme.svg",
    "/comp/tnf.svg",
    "/comp/vans.svg",
    "/comp/zara.svg",
    "/comp/forbes.svg",
    "/comp/google.svg",
    "/comp/mastercard.svg",
    "/comp/visa.svg",
]

const settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 6,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
  autoplaySpeed: 50,
  pauseOnHover: true,
};

const CarouselLogos = () => {
 
 return (
   <Slider {...settings}>
     {images.map((image, index) => (
       <div key={index}>
         <img src={image} alt={`Slide ${index + 1}`} className="w-20 h-20" />
       </div>
     ))}
   </Slider>
 );
};

export default CarouselLogos;