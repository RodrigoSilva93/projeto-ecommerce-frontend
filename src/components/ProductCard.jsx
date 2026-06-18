import { ShoppingCart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

/**
 * ProductCard — card de produto para a vitrine.
 *
 * Props:
 *  - id          {number}  ID do produto (para link de detalhe)
 *  - image       {string}  URL da imagem do produto
 *  - name        {string}  Nome do produto
 *  - price       {number}  Preço atual em BRL
 *  - originalPrice {number} (opcional) Preço original para exibir desconto riscado
 *  - inStock     {boolean} Se o produto está em estoque
 *  - onBuy       {function} Callback ao clicar em "Comprar agora"
 *  - onAddToCart {function} Callback ao clicar em "Adicionar ao carrinho"
 *  - image           {string}  URL da imagem do produto
 *  - name            {string}  Nome do produto
 *  - price           {number}  Preço atual em BRL
 *  - originalPrice   {number} (opcional) Preço original para exibir desconto riscado
 *  - onCheckProduto  {function} Callback ao clicar em "Ver produto"
 */
export function ProductCard({
  id,
  image,
  name,
  price,
  originalPrice,
  inStock = true,
  onBuy,
  onAddToCart,
  onCheckProduct,
}) {
  const navigate = useNavigate();

  const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  const handleCardClick = () => {
    if (id) navigate(`/product/${id}`)
  }

  return (
    <article className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">

      <div
        className="flex items-center justify-center bg-white px-6 pt-6 pb-4 min-h-[180px] cursor-pointer"
        onClick={handleCardClick}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-contain max-h-44 w-full select-none"
            draggable={false}
          />
        ) : (
          <span className="text-gray-300 text-sm">Sem imagem</span>
        )}
      </div>

      <div className="flex flex-col flex-1 px-4 pb-4 gap-3">
        <p
          className="text-sm text-gray-800 font-medium leading-snug line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-sky-600 transition-colors"
          onClick={handleCardClick}
        >
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

        {!inStock && (
          <span className="text-xs text-red-500 font-medium">Indisponível</span>
        )}

        <div className="flex flex-col gap-2 mt-auto">
          <Button
            id={`btn-buy-${id}`}
            onClick={onBuy}
            disabled={!inStock}
            className="w-full bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comprar agora
          </Button>

          <Button
            id={`btn-cart-${id}`}
            onClick={onAddToCart}
            variant="outline"
            disabled={!inStock}
            className="w-full border-sky-300 text-sky-500 hover:bg-sky-50 hover:text-sky-600 font-medium rounded-lg cursor-pointer gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
            Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </article>
  )
}
