// src/components/Client/Cart/CartPage.jsx
import React from 'react';
import { useCart } from '../../../services/CartContext';
import Cart from '../Cart/Cart';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, total } = useCart();

    // Aquí obtén el userId del usuario autenticado (por ejemplo, desde localStorage)
    const getUserId = () => {
        // Suponiendo que tienes el ID del usuario en el localStorage, ajusta según tu implementación
        const user = JSON.parse(localStorage.getItem('user')); // Ajusta esta línea según cómo almacenas la información del usuario
        return user ? user.id : null; // Asegúrate de manejar casos en los que el usuario no esté autenticado
    };

    const finalizePurchase = async () => {
        const userId = getUserId();

        if (!userId) {
            Swal.fire('Error', 'Usuario no autenticado', 'error');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8000/purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
                },
                body: JSON.stringify({
                    userId: userId, // Aquí pasamos el ID del usuario correcto
                    items: cart.map(item => ({
                        productId: item.id,
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
                finalizePurchase={finalizePurchase}
            />
        </div>
    );
};

export default CartPage;
