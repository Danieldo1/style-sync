"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
const images = [
  {
    srcPerson: "https://randomuser.me/api/portraits/men/91.jpg",
    text: "StyleSync seamlessly integrates with ASOS's dynamic fashion platform, enhancing our customers' shopping experience with personalized outfit recommendations.",
    name: "Alexander K.",
    position: "Marketing Manager",
    srcCompany: "https://asset.brandfetch.io/idOPDYImH9/idIwnpLX8G.svg",
  },
  {
    srcPerson: "https://randomuser.me/api/portraits/women/24.jpg",
    text: "While StyleSync offers convenient styling suggestions, Chanel's emphasis on timeless elegance may find more resonance through personalized consultations with our in-house stylists.",
    name: "Natalie S.",
    position: "Brand Ambassador ",
    srcCompany: "https://asset.brandfetch.io/idBUm3gJdJ/idLbNKUJUc.svg",
  },
  {
    srcPerson: "https://randomuser.me/api/portraits/men/82.jpg",
    text: "StyleSync's AI-driven outfit suggestions could complement Givenchy's avant-garde designs, offering customers a novel way to explore our collections and express their individuality.",
    name: "Ethan J.",
    position: "Fashion Coordinator",
    srcCompany: "https://asset.brandfetch.io/id_k-6YsoA/idjebPkMI-.svg",
  },
  {
      srcPerson: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "StyleSync presents an intriguing concept, but Nike's focus on performance-driven apparel may align better with innovative features tailored to athletes' needs rather than general styling.",
    name: "Jacob M.",
    position: "Product Developer",
    srcCompany: "https://asset.brandfetch.io/id_0dwKPKT/id8PORLc73.svg",
  },
];

const Review = () => {
  const [selectedText, setSelectedText] = useState(images[0]);
const { theme } = useTheme();

  const handleImageClick = (review) => {
    setSelectedText(review);
  };
  return (
    <section className="bg-border w-full h-[30%] pt-10">
      <div className="h-full w-full">
        <div className="flex flex-col text-center">
          <h3 className="text-2xl md:text-3xl text1 tracking-wide leading-tight px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60">
            {selectedText.text}
          </h3>
          <div className="flex flex-col items-center mt-5 justify-center">
            <img
              src={selectedText.srcPerson}
              alt="placeholder"
              className="w-20 h-20 rounded-full"
            />
            <p className="text-base font-semibold">{selectedText.name}</p>
            <p className="text-base">{selectedText.position}</p>
          </div>
        </div>
        <div className="flex flex-row w-full items-center justify-evenly mt-10 pb-10">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.srcCompany}
              alt="placeholder"
              className={`w-16 h-20 md:w-28 cursor-pointer transition-all delay-300 ease-in-out ${
                selectedText.srcCompany === image.srcCompany
                  ? "scale-110 -translate-y-2"
                  : "opacity-50"
              }
              ${theme === "dark" ? "invert" : ""}
              `}
              onClick={() =>
                handleImageClick({
                  text: image.text,
                  name: image.name,
                  position: image.position,
                  srcCompany: image.srcCompany,
                  srcPerson: image.srcPerson,
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Review;
