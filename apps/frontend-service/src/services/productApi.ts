import type { Product } from "../components/products/productCard"

const PRODUCT_API_URL = import.meta.env.VITE_PRODUCT_API_URL

export async function getProducts() {
    try {
        const response = await fetch(`${PRODUCT_API_URL}/api/products`)
        const data: Product[] = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

export async function createProduct(product: FormData): Promise<Product | undefined> {
    try {
        const response = await fetch(`${PRODUCT_API_URL}/api/products`, {
            method: "post",
            body: product
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

export async function deleteProduct(id: number) {
    try {
        const response = await fetch(`${PRODUCT_API_URL}/api/products/${id}`, { method: "delete" })

        if (!response.ok) {
            throw new Error("Could not delete product")
        }
    } catch (err) {
        console.error(err)
        return false
    }
}