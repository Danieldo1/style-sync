import connectDB from "@/lib/connectDB";
import LikedOutfit from "@/lib/models/LikedOutfit";
import User from "@/lib/models/User";

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