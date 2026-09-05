import { useState } from "react"
import { createOrder } from "../../services/orderApi"

export interface Product {
    id: number
    name: string,
    price: number,
    description?: string,
    quantity: number,
    images: {
        id: number,
        url: string
    }[]
}

function ProductCard({ product, onDelete }: { product: Product, onDelete: (id: number) => void }) {
    const [quantity, setQuantity] = useState(1)
    const [availableQuantity, setAvailableQuantity] = useState(product.quantity)
    const [isBuying, setIsBuying] = useState(false)
    const [purchaseState, setPurchaseState] = useState<"idle" | "success" | "error">("idle")
    const image = product.images[0]
    const bucket = import.meta.env.VITE_S3_BUCKET
    const region = import.meta.env.VITE_S3_REGION
    const imageUrl = image && bucket && `https://${bucket}.s3.${region}.amazonaws.com/${encodeURI(image.url)}`

    async function handlePurchase() {
        setIsBuying(true)
        setPurchaseState("idle")

        const order = await createOrder({
            productId: product.id,
            price: product.price,
            quantity
        })

        if (order) {
            const remainingQuantity = availableQuantity - quantity
            setAvailableQuantity(remainingQuantity)
            setQuantity(remainingQuantity > 0 ? 1 : 0)
            setPurchaseState("success")
        } else {
            setPurchaseState("error")
        }

        setIsBuying(false)
    }

    return (
        <article className="border border-gray-300 bg-white p-4">
            {imageUrl ? (
                <img className="mb-4 h-48 w-full object-cover" src={imageUrl} alt={product.name} />
            ) : (
                <div className="mb-4 flex h-48 items-center justify-center bg-gray-100 text-gray-500">No image available</div>
            )}
            <h2 className="text-xl font-bold">{product.name}</h2>
            {product.description && <p className="mt-2 text-gray-600">{product.description}</p>}
            <p className="mt-4 text-lg font-semibold text-green-700">{product.price} PLN</p>
            <p className="mt-2 text-sm text-gray-600">Available: {availableQuantity}</p>
            <div className="mt-4 flex items-center gap-3">
                <label className="text-sm font-medium" htmlFor={`quantity-${product.id}`}>Quantity</label>
                <input
                    id={`quantity-${product.id}`}
                    className="w-20 rounded border border-gray-300 px-2 py-1"
                    type="number"
                    min={1}
                    max={availableQuantity}
                    value={quantity}
                    disabled={availableQuantity === 0 || isBuying}
                    onChange={(event) => setQuantity(Math.min(Math.max(Number(event.target.value), 1), availableQuantity))}
                />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={handlePurchase} disabled={availableQuantity === 0 || isBuying} className="rounded bg-emerald-700 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-gray-400">
                    {isBuying ? "Buying..." : "Buy"}
                </button>
                <button type="button" onClick={() => onDelete(product.id)} className="rounded bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600">Delete</button>
            </div>
            {purchaseState === "success" && <p className="mt-3 text-sm text-emerald-700">Order submitted.</p>}
            {purchaseState === "error" && <p className="mt-3 text-sm text-red-600">Could not submit order.</p>}
        </article>
    )
}

export default ProductCard