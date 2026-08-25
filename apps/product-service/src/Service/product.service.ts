import prisma from "../lib/db.js";

export function fetchActiveProducts() {
    return prisma.product.findMany({where: { isActive: true } })
}

export function createNewProduct(name: string, price: number, description: string) {
    return prisma.product.create({
        data: {
            name: name,
            price: price,
            description: description ? description : null
        }
    })
}

export function updateProductBasedOnId(id: number, name: string, price: number, description: string ) {
    return prisma.product.update({where: {id: id}, data: {
        name: name,
        price: price,
        description: description ? description : null
    }})
}

export function deleteProductBasedOnId(id: number) {
    return prisma.product.update({where: {id: id}, data: {isActive: false }})
}