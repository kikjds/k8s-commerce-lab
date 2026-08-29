export interface Product {
    id: number
    name: string,
    price: number,
    description?: string,
    images: {
        id: number,
        url: string
    }[]
}

function ProductCard({product}: {product: Product}) {
    const image = product.images[0]
    const bucket = import.meta.env.VITE_S3_BUCKET
    const region = import.meta.env.VITE_S3_REGION
    const imageUrl = image && bucket && `https://${bucket}.s3.${region}.amazonaws.com/${encodeURI(image.url)}`

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
        </article>
    )
}

export default ProductCard