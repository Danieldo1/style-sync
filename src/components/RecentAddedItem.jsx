"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { FaTrashCan } from "react-icons/fa6";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { RxRotateCounterClockwise } from "react-icons/rx";

const RecentAddedItem = ({ data, loading, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [items, setItems] = useState(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  const handleDelete = async (itemId) => {
    setIsDialogOpen(false);
    try {
      const response = await fetch(`/api/items?id=${itemId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete(itemId);
        
      } else {
        console.error("Failed to delete the item");
      }
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const updateRotation = async (itemId, rotationDegree) => {
    try {
      const response = await fetch(`/api/items?id=${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rotationDegree }),
      });
      if (response.ok) {
        return true; 
      } else {
        console.error("Failed to update rotation degree");
        return false;
      }
    } catch (error) {
      console.error("Error updating rotation degree:", error);
      return false; 
    }
  };

  const handleRotate = async (itemToRotate) => {
    const newRotationDegree = (itemToRotate.rotationDegree + 90) % 360;

    try {
      const success = await updateRotation(itemToRotate._id, newRotationDegree);
      if (success) {
        // Update the state with the new rotation degree
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemToRotate._id
              ? { ...item, rotationDegree: newRotationDegree }
              : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating rotation degree:", error);
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
    <>
      <div className="w-full h-full justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10  mt-5 ">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => <LoadingSkeleton key={index} />)
          : items.map((item) => (
              <div
                key={`${item._id}-${item.rotationDegree}`}
                className="border relative rounded-lg p-4 m-2 w-64 h-80 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background transition-all duration-300 ease-in"
              >
                <button
                  onClick={() => openDialog(item._id)}
                  className="absolute top-2 right-2 p-2 z-[8] rounded-md  hover:bg-red-700 transition-all duration-300 ease-in"
                >
                  <FaTrashCan />
                </button>
                <div
                  className={`w-full h-56 relative `}
                  style={{ transform: `rotate(${item.rotationDegree}deg)` }}
                >
                  <Image
                    src={item.photoUrl}
                    alt={item.category}
                    fill
                    className={`object-cover mb-2 `}
                  />
                </div>
                <button
                  onClick={() => handleRotate(item)}
                  className="absolute bottom-16 right-2 p-2 z-[8] group hover:bg-slate-500 rounded-md transition-all duration-300 ease-in "
                >
                  <div className="flex items-center gap-2">
                    <p className="md:hidden block  md:group-hover:block">Rotate</p>
                    <RxRotateCounterClockwise className="font-bold" />
                  </div>
                </button>
                <div className="text-xl capitalize">{item.category}</div>
                <div className="text-base capitalize text-ring ">
                  {item.colors.join(", ")}
                </div>
              </div>
            ))}
        <ConfirmDeleteDialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onConfirm={() => handleDelete(selectedItemId)}
          itemDescription={
            data.find((item) => item._id === selectedItemId)?.category
          }
        />
      </div>
      {!loading && data.length === 0 && (
        <div className="w-full h-full flex items-center flex-col justify-center ">
          <h2 className="text-3xl text1 font-bold">Time to add something!</h2>
          <Image
            src="/empty.png"
            alt="empty"
            width={600}
            height={600}
            // className="w-full h-full"
          />
          <p className="text-foreground/70 font-semibold text-lg">
            No items added yet
          </p>
        </div>
      )}
    </>
  );
};

export default RecentAddedItem;
