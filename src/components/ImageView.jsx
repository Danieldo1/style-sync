'use client'
import React , {useState} from 'react'

const ImageView = () => {
    const [selectedImage, setSelectedImage] = useState("/create.png");

    const images = {
      img1: "/create.png",
      img2: "/suggest.png",
      img3: "/view.png",
    };

    const handleSelect = (imageKey) => {
      setSelectedImage(images[imageKey]);
    };

    const isSelected = (imageKey) => {
      return images[imageKey] === selectedImage;
    };
  return (
    <div className="pb-5">
      <div className="max-w-85% px-5 md:max-w-[70%] lg:max-w-[60%] xl:max-w-[55%] 2xl:max-w-[50%] flex flex-row  justify-center items-center mx-auto">
        <img src={selectedImage} alt="placeholder" className="w-full" />
      </div>
      <div className="flex flex-row justify-between mt-10 px-2 lg:px-20 xl:px-40 2xl:px-60">
        <div
          className={`border-t-4 rounded-tl-md  pt-5 hover:border-purple-400 cursor-pointer p-2 transition-all duration-700 ease-in-out ${
            isSelected("img1") ? "border-purple-400" : "border-gray-400"
          }`}
          onClick={() => handleSelect("img1")}
        >
          <h4 className="text-center font-bold mb-3 tracking-wide">Create</h4>
          <p className="text-center">
            Your uploaded clothes will be accessible to you and can be viewed
            here
          </p>
        </div>
        <div
          className={`border-t-4  pt-5 hover:border-purple-400 cursor-pointer p-2 transition-all duration-700 ease-in-out ${
            isSelected("img2") ? "border-purple-400" : "border-gray-400"
          }`}
          onClick={() => handleSelect("img2")}
        >
          <h4 className="text-center font-bold mb-3 tracking-wide">Suggest</h4>
          <p className="text-center">
            Use our custom AI bot to create your perfect outfits for any
            occasions
          </p>
        </div>
        <div
          className={`border-t-4 pt-5 rounded-tr-md hover:border-purple-400 cursor-pointer p-2 transition-all duration-700 ease-in-out ${
            isSelected("img3") ? "border-purple-400" : "border-gray-400"
          }`}
          onClick={() => handleSelect("img3")}
        >
          <h4 className="text-center font-bold mb-3 tracking-wide">View</h4>
          <p className="text-center">
            You can save your perfect outfits to your profile, to try them out
            later
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImageView