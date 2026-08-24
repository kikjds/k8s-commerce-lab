import prisma from "../lib/db.js";

export function fetchActiveProducts() {
    return prisma.product.findMany({where: { isActive: true } })
}