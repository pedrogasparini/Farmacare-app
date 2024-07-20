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
