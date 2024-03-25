'use client'
import React , {useState} from 'react'

const ImageView = () => {
    const [selectedImage, setSelectedImage] = useState("/placeholder.png");

    const images = {
      img1: "/image1.png",
      img2: "/image2.png",
      img3: "/image3.png",
    };

    const handleSelect = (imageKey) => {
      setSelectedImage(images[imageKey]);
    };

    const isSelected = (imageKey) => {
      return images[imageKey] === selectedImage;
    };
  return (
    <div>
      <img src={selectedImage} alt="placeholder" className="w-full h-full" />
      <div className="flex flex-row justify-between">
        <div
          className={`border-t-2 ${
            isSelected("img1") ? "border-purple-400" : "border-gray-400"
          }`}
          onClick={() => handleSelect("img1")}
        >
          <h4>Gather</h4>
          <p>Your clothes will be uploaded and can be viewed here</p>
        </div>
        <div
          className={`border-t-2 ${
            isSelected("img2") ? "border-purple-400" : "border-gray-400"
          }`}
          onClick={() => handleSelect("img2")}
        >
          <h4>Gather</h4>
          <p>Your clothes will be uploaded and can be viewed here</p>
        </div>
        <div
          className={`border-t-2 ${
            isSelected("img3") ? "border-purple-400" : "border-gray-400"
          }`}
          onClick={() => handleSelect("img3")}
        >
          <h4>Gather</h4>
          <p>Your clothes will be uploaded and can be viewed here</p>
        </div>
      </div>
    </div>
  );
}

export default ImageView