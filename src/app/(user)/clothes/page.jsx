'use client'

import Heading from '@/components/Heading'
import React, { useEffect, useState } from 'react'
import { IoAddCircle } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import RecentAddedItem from '@/components/RecentAddedItem';


const ClothesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecentlyAdded, setShowRecentlyAdded] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const email = session && session.user.email;

  useEffect(() => {
    if (email) {
      getUserItems();
    }
  }, [email]);

  const getUserItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/findItemsUser?email=${email}`);
      if (response.ok) {
        const items = await response.json();
        setData(items);
      } else {
        console.error("Failed to fetch user items");
      }
    } catch (error) {
      console.error("Error fetching user items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Heading title="Clothes" subTitle="Your clothes" />
      <button
        onClick={() => {
          router.push("/clothes/new");
        }}
        className="w-full h-32 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background  border-dashed border-2 rounded-md flex items-center justify-center gap-2 p-3 transition-all duration-300 ease-in outline-none"
      >
        <IoAddCircle className="w-12 h-12" />
        <p className="text-2xl font-bold tracking-wider capitalize">
          Add new clothes
        </p>
      </button>

      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => setShowRecentlyAdded(true)}
          className={`cursor-pointer ${showRecentlyAdded ? "underline" : ""}`}
        >
          Recently added
        </button>
        <button
          onClick={() => setShowRecentlyAdded(false)}
          className={`cursor-pointer ${!showRecentlyAdded ? "underline" : ""}`}
        >
          Category
        </button>
      </div>
      {showRecentlyAdded ? <RecentAddedItem data={data} loading={loading} /> : <CategoryItems />}
    </section>
  );
};

export default ClothesPage