'use client';

import React, { useState } from "react";
import Image from "next/image";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { FaTrashCan } from "react-icons/fa6";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";


const RecentAddedItem = ({ data, loading,onDelete }) => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedItemId, setSelectedItemId] = useState(null);

 const handleDelete = async (itemId) => {
   setIsDialogOpen(false);
   try {
     
     const response = await fetch(`/api/items?id=${itemId}`, {
       method: "DELETE",
     });
     if (response.ok) {
       
       onDelete(itemId);
       console.log("Item deleted successfully");
     } else {
       console.error("Failed to delete the item");
     }
   } catch (error) {
     console.error("Error deleting the item:", error);
   }
 };

 const openDialog = (itemId) => {
   setSelectedItemId(itemId);
   setIsDialogOpen(true);
 };

 const closeDialog = () => {
   setIsDialogOpen(false);
 };

  return (
    <div className="w-full h-full justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10  mt-5 ">
      {loading
        ? Array(4)
            .fill()
            .map((_, index) => <LoadingSkeleton key={index} />)
        : data.map((item) => (
            <div
              key={item._id}
              className="border relative rounded-lg p-4 m-2 w-64 h-80 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background transition-all duration-300 ease-in"
            >
              <button
                onClick={() => openDialog(item._id)}
                className="absolute top-2 right-2 p-2 z-[8] rounded-md  hover:bg-red-700 transition-all duration-300 ease-in"
              >
                <FaTrashCan />
              </button>
              <div className="w-full h-56 relative">
                <Image
                  src={item.photoUrl}
                  alt={item.category}
                  fill
                  className=" object-cover mb-2"
                />
              </div>
              <div className="text-xl capitalize">{item.category}</div>
              <div className="text-base capitalize text-ring">
                {item.colors.join(", ")}
              </div>
            </div>
          ))}
      <ConfirmDeleteDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={() => handleDelete(selectedItemId)}
        itemDescription={data.find((item) => item._id === selectedItemId)?.category}
      />
    </div>
  );
};

export default RecentAddedItem;
