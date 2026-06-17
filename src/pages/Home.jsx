import { Link, useSearchParams, useParams } from "react-router-dom"
import { useProducts } from '@/hooks/useProducts'

export function Home() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';

    const products = useProducts({ category, query });

    return (
        <div>
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

            {products.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* {products.map(p => (
                        //Produtos aqui
                    ))} */}
                </div>
            )}
        </div>
    );
}