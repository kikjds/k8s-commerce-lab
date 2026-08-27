import prisma from "../lib/db.js";
import s3Client from "../lib/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv"
dotenv.config()

const bucketName = process.env.BUCKET_NAME || "bucket_name"

export function fetchActiveProducts() {
    return prisma.product.findMany({where: { isActive: true }, select: { name: true, price: true, description: true } })
}

export function getProductById(id: number) {
    return prisma.product.findUnique({ where: {id: id} })
}

export async function createNewProduct(name: string, price: number, description: string, file: Express.Multer.File) {

    const params = {
        Bucket: bucketName,
        Key: `${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params)

    await s3Client.send(command)

    const product = prisma.product.create({
        data: {
            name: name,
            price: price,
            description: description ? description : null
        }
    })

    return product
}

export function updateProductBasedOnId(id: number, name: string, price: number, description: string ) {
    return prisma.product.update({where: {id: id}, data: {
        name: name,
        price: price,
        description: description ? description : null
    }})
}

export function deleteProductBasedOnId(id: number) {
    return prisma.product.update({where: {id: id}, data: {isActive: false }})
}