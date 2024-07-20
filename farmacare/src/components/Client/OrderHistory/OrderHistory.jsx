

import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

const OrderHistory = ({ purchases }) => {

    return (
        <div>
            <h2>Historial de Compras</h2>
            {purchases && purchases.length > 0 ? (
                purchases.map((purchase) => (
                    <Card key={purchase.id} className="mb-3">
                        <Card.Header>Compra realizada el {new Date(purchase.createdAt).toLocaleDateString()}</Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                {purchase.items.map((item) => (
                                    <ListGroupItem key={item.id}>
                                        <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
                                        {item.name} - Precio: ${item.price}
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                            <Card.Text className="mt-2">Total de la compra: ${purchase.total}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No hay historial de compras disponible.</p>
            )}
        </div>
    );
};

export default OrderHistory;


// import React, { useState, useEffect } from 'react';

// const OrderHistory = ({ userId }) => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const token = localStorage.getItem('authToken'); // O el método que uses para almacenar el token
//                 const response = await fetch(`http://localhost:8000/api/users/${userId}/purchases`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (!response.ok) {
//                     throw new Error('Error al obtener el historial de pedidos');
//                 }

//                 const data = await response.json();
//                 setOrders(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [userId]);

//     if (loading) return <p>Cargando...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div>
//             <h2>Historial de Pedidos</h2>
//             {orders.length > 0 ? (
//                 <ul>
//                     {orders.map(order => (
//                         <li key={order.id}>
//                             <h3>Pedido ID: {order.id}</h3>
//                             <p>Total: ${order.total}</p>
//                             <p>Fecha: {new Date(order.date).toLocaleDateString()}</p>
//                             <ul>
//                                 {order.items.map(item => (
//                                     <li key={item.productId}>
//                                         {item.name} - ${item.price} x {item.quantity}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No tienes pedidos.</p>
//             )}
//         </div>
//     );
// };

// export default OrderHistory;
