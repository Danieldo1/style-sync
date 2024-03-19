import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const POST = async (req) => {
    const file = req.body.file;
    const fileType = req.body.fileType;
    const myAWSAccessKey = process.env.MY_AWS_ACCESS_KEY;
    const myAWSSecretKey = process.env.MY_AWS_SECRET_KEY;
    const myAWSBucket = process.env.MY_AWS_BUCKET;

    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: myAWSAccessKey,
        secretAccessKey: myAWSSecretKey,
      },
    });

    const ext = fileType.split("/")[1];
    const newFile = new Date().getTime() + "." + ext;
    const body = new Blob([file], { type: fileType });

    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: myAWSBucket,
          Key: newFile,
          Body: body,
          ContentType: fileType,
          ACL: "public-read",
        })
      );

      return Response.json({ url: `https://${myAWSBucket}.s3.eu-north-1.amazonaws.com/${newFile}` });
    } catch (error) {
      console.error("Upload to S3 failed:", error);
      return Response.json({ success: false, error });
    }
  
}
