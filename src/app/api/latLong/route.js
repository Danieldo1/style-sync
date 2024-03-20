import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export const GET = async (req) => {
  try {
    // const latLong = await fetch(
    //   `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.GEOAPIFY_API_KEY}`
    // );
    // const data = await latLong.json();
    const locationLat = headers().get("x-vercel-ip-latitude") || 0;
    const locationLong = headers().get("x-vercel-ip-longitude") || 0;
console.log(locationLat,locationLong,'lat long')
    const data = { latitude: locationLat, longitude: locationLong };
    console.log(data, "dataLocation");
    return Response.json({ data });
  } catch (error) {
    console.error("Error fetching user location:", error);
  }
};
