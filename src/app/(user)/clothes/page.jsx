"use client";

import Heading from "@/components/Heading";
import React, { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RecentAddedItem from "@/components/RecentAddedItem";
import CategoryItems from "@/components/CategoryItems";
import { Button } from "@/components/ui/button";

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
const handleDeleteItem = (deletedItemId) => {
  setData((prevData) => prevData.filter((item) => item._id !== deletedItemId));
};

  return (
    <section className="overflow-y-scroll scrollbar-hide">
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
        <Button
          variant="link"
          onClick={() => setShowRecentlyAdded(true)}
          className={`cursor-pointer text-lg text-foreground font-semibold hover:underline ${
            showRecentlyAdded ? "underline" : "text-foreground/50"
          }`}
        >
          Recently Added
        </Button>
        <Button
          variant="link"
          onClick={() => setShowRecentlyAdded(false)}
          className={`cursor-pointer text-lg text-foreground font-semibold hover:underline ${
            !showRecentlyAdded ? "underline" : "text-foreground/50"
          }`}
        >
          Category
        </Button>
      </div>
      {showRecentlyAdded ? (
        <div className="w-full h-full pb-5">
          <RecentAddedItem
            data={data}
            loading={loading}
            onDelete={handleDeleteItem}
          />
        </div>
      ) : (
        <CategoryItems data={data} loading={loading} onDelete={handleDeleteItem}  />
      )}
    </section>
  );
};

export default ClothesPage;
