import connectDB from "@/lib/connectDB";
import Item from "@/lib/models/Item";
import User from "@/lib/models/User";
const crypto = require("crypto");

async function generateUniqueShortId(length) {
  let isUnique = false;
  let shortId;

  while (!isUnique) {
    // Generate a short ID
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    shortId = randomBytes.toString("hex").slice(0, length);

    // Check if the generated ID already exists in the database
    const existingItem = await Item.findOne({ _id: shortId });

    // If the ID doesn't exist, set isUnique to true and exit the loop
    if (!existingItem) {
      isUnique = true;
    }
  }

  return shortId;
}
export const dynamic = "force-dynamic";
export const POST = async (req) => {
  const { category,colors,pattern,photoUrl,email } = await req.json();
  await connectDB();
  try {
    const shortId = await generateUniqueShortId(6);
    const user = await User.findOne({ email: email });
    const item = await Item.create({
      _id: shortId,
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

export const PATCH = async (req) => {
  const id = req.url.split("=").pop();
  const { rotationDegree } = await req.json();

  await connectDB();
  try {
    await Item.updateOne({ _id: id }, { rotationDegree });
    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, error });
  }
}