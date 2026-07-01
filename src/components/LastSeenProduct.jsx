import { useNavigate } from "react-router-dom"

export function LastSeenProduct(
    image,
    name,
    price,
    originalPrice,
    onCheckProduct,
) {

    const navigate = useNavigate();

    const formatPrice = (value) =>  (value ?? 0).toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'

    });

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
            </div>
        </article>
    )
}