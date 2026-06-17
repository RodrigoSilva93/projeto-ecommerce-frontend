import { useEffect, useState, useMemo } from "react";
import { ProductService } from "../services/ProductService";

export function useProducts({ category, query } = {}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await ProductService();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        }

        loadProducts();
    }, []);

    return useMemo(() => {
        let result = products;

        if (category) {
            result = result.filter(p => p.category?.toLowerCase() === category.toLowerCase());
        }

        if (query && query.trim().length > 0) {
            const q = query.trim().toLowerCase();
            result = result.filter(p => p.name?.toLowerCase().includes(q));
        }

        return result;
    }, [products, category, query]);
}