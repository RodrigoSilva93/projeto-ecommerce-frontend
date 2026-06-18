import { useState, useEffect, useCallback } from 'react'
import { CARRINHO } from "@/constants/cart"

export function useCart(paymentMethod = '') {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem(CARRINHO)) || [];
    });

    useEffect(() => {
        localStorage.setItem(CARRINHO, JSON.stringify(cart));
    }, [cart]);

    const addProduct = useCallback((product) => {
        const exists = cart.find(p => p.id === product.id);

        if (exists) {
            setCart((prev) => prev.map((p) => p.id === product.id ? {...p, quantidade: p.quantidade + 1} : p));
            return false;
        } else {
            setCart((prev) => [...prev, {...product, quantidade: 1}]);
            return true;
        }
    }, [cart]);

    const removeProduct = useCallback((id) => {
        setCart((prev) => prev.filter(p => p.id !== id));
    }, []);

    const updateQuantity = useCallback((id, quantidade) => {
        if (quantidade < 1) return;

        setCart((prev) => prev.map(p => p.id === id ? {...p, quantidade} : p));
    }, []);

    const clearCart = useCallback(() => setCart([]), []);

    const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantidade, 0);
    const shipping = 10; //frete
    const discount = paymentMethod === 'pix' 
        ? cart.reduce((acc, product) => {
            const rate = product.discount ?? 0;
            return acc + product.price * (rate / 100) * product.quantidade;
            }, 0)
        : 0;
    const total = subtotal + shipping - discount;
    const totalItems = cart.reduce((acc, product) => acc + product.quantidade, 0);

    return {cart, addProduct, removeProduct, updateQuantity, clearCart, subtotal, shipping, discount, total, totalItems};
}