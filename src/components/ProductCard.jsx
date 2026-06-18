import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

/**
 * ProductCard — card de produto para a vitrine.
 *
 * Props:
 *  - image           {string}  caminho da imagem do produto
 *  - name            {string}  Nome do produto
 *  - price           {number}  Preço atual em BRL
 *  - originalPrice   {number} (opcional) Preço original para exibir desconto riscado
 *  - onCheckProduto  {function} Callback ao clicar em "Ver produto"
 */
export function ProductCard({
  image,
  name,
  price,
  originalPrice,
  onCheckProduct,
}) {
  const navigate = useNavigate();

  const formatPrice = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  return (
    <article className="bg-white rounded-2xl shadow-md flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-center bg-white px-6 pt-6 pb-4 min-h-[180px] cursor-pointer"
        onClick={onCheckProduct}>
        {image ? (
          <img
            src={image}
            alt={name}
            className="object-contain max-h-48 w-full select-none"
            draggable={false}
          />
        ) : (
          <span className="text-gray-300 text-sm">
            Sem imagem
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 px-4 pb-4 gap-3">
        <p className="text-sm text-gray-800 font-medium leading-snug line-clamp-3 min-h-[2.5rem] mb-3 cursor-pointer hover:text-sky-600 transition-colors"
          onClick={onCheckProduct}>
          {name}
        </p>

        <div className="flex flex-col gap-0.5 mt-auto">
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(price)}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            id={`btn-buy-${name?.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={onCheckProduct}
            className="w-full h-12 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg cursor-pointer">
            Ver produto
          </Button>
        </div>
      </div>
    </article>
  )
}
