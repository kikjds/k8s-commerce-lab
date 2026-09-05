import prisma from "../lib/db.js"
import { redis } from "../lib/redis.js"

const stream = "order.commands"
const group = "product-service"
const consumer = `${group}-${process.pid}`

type CreateOrderCommand = {
    orderId: number
    productId: number
    quantity: number
}

async function ensureGroup() {
    try {
        await redis.xGroupCreate(stream, group, "0", { MKSTREAM: true })
    } catch (err) {
        if (!(err instanceof Error) || !err.message.includes("BUSYGROUP")) {
            throw err
        }
    }
}

async function processCommand(data: string) {
    const command = JSON.parse(data) as CreateOrderCommand
    const result = await prisma.product.updateMany({
        where: {
            id: command.productId,
            isActive: true,
            quantity: { gte: command.quantity }
        },
        data: {
            quantity: { decrement: command.quantity }
        }
    })

    await redis.xAdd("order.events", "*", {
        type: result.count === 1 ? "order.confirmed" : "order.rejected",
        data: JSON.stringify({ orderId: command.orderId })
    })
}

export async function startOrderCommandsConsumer() {
    await ensureGroup()

    while (true) {
        const entries = await redis.xReadGroup(group, consumer, { key: stream, id: ">" }, { COUNT: 10, BLOCK: 5000 })

        for (const entry of entries ?? []) {
            for (const message of entry.messages) {
                await processCommand(message.message.data)
                await redis.xAck(stream, group, message.id)
            }
        }
    }
}