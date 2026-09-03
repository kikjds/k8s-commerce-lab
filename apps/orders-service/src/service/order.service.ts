import prisma from "../lib/db.js";

export function fetchOrders() {
    return prisma.order.findMany()
}