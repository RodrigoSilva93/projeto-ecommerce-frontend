import { useSearchParams, useParams, useNavigate } from "react-router-dom"

import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from "@/components/ProductCard"

export function Home() {
    const navigate = useNavigate();
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';

    const products = useProducts({ category, query });
    const availableProducts = products.filter((p) => p.inStock)

    return (
        <main className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
            {category && (
                <p className="text-sm text-gray-500 mb-4">
                    Categoria: <span className="font-medium capitalize">{category}</span>
                </p>
            )}

            {query && (
                <p className="text-sm text-gray-500 mb-4">
                    Resultados para: <span className="font-medium">{query}</span>
                </p>
            )}

            {availableProducts.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 max-w-screen-xl mx-auto">
                    {availableProducts.map((produto) => (
                        <ProductCard
                            key={produto.id}
                            image={produto.images?.[0]}
                            name={produto.name}
                            price={produto.discount > 0 ? produto.price * (1 - produto.discount / 100) : produto.price}
                            originalPrice={produto.discount > 0 ? produto.price: null}
                            onCheckProduct={() => navigate(`/product/${produto.id}`)}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}