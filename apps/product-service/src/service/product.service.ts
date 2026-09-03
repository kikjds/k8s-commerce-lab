import prisma from "../lib/db.js";
import s3Client from "../lib/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto"
import dotenv from "dotenv"
dotenv.config()

const bucketName = process.env.BUCKET_NAME || "bucket_name"

export function fetchActiveProducts() {
    return prisma.product.findMany({where: { isActive: true }, select: { id: true, name: true, price: true, description: true, images: { select: { id: true, url: true } } } })
}

export function getProductById(id: number) {
    return prisma.product.findUnique({ where: {id: id} })
}

export async function createNewProduct(name: string, price: number, description: string, quantity: number, file: Express.Multer.File) {


    const product = await prisma.product.create({
        data: {
            name: name,
            price: price,
            description: description ? description : null,
            quantity: quantity
        },
        select: {
            id: true,
            name: true,
            price: true,
            description: true,
        }
    })


    
    const imageName = `products/${crypto.randomBytes(16).toString('hex')}-${file.originalname}`

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params)

    await s3Client.send(command)

    const image = await prisma.productImage.create({
        data: {
            productId: product.id,
            url: imageName
        }
    })
    
    return {
        ...product,
        images: [ image ]
    }
}

export function updateProductBasedOnId(id: number, name: string, price: number, description: string, quantity: number ) {
    return prisma.product.update({where: {id: id}, data: {
        name: name,
        price: price,
        description: description ? description : null,
        quantity: quantity
    }})
}

export function deleteProductBasedOnId(id: number) {
    return prisma.product.update({where: {id: id}, data: {isActive: false }})
}