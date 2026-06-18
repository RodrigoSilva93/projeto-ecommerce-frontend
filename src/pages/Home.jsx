import { useNavigate } from "react-router-dom"
import { ProductCard } from "@/components/ProductCard"
import { useProducts } from "@/hooks/useProducts"
import { useCart } from "@/hooks/useCart"
import { toast } from "sonner"

export function Home() {
  const navigate = useNavigate()
  const products = useProducts()
  const { addProduct } = useCart()

  const availableProducts = products.filter((p) => p.inStock)

  const handleBuy = (product) => {
    addProduct(product)
    navigate("/cart")
  }

  const handleAddToCart = (product) => {
    addProduct(product)
    toast.success("Produto adicionado!", {
      description: `${product.name} foi adicionado ao carrinho.`,
      duration: 3000,
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      {availableProducts.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-gray-400 text-sm">Carregando produtos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-screen-xl mx-auto">
          {availableProducts.map((produto) => {
            const originalPrice =
              produto.discount > 0 ? produto.price : undefined
            const featuredPrice =
              produto.discount > 0
                ? produto.price * (1 - produto.discount / 100)
                : produto.price

            return (
              <ProductCard
                key={produto.id}
                id={produto.id}
                image={produto.images?.[0]}
                name={produto.name}
                price={featuredPrice}
                originalPrice={originalPrice}
                inStock={produto.inStock}
                onBuy={() => handleBuy(produto)}
                onAddToCart={() => handleAddToCart(produto)}
              />
            )
          })}
        </div>
      )}
    </main>
  )
}