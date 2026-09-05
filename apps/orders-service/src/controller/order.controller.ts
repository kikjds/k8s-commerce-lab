import { Request, Response } from "express"
import * as orderService from "../service/order.service.js"

export async function getOrder(req:Request, res: Response) {
    try {
        const orders = await orderService.fetchOrders()

        return res.status(200).json(orders)
    } catch (err) {
        console.error(err)
    }
}

export async function createOrder(req: Request, res: Response) {
    try {
        const { productId, price, quantity } = req.body

        if(!productId || !price || !quantity) {
            return res.status(400).json({ message: "Not enough data" })
        }

        const order = await orderService.createOrder(Number(productId), Number(price), Number(quantity))
        return res.status(202).json(order)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}
