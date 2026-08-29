import { useEffect, useState } from "react"
import { getProducts } from "./services/productApi"
import { Product } from "./components/products/productCard"
import ProductCard from "./components/products/productCard"

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      const loadedProducts = await getProducts()
      setProducts(loadedProducts ?? [])
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-emerald-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">Storefront</p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Products</h1>
            {!isLoading && <p className="text-sm text-gray-500">{products.length} products</p>}
          </div>
        </header>

        {isLoading ? (
          <p className="py-12 text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-gray-500">No products are available right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
