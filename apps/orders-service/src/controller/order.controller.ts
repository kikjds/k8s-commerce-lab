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
