import { Request, Response } from "express";
import * as productService from "../service/product.service.js"

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await productService.fetchActiveProducts()
        
        return res.status(200).json(products)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function getSpecificProduct(req: Request, res: Response) {
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({ message: "Id not provided" })
        const product = await productService.getProductById(Number(id))
        return res.status(200).json(product)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function createProduct(req: Request, res: Response) {
    try {
        const { name, description, price } = req.body
        if(!name || !price) {
            return res.status(400).json({ message: "Not enough data" })
        }
        const product = await productService.createNewProduct(name, Number(price), description)
        return res.status(201).json(product)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function updateProduct(req:Request, res: Response) {
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({ message: "Id not provided" })
        const { name, description, price } = req.body
        if(!name || !price) {
            return res.status(400).json({ message: "Not enough data" })
        }
        await productService.updateProductBasedOnId(Number(id), name, Number(price), description)
        return res.sendStatus(204)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function deleteProduct(req:Request, res:Response) {
    try {
        const id = req.params.id
        if(!id) return res.status(400).json({ message: "Id not provided" })
        await productService.deleteProductBasedOnId(Number(id))
        return res.sendStatus(204)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}