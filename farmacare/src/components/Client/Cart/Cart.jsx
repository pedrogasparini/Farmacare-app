// Cart.jsx
import React from 'react';

const Cart = ({ cart, removeFromCart, clearCart, finalizePurchase, userId }) => {
    const total = cart.reduce((acc, product) => acc + product.price, 0);

    const handleFinalizePurchase = () => {
        finalizePurchase(userId, cart, total, clearCart);
    };

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cart.length > 0 ? (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <p>{item.name}</p>
                                <p>Precio: ${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${total}</h3>
                    <button onClick={clearCart}>Vaciar Carrito</button>
                    <button onClick={handleFinalizePurchase}>Finalizar Compra</button>
                </div>
            ) : (
                <p>No hay productos en el carrito</p>
            )}
        </div>
    );
};

export default Cart;
