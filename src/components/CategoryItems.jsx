"use client";

import React, { useState } from "react";
import Image from "next/image";
import { groupedOptions } from "@/lib";
import { FaTrashCan } from "react-icons/fa6";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const CategoryItems = ({ data, onDelete }) => {
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
    <div className="">
      {data.length > 0 &&
        groupedOptions.map((group) => (
          <div key={group.label}>
            <h2 className="text-xl font-bold mb-2 ml-4">{group.label}</h2>
            <div className="flex flex-nowrap gap-5 overflow-x-auto snap-mandatory snap-x scrollbar-hide">
              {data
                .filter((item) =>
                  group.options.some(
                    (opt) =>
                      opt.value ===
                      item.category.toLowerCase().replace(/\W/g, "")
                  )
                )
                .map((item) => (
                  <div
                    key={item._id}
                    className="border relative snap-center cursor-pointer rounded-lg  p-4 my-2 min-w-64 h-80 bg-primary-foreground hover:bg-muted-foreground hover:text-background hover:border-background transition-all duration-300 ease-in"
                  >
                    <button
                      onClick={() => openDialog(item._id)}
                      className="absolute top-2 right-2 p-2 z-[8] rounded-md  hover:bg-red-700 transition-all duration-300 ease-in"
                    >
                      <FaTrashCan />
                    </button>
                    <div
                      className="w-full h-56 relative "
                      style={{ transform: `rotate(${item.rotationDegree}deg)` }}
                    >
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
                itemDescription={
                  data.find((item) => item._id === selectedItemId)?.category
                }
              />
            </div>
          </div>
        ))}
      {data.length === 0 && (
        <div className="w-full h-full mt-5 flex items-center flex-col justify-center ">
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
    </div>
  );
};

export default CategoryItems;
