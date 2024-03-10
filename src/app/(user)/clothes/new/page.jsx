'use client'

import Heading from '@/components/Heading'
import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";
import Image from 'next/image'
import axios from 'axios'

const AddNewClothesPage = () => {
const [image, setImage] = useState('')

  const grabImage = () => {
    const imageInput = document.querySelector('input[type="file"]')
    imageInput.click()
    imageInput.onchange = () => {
      const file = imageInput.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // reader.onload = () => {
      //   setImage(reader.result)
      // }

      const form = new FormData();
      form.append("providers", "api4ai");
      form.append("file", file )
      form.append("fallback_providers", "");

      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/image/background_removal",
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_API4AI_KEY}`,
          "Content-Type": "multipart/form-data; boundary=" + form._boundary,
        },
        data: form,
      };
      console.log(options, 'options')
      axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        setImage(response.data.api4ai.image_resource_url);
      })
      .catch((error) => {
        console.error(error);
      })

    }
  }
  return (
    <section className="w-full h-screen">
      <Heading title="Clothes" subTitle="Add new clothes" />
      <div className="w-full h-[25%] flex-col md:justify-between md:flex-row flex gap-5">
        <div className="w-full h-full flex justify-center items-center">
          <button
            onClick={() => grabImage()}
            className="w-full h-full bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background  border-dashed border-2 rounded-md flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none"
          >
            <input type="file" className="hidden" />
            <FiUpload className="w-12 h-12" />
            <p className="text-2xl font-bold tracking-wider capitalize">
              Upload image
            </p>
          </button>
        </div>
        <div className="w-full h-full flex justify-center items-center bg-primary-foreground border-dashed border-2 rounded-md gap-2 p-3 transition-all duration-300 ease-in outline-none">
          <div className="w-full h-full relative rounded-md">
            <Image src={image} alt="clothes" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddNewClothesPage