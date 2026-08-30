import { useEffect, useState } from "react"
import { deleteProduct, getProducts } from "./services/productApi"
import { Product } from "./components/products/productCard"
import ProductCard from "./components/products/productCard"
import ProductForm from "./components/products/productForm"

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false)

  useEffect(() => {
    async function loadProducts() {
      const loadedProducts = await getProducts()
      setProducts(loadedProducts ?? [])
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  async function handleProductDelete(id: number) {
    const wasDeleted = await deleteProduct(id)

    if (wasDeleted !== false) {
      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-emerald-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">Storefront</p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h1 className="font-serif text-4xl font-semibold sm:text-5xl">Products</h1>
            <div className="flex items-center gap-4">
              {!isLoading && <p className="text-sm text-gray-500">{products.length} products</p>}
              <button
                type="button"
                onClick={() => setIsAddProductModalOpen(true)}
                className="rounded bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Add product
              </button>
            </div>
          </div>
        </header>

        {isLoading ? (
          <p className="py-12 text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="py-12 text-center text-gray-500">No products are available right now.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: Product) => <ProductCard key={product.id} product={product} onDelete={handleProductDelete} />)}
          </div>
        )}
      </section>

      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4" role="dialog" aria-modal="true" aria-labelledby="add-product-title">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setIsAddProductModalOpen(false)}
              className="absolute right-4 top-4 text-2xl leading-none text-gray-500 hover:text-gray-900"
              aria-label="Close add product form"
            >
              &times;
            </button>
            <h2 id="add-product-title" className="mb-6 pr-8 font-serif text-2xl font-semibold">Add product</h2>
            <ProductForm
              onProductCreated={(product) => {
                setProducts((currentProducts) => [...currentProducts, product])
                setIsAddProductModalOpen(false)
              }}
            />
          </div>
        </div>
      )}
    </main>
  )
}

export default App
