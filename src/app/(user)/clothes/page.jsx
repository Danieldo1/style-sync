'use client'

import Heading from '@/components/Heading'
import React from 'react'
import { IoAddCircle } from "react-icons/io5";
import { useRouter } from 'next/navigation';

const ClothesPage = () => {
  const router = useRouter()
  return (
    <section>
      <Heading title="Clothes" subTitle="Your clothes" />
      <button onClick={() => {router.push('/clothes/new')}} className="w-full h-32 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background  border-dashed border-2 rounded-md flex items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none">
        <IoAddCircle className="w-12 h-12" />
        <p className="text-2xl font-bold tracking-wider capitalize">
          Add new clothes
        </p>
      </button>

      <div className="w-full justify-between flex mt-5">
        <div>Recently added</div>
        <div>Category</div>
      </div>
    </section>
  );
}

export default ClothesPage