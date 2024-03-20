import connectDB from "@/lib/connectDB";
import Item from "@/lib/models/Item";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const GET = async (req) => {
  await connectDB();
  const email = req.url.split("/").pop().split("=").pop();

  // Find the user by email
  const user = await User.findOne({ email: email });

  if (!user) {
    // If user not found, return an empty array
    return NextResponse.json([]);
  }

  // Find items associated with the user's _id
  const items = await Item.find({ ref: user._id }).sort({ createdAt: -1 });

  return NextResponse.json(items);
};