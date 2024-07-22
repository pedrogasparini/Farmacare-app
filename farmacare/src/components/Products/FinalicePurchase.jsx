const finalizePurchase = async (userId, cart, total, clearCart) => {
    try {
        const token = localStorage.getItem('authToken'); 
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
                    quantity: 1 
                })),
                total: total,
                date: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            throw new Error('Error al finalizar la compra');
        }

        clearCart(); 
        alert('Compra finalizada con éxito');
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
    }
};
