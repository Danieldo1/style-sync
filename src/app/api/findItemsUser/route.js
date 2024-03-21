import connectDB from "@/lib/connectDB";
import Item from "@/lib/models/Item";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  await connectDB();
  const email = decodeURIComponent(
    req.url.split("/").pop().split("=").pop()
  );
  // Find the user by email
  const user = await User.findOne({ email: email });
 
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Find items associated with the user's _id
  const items = await Item.find({ ref: user._id }).sort({ createdAt: -1 });

  return NextResponse.json(items);
};