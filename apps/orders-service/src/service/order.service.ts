import prisma from "../lib/db.js";
import { redis } from "../lib/redis.js"

export function fetchOrders() {
    return prisma.order.findMany()
}

export async function createOrder(productId: number, price: number, quantity: number) {
    const order = await prisma.order.create({
        data: { productId, price, quantity }
    })

    await redis.xAdd("order.commands", "*", {
        type: "order.create.requested",
        data: JSON.stringify({ orderId: order.id, productId, quantity })
    })

    return order
}