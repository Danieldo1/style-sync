export const dynamic = "force-dynamic";
export const GET = async (req) => {
      try {
       const latLong= await fetch(
          `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.GEOAPIFY_API_KEY}`
        );
        const data = await latLong.json();
        
        return Response.json({ data });
        
      } catch (error) {
        console.error("Error fetching user location:", error);
      }

}