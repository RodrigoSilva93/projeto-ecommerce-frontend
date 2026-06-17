import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * ProductCard — card de produto para a vitrine.
 *
 * Props:
 *  - image       {string}  URL da imagem do produto
 *  - name        {string}  Nome do produto
 *  - price       {number}  Preço atual em BRL
 *  - originalPrice {number} (opcional) Preço original para exibir desconto riscado
 *  - onBuy       {function} Callback ao clicar em "Comprar agora"
 *  - onAddToCart {function} Callback ao clicar em "Adicionar ao carrinho"
 */
export function ProductCard({
  image,
  name,
  price,
  originalPrice,
  onBuy,
  onAddToCart,
}) {
  const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <article className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">

      <div className="flex items-center justify-center bg-white px-6 pt-6 pb-4 min-h-[180px]">
        <img
          src={image}
          alt={name}
          className="object-contain max-h-44 w-full select-none"
          draggable={false}
        />
      </div>

      <div className="flex flex-col flex-1 px-4 pb-4 gap-3">
        <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
          {name}
        </p>

        <div className="flex flex-col gap-0.5">
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(price)}
          </span>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          <Button
            id={`btn-buy-${name?.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={onBuy}
            className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg cursor-pointer"
          >
            Comprar agora
          </Button>

          <Button
            id={`btn-cart-${name?.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={onAddToCart}
            variant="outline"
            className="w-full border-sky-300 text-sky-500 hover:bg-sky-50 hover:text-sky-600 font-medium rounded-lg cursor-pointer gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </article>
  )
}
