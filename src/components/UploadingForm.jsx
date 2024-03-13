"use client";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import {
  colors,
  createOption,
  groupedOptions,
  formatGroupLabel,
} from "@/lib";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

const UploadingForm = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgUpload, setImgUpload] = useState(false);
  const [uploadedImage, setUploadedImage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(colors);
  const [category, setCategory] = useState({});
  const [photoUrl, setPhotoUrl] = useState("");
  const [pattern, setPattern] = useState("");
  const [value, setValue] = useState();

  const [isToggled, setIsToggled] = useState(false);
  const toggleSwitch = () => setIsToggled(!isToggled);

  const {data:session}=useSession()
  const email = session && session.user.email;
 
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
    const imageResponse = await fetch(result);

    const imageBlob = await imageResponse.blob();

    const s3Upload = await uploadAWS(imageBlob);
    
    if (s3Upload.ok) {
      const s3ImageUrl = await s3Upload.json();
      console.log(s3ImageUrl, "s3ImageUrl");
      setPhotoUrl(s3ImageUrl);
    } else {
      console.log("error uploading image");
    }
  };
  const uploadAWS = async (file) => {
    const myAWSAccessKey = process.env.NEXT_PUBLIC_MY_AWS_ACCESS_KEY;
    const myAWSSecretKey = process.env.NEXT_PUBLIC_MY_AWS_SECRET_KEY;
    const myAWSBucket = process.env.NEXT_PUBLIC_MY_AWS_BUCKET;
    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: myAWSAccessKey,
        secretAccessKey: myAWSSecretKey,
      },
    });

    const ext = file.type.split("/")[1];

    const newFIle = new Date().getTime() + "." + ext;

    const body = new Blob([file], { type: file.type });

    s3Client.send(
      new PutObjectCommand({
        Bucket: myAWSBucket,
        Key: newFIle,
        Body: body,
        ContentType: file.type,
        ACL: "public-read",
      })
    );

    return Response.json(`https://${myAWSBucket}.s3.amazonaws.com/${newFIle}`);
  };

const handleCreate = (inputValue) => {
  setIsLoading(true);
  setTimeout(() => {
    const newOption = createOption(inputValue);
    setIsLoading(false);
    setOptions((prevOptions) => [...prevOptions, newOption]);
    // Check if value is already an array and add the new option to it
    setValue((prevValue) => {
      // If prevValue is not an array, make it an array with the single value
      const valueArray = Array.isArray(prevValue)
        ? prevValue
        : prevValue
        ? [prevValue]
        : [];
      return [...valueArray, newOption];
    });
  }, 1000);
};

const handleSelectChange = (newValue) => {
  setCategory(newValue);
}
const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = {
    category: category.value,
    colors: Array.isArray(value) ? value.map((opt) => opt.value) : [],
    pattern: isToggled ? pattern : "",
    photoUrl: photoUrl,
    email:email
  };

  console.log(formData, "formData");

  try {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle success
      console.log("Item saved successfully");
    } else {
      // Handle error
      console.error("Failed to save the item");
    }
  } catch (error) {
    console.error("Error submitting the form", error);
  }
};

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto scrollbar-hide">
      <div className="max-w-md mx-auto  lg:max-w-3xl xl:max-w-5xl h-full  w-full  flex-col lg:justify-between lg:flex-row flex gap-5">
        {!imgUpload && uploadedImage.length === 0 && (
          <div className="w-full h-full flex justify-center items-center ">
            <label
              htmlFor="fileInput"
              className="w-full cursor-pointer h-full bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background border-dashed border-2 rounded-md flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none"
            >
              <input
                id="fileInput"
                type="file"
                accept="image/heic,image/heic-sequence,image/*"
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
          <div className=" w-full h-full  flex justify-center items-center bg-primary-foreground border-dashed border-2 rounded-md gap-2 p-3 transition-all duration-300 ease-in outline-none">
            <div className="aspect-square  w-full h-full  relative rounded-md">
              <Image
                src={uploadedImage}
                alt="clothes"
                fill
                className="object-cover rounded-sm"
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
              <div className="aspect-square w-full h-full relative rounded-md">
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

      <div className="mt-5 py-10">
        <form className="w-full pb-3" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-5">
            <div className="w-full">
              <label>Category</label>
              <Select
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                onChange={handleSelectChange}
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
            <div className="w-full">
              <label>Color</label>
              <CreatableSelect
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={(newValue, actionMeta) => {
                  // If the action is a deselection and it's multi-select, ensure an array is always set
                  if (
                    actionMeta.action === "remove-value" ||
                    actionMeta.action === "clear"
                  ) {
                    setValue(newValue || []);
                  } else {
                    setValue(newValue);
                  }
                }}
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
          <div className="w-full py-10">
            <div className="mt-5 flex flex-col ">
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
              <div className="mt-5 flex flex-col">
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
          <Button type="submit" className="w-full">
            Add Item
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadingForm;