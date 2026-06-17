
import { Link, useSearchParams, useParams } from "react-router-dom"

import { useProducts } from '@/hooks/useProducts'
import { ProductCard } from "@/components/ProductCard"

export function Home() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';

    const products = useProducts({ category, query });

    const listaProdutos = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
            name: "SmartPhone Motorola Moto G35 5G 256GB",
            price: 899.0,
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
            name: "SmartPhone Motorola Moto G35 5G 256GB",
            price: 899.0,
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?w=400&q=80",
            name: "Carregador USB-C de 20W Apple Branco Original - MUVU3BZ/A",
            price: 139.9,
            originalPrice: 166.56,
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
            name: "SmartPhone Motorola Moto G35 5G 256GB",
            price: 899.0,
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
            name: "SmartPhone Motorola Moto G35 5G 256GB",
            price: 899.0,
        },
    ]

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

            {products.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    Nenhum produto encontrado.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-screen-xl mx-auto">
                    {produtos.map((produto) => (
                        <ProductCard
                            key={produto.id}
                            image={produto.image}
                            name={produto.name}
                            price={produto.price}
                            originalPrice={produto.originalPrice}
                            onBuy={() => console.log("Comprar:", produto.name)}
                            onAddToCart={() => console.log("Carrinho:", produto.name)}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}