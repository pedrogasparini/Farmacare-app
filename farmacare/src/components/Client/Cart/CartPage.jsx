import React from 'react';
import { useCart } from '../../../services/CartContext';
import Cart from '../Cart/Cart';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, total } = useCart();

    const getUserId = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return user ? user.id : null;
    };

    const finalizePurchase = async () => {
        const userId = getUserId();

        if (!userId) {
            Swal.fire('Error', 'Usuario no autenticado', 'error');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            
            // Verificar stock antes de finalizar la compra
            const outOfStockItems = [];
            await Promise.all(cart.map(async (item) => {
                const response = await fetch(`http://localhost:8000/products/${item.id}`);
                const product = await response.json();
                if (item.quantity > product.stock) {
                    outOfStockItems.push(item.name);
                }
            }));

            if (outOfStockItems.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Stock insuficiente',
                    text: `Los siguientes productos no tienen suficiente stock: ${outOfStockItems.join(', ')}.`,
                    confirmButtonText: 'Aceptar'
                });
                return;
            }

            const response = await fetch('http://localhost:8000/purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: userId,
                    items: cart.map(item => ({
                        productId: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    total: total,
                    date: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error('Error al finalizar la compra');
            }

            // Actualizar stock en el backend
            await Promise.all(cart.map(async (item) => {
                await fetch(`http://localhost:8000/products/${item.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        stock: item.stock - item.quantity
                    })
                });
            }));

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
