import { headers } from "next/headers";

export const dynamic = "force-dynamic";


export const GET = async (req) => {
  try {
    // const latLong = await fetch(
    //   `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.GEOAPIFY_API_KEY}`
    // );
    // const data = await latLong.json();
    
    // WORKS ON VERCEL
    const locationLat = headers().get("x-vercel-ip-latitude") || 0;
    const locationLong = headers().get("x-vercel-ip-longitude") || 0;

    const data = { latitude: locationLat, longitude: locationLong };
    
    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching user location:", error);
  }
};
