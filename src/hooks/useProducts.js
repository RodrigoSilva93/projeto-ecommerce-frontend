import { useEffect, useState, useMemo } from "react";

import { ProductService } from "../services/ProductService";
import { CATEGORIES } from '@/constants/categories'

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
            const normalized = CATEGORIES[category.toLowerCase()] ?? category;
            result = result.filter(p => p.category === normalized);
        }

        if (query && query.trim().length > 0) {
            const q = query.trim().toLowerCase();
            result = result.filter(p => p.name?.toLowerCase().includes(q));
        }

        return result;
    }, [products, category, query]);
}