// CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Calcular el total del carrito cada vez que cambia
        const newTotal = cart.reduce((acc, product) => acc + product.price, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(product => product.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
