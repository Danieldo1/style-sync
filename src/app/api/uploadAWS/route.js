import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req){

  const myAWSAccessKey = process.env.MY_AWS_ACCESS_KEY;
  const myAWSSecretKey = process.env.MY_AWS_SECRET_KEY;
  const myAWSBucket = process.env.MY_AWS_BUCKET;
  const dataForm = await req.formData()
  if(dataForm.get('file')){
    const file = dataForm.get('file');

    const s3Client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: myAWSAccessKey,
        secretAccessKey: myAWSSecretKey,
      },
    });

    const ext = file.type.split("/")[1];
    const newFile = `${Date.now()}.${ext}`;
    const body = await file.arrayBuffer();

    s3Client.send(new PutObjectCommand({
      Bucket: myAWSBucket,
      Key: newFile,
      Body: body,
      ContentType: file.type,
      ACL: "public-read",
    }))
    return Response.json(`https://${myAWSBucket}.s3.amazonaws.com/${newFile}`);
    }
    return new Response(true)

  }