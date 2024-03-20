"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { FaTrashCan } from "react-icons/fa6";
import LoadingFav from "./LoadingFav";
import Link from "next/link";

const ViewFavorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [outfitIdToDelete, setOutfitIdToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const email = session && session.user.email;

  useEffect(() => {
    if (email && email.length > 0) {
      fetchUserFavorites();
    }
  }, [email]);

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch(`/api/saveLikedOutfit?email=${email}`, {
        cache: "no-store",
      });
      const data = await response.json();
      setFavorites(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };
  const openDeleteDialog = (likedOutfitId) => {
    setOutfitIdToDelete(likedOutfitId);
    setIsDeleteDialogOpen(true);
  };
  const onConfirmDelete = async () => {
    if (outfitIdToDelete) {
      await handleDeleteOutfit(outfitIdToDelete);
    }
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteOutfit = async (likedOutfitId) => {
    try {
      const response = await fetch(`/api/saveLikedOutfit`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likedOutfitId }),
        cache: "no-store",
      });

      const result = await response.json();
      if (result.success) {
        setFavorites((prevFavorites) => ({
          ...prevFavorites,
          itemsGroupedByOutfit: Object.fromEntries(
            Object.entries(prevFavorites.itemsGroupedByOutfit).filter(
              ([outfitId, _]) => outfitId !== likedOutfitId
            )
          ),
        }));
      } else {
        console.error("Failed to delete outfit:", result.error);
      }
    } catch (error) {
      console.error("Error deleting outfit:", error);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        {loading === true ? (
          Array(8)
            .fill()
            .map((_, index) => <LoadingFav key={index} />)
        ) : (
          <>
            {favorites && favorites.itemsGroupedByOutfit ? (
              Object.entries(favorites.itemsGroupedByOutfit).map(
                ([outfitId, items], outfitIndex) => (
                  <div
                    key={outfitId}
                    className="bg-secondary my-5 relative rounded-xl p-5"
                  >
                    <div className="grid grid-cols-2 justify-self-center gap-5">
                      {items.map((item, itemIndex) => (
                        <div
                          key={item._id + itemIndex}
                          className="relative flex items-center justify-center w-full h-full"
                          style={{
                            transform: `rotate(${item.rotationDegree}deg)`,
                          }}
                        >
                          <img
                            src={item.photoUrl}
                            alt={item.description}
                            className="object-cover h-40 w-40"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => openDeleteDialog(outfitId)}
                      className="absolute top-2 right-2 p-2 z-[8] rounded-md  hover:bg-red-700 transition-all duration-300 ease-in"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                )
              )
            ) : (
              <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                <p className="text-center text-xl font-semibold">
                  No favorites to display.
                </p>
                <img
                  src="/noFav.png"
                  alt="No favorites"
                  className="object-cover "
                />

                <Link href="/outfit" className="bg-secondary my-5 p-2 px-3 rounded-md border-primary border-[1px] hover:border-secondary hover:bg-primary text-primary hover:text-secondary transition-all duration-300 ease-in">
                  <p className="text-center text-2xl font-semibold">
                    Lets create outfits 
                  </p>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={onConfirmDelete}
        itemDescription=""
      />
    </div>
  );
};

export default ViewFavorite;
