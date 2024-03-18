import { Schema, model, models } from "mongoose";

const likedOutfitSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [{ type: String, ref: "Item" }], // Changed from ObjectId to String
  },
  {
    timestamps: true,
  }
);

const LikedOutfit =
  models.LikedOutfit || model("LikedOutfit", likedOutfitSchema);

export default LikedOutfit;
