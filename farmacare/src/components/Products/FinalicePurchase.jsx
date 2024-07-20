const finalizePurchase = async (userId, cart, total, clearCart) => {
    try {
        const token = localStorage.getItem('authToken'); // O el método que uses para almacenar el token
        const response = await fetch('http://localhost:8000/purchases', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
            },
            body: JSON.stringify({
                userId: userId, // ID del usuario autenticado
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
        alert('Compra finalizada con éxito');
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
    }
};
