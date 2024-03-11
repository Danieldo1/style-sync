"use client";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";

import CreatableSelect from "react-select/creatable";
import { colors, createOption } from "@/lib";
// import { makePredictionWithFile } from "@/lib/handleUploadFile.action";

const UploadingForm = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUpload, setImgUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(colors);
  const [pattern, setPattern] = useState("");
  const [value, setValue] = useState();

  const [isToggled, setIsToggled] = useState(false);
  const toggleSwitch = () => setIsToggled(!isToggled);

  const grabImage = async (event) => {
      const imageInput = document.querySelector('input[type="file"]');
      setImgUpload(true);
      const file = imageInput.files[0];
      const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=60000&key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    const UploadedImg = data.data.url;
    setUploadedImage(UploadedImg);
    setImgUpload(false);
    setLoading(true);
    const res = await fetch("/api/removeBg", {
      method: "POST",
      body: JSON.stringify({
        file: UploadedImg,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    setImage(result);
    setLoading(false);
  };

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  return (
    <>
      <div className="w-full h-[25%] flex-col md:justify-between md:flex-row flex gap-5">
        {!imgUpload && uploadedImage.length === 0 && (
          <div className="w-full h-full flex justify-center items-center ">
            <label
              htmlFor="fileInput"
              className="w-full cursor-pointer h-full bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background border-dashed border-2 rounded-md flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none"
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={grabImage}
              />
              <FiUpload className="w-12 h-12" />
              <p className="text-2xl font-bold tracking-wider capitalize">
                Upload image
              </p>
            </label>
          </div>
        )}

        {imgUpload && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-full h-full bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background border-dashed border-2 rounded-md flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none">
              <span className="loader"></span>
              Loading...
            </div>
          </div>
        )}

        {!imgUpload && uploadedImage.length > 0 && (
          <div className="w-full h-full flex justify-center items-center bg-primary-foreground border-dashed border-2 rounded-md gap-2 p-3 transition-all duration-300 ease-in outline-none">
            <div className="w-full h-full relative rounded-md">
              <Image
                src={uploadedImage}
                alt="clothes"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        {uploadedImage.length > 0 ? (
          loading === true ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full h-full bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background  border-dashed border-2 rounded-md flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none">
                <span className="loader"></span>
                Loading...
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center bg-primary-foreground border-dashed border-2 rounded-md gap-2 p-3 transition-all duration-300 ease-in outline-none">
              <div className="w-full h-full relative rounded-md">
                <Image
                  src={image}
                  alt="clothes"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )
        ) : null}
      </div>
      <div className="mt-5">
        <form className="w-full ">
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-5">
            <div className="w-full">
              <label>Category</label>
            </div>
            <div className="w-full">
              <label>Color</label>
              <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
                options={options}
                value={value}
                isMulti
                theme={(theme) => ({
                  ...theme,

                  colors: {
                    ...theme.colors,
                    primary25: "#f0f0f0",
                    neutral5: "#fff",
                    neutral90: "#f0f0f0",
                  },
                })}
                className="text-gray-900"
              />
            </div>
          </div>
          <div>
            <div className="mt-5 flex flex-col">
              <label className="mb-2">Patterns or Design</label>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isToggled}
                  onChange={toggleSwitch}
                />
                <span className="slider"></span>
              </label>
            </div>
            {isToggled && (
              <div className="mt-5">
                <label>Describe it</label>
                <input
                  placeholder="Stripped lines on the bottom"
                  type="text"
                  autoComplete={"off"}
                  className="w-full rounded-md p-2 bg-background border  border-popover-foreground"
                  onChange={(e) => setPattern(e.target.value)}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadingForm;
