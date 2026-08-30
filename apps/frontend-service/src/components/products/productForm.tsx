import { createProduct } from "../../services/productApi"
import type { Product } from "./productCard"

export interface newProduct {
    name: string,
    price: number,
    description?: string,
    image: File
}

interface ProductFormProps {
    onProductCreated: (product: Product) => void
}

function ProductForm({ onProductCreated }: ProductFormProps) {
    const sendData = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const createdProduct = await createProduct(formData)

        if (createdProduct) {
            onProductCreated(createdProduct)
        }
    }
    return (
        <form onSubmit={sendData} className="grid gap-4">
            <label className="grid gap-1 text-sm font-medium">
                Name
            <input className="rounded border border-gray-300 px-3 py-2" type="text" name="name" required />
            </label>
            <label className="grid gap-1 text-sm font-medium">
                Price
            <input id="price" className="rounded border border-gray-300 px-3 py-2" type="number" min={0.1} max={400} step={0.1} name="price" required />
            </label>
            <label className="grid gap-1 text-sm font-medium">
                Image
            <input className="rounded border border-gray-300 px-3 py-2" type="file" accept="image/png, image/jpeg" required name="image" />
            </label>
            <button className="rounded bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800" type="submit">Add</button>
        </form>
    )
}

export default ProductForm