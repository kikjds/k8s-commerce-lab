import { Product } from "../components/products/productCard"

export async function getProducts() {
    try {
        const response = await fetch("http://localhost:3000/api/products")
        const data: Product[] = await response.json()

        return data
    } catch (err) {
        console.error(err)
    }
}
