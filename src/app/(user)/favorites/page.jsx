import React from "react";
import Heading from "@/components/Heading";
import ViewFavorite from "@/components/ViewFavorite";

const FavoritesPage = () => {
  return (
    <div>
      <Heading title="Favorites" subTitle="View your favorites" />
      <ViewFavorite />
    </div>
  );
};

export default FavoritesPage;
