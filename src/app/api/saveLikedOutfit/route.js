import connectDB from "@/lib/connectDB";
import LikedOutfit from "@/lib/models/LikedOutfit";
import User from "@/lib/models/User";
import Item from "@/lib/models/Item";

export const POST = async (req) => {
    const email = req.url.split("/").pop().split("=").pop();
    
    await connectDB();
    const { itemIds } = await req.json();
    try {
        const user = await User.findOne({ email: email });
      await LikedOutfit.create({ user: user._id, items: itemIds });
      return Response.json({ success: true });
    } catch (error) {
      console.log(error);
      return Response.json({ success: false, error });
    }
}

export const DELETE = async (req) => {
  await connectDB();
  const {likedOutfitId} = await req.json();
  try {
    await LikedOutfit.deleteOne({ _id: likedOutfitId });
    return Response.json({ success: true });
  }
  catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
}

export const GET = async (req) => {
    await connectDB();
  const email = req.url.split("/").pop().split("=").pop();
  
  try {
    const user = await User.findOne({ email: email });
    const likedOutfits = await LikedOutfit.find({ user: user._id }).sort({ createdAt: -1 });
   const itemsGroupedByOutfit = {};

   for (const outfit of likedOutfits) {
     const outfitItems = await Item.find({ _id: { $in: outfit.items } })
     itemsGroupedByOutfit[outfit._id] = outfitItems;
   }
    return Response.json({ itemsGroupedByOutfit });
  }
  catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
}