import prisma from "../lib/db.js"
import { redis } from "../lib/redis.js"

const stream = "order.events"
const group = "orders-service"
const consumer = `${group}-${process.pid}`

type OrderEvent = {
    orderId: number
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

async function processEvent(type: string, data: string) {
    const event = JSON.parse(data) as OrderEvent

    if (type === "order.confirmed") {
        await prisma.order.updateMany({
            where: { id: event.orderId, status: "PENDING" },
            data: { status: "CONFIRMED" }
        })
    }

    if (type === "order.rejected") {
        await prisma.order.updateMany({
            where: { id: event.orderId, status: "PENDING" },
            data: { status: "REJECTED" }
        })
    }
}

export async function startOrderEventsConsumer() {
    await ensureGroup()

    while (true) {
        const entries = await redis.xReadGroup(group, consumer, { key: stream, id: ">" }, { COUNT: 10, BLOCK: 5000 })

        for (const entry of entries ?? []) {
            for (const message of entry.messages) {
                await processEvent(message.message.type, message.message.data)
                await redis.xAck(stream, group, message.id)
            }
        }
    }
}