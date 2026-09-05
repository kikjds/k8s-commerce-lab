const ORDER_API_URL = import.meta.env.VITE_ORDER_API_URL

export interface Order {
    id: number
    productId: number
    price: number
    quantity: number
    status: "PENDING" | "CONFIRMED" | "REJECTED"
    createdAt: string
    updatedAt: string
}

export interface NewOrder {
    productId: number
    price: number
    quantity: number
}

export async function getOrders() {
    try {
        const response = await fetch(`${ORDER_API_URL}/api/orders`)
        const data: Order[] = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

export async function createOrder(order: NewOrder): Promise<Order | undefined> {
    try {
        const response = await fetch(`${ORDER_API_URL}/api/orders`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        })
        const data: Order = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}