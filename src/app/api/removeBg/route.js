import Replicate from "replicate";
import { NextResponse } from "next/server";

export const maxDuration = 15000;
export const runtime = "edge";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export const POST = async (req) => {
  const { file } = await req.json();
  const output = await replicate.run(
    "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1",
    {
      input: {
        image: file,
      },
    }
  );

  return NextResponse.json(output);
}
