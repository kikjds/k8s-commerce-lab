import type { Product } from "../components/products/productCard"

export async function getProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products")
        const data: Product[] = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

export async function createProduct(product: FormData): Promise<Product | undefined> {
    try {
        const respone = await fetch("http://localhost:3000/api/products", {
            method: "post",
            body: product
        })
        const data = await respone.json()
        return data
    } catch (err) {
        console.error(err)
    }
}

export async function deleteProduct(id: number) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, { method: "delete" })

        if (!response.ok) {
            throw new Error("Could not delete product")
        }
    } catch (err) {
        console.error(err)
        return false
    }
}