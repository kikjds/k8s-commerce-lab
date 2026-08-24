import { Request, Response } from "express";
import * as productService from "../Service/product.model.js"

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await productService.fetchActiveProducts()
        
        return res.status(200).json(products)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}