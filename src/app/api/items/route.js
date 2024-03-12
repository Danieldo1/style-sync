import connectDB from "@/lib/connectDB";
import Item from "@/lib/models/Item";
import User from "@/lib/models/User";


export const POST = async (req) => {
  const { category,colors,pattern,photoUrl,email } = await req.json();
  await connectDB();
  try {
    const user = await User.findOne({ email: email });
    const item = await Item.create({
      category,
      colors,
      pattern,
      photoUrl,
      ref: user._id,
    })
  
    return Response.json({ success: true, item });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
};