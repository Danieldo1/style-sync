'use client'

import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react'
import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import { FaTrashCan } from "react-icons/fa6";

const ViewFavorite = () => {
    const [favorites, setFavorites] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [outfitIdToDelete, setOutfitIdToDelete] = useState(null);

    const { data: session } = useSession();
    const email = session && session.user.email;

    useEffect(() => {
        if(email && email.length > 0) {
            fetchUserFavorites();
        }
    }, [email]);

    const fetchUserFavorites = async () => {
        try {
            const response = await fetch(`/api/saveLikedOutfit?email=${email}`);
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching user favorites:', error);
        }
    }
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
        {favorites && favorites.itemsGroupedByOutfit ? (
          Object.entries(favorites.itemsGroupedByOutfit).map(
            ([outfitId, items], outfitIndex) => (
              <div key={outfitId} className="bg-secondary my-5 relative rounded-xl p-5">
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
          <p>No favorites to display.</p>
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
}

export default ViewFavorite