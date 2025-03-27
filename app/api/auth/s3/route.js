import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from 'next/server';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});


export async function GET(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");
    const fileType = searchParams.get("fileType");
    const userId = searchParams.get("userId");

    if (!fileName || !fileType || !userId) {
      console.error("Missing required query params:", { fileName, fileType, userId });
      return NextResponse.json({ error: "Missing fileName, fileType, or userId" }, { status: 400 });
    }

    const filePath = `pm_yoga/users/${fileName}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: filePath,
      ContentType: fileType,
    };
    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 180 });
    console.log("uploadUrl", uploadUrl)
    return NextResponse.json({ uploadUrl }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}