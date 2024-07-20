// src/components/Client/Cart/CartPage.jsx
import React from 'react';
import { useCart } from '../../../services/CartContext';
import Cart from '../Cart/Cart';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, total } = useCart();

    const finalizePurchase = async () => {
        try {
            const token = localStorage.getItem('authToken'); // O el método que uses para almacenar el token
            const response = await fetch('http://localhost:8000/purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
                },
                body: JSON.stringify({
                    userId: 'userId', // Reemplaza con el ID del usuario autenticado si es necesario
                    items: cart.map(item => ({
                        productId: item.id, // ID del producto
                        name: item.name,
                        price: item.price,
                        quantity: 1 // Puedes cambiar esto si necesitas cantidades variables
                    })),
                    total: total,
                    date: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Error al finalizar la compra');
            }

            clearCart(); // Limpia el carrito después de la compra exitosa
            Swal.fire('Compra finalizada con éxito', '', 'success');
        } catch (error) {
            console.error('Error al finalizar la compra:', error);
            Swal.fire('Error', 'No se pudo finalizar la compra', 'error');
        }
    };

    return (
        <div className="cart-page-container">
            <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                finalizePurchase={finalizePurchase} // Asegúrate de pasar la función
            />
        </div>
    );
};

export default CartPage;
