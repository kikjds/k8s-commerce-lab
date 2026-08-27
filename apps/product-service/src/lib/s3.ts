import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv"
dotenv.config()

const bucketRegion = process.env.BUCKET_REGION || "eu-central-1"
const accessKey = process.env.AWS_ACCESS_KEY || "access_key"
const secretAccessKey = process.env.AWS_SECRET_KEY || "secret_key"

const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    }
})

export default s3Client