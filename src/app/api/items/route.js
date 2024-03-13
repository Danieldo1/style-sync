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

export const DELETE = async (req) => {
 const id = req.url.split("=").pop();
  await connectDB();
  try {
    await Item.deleteOne({ _id: id });
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
}