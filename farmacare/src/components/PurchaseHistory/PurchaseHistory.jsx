
// import  { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Alert, Card } from 'react-bootstrap';
// import Header from '../Header/Header';
// import "./PurchaseHistory.css"

// const PurchaseHistory = ({ userId }) => {
//     const [purchaseHistory, setPurchaseHistory] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         //falta llamar a la api, x ahora se guardan los datos en localstorage
//         const storedHistory = JSON.parse(localStorage.getItem(`purchaseHistory_${userId}`)) || [];
//         setPurchaseHistory(storedHistory);
//         setLoading(false);
//     }, [userId]);

//     if (loading) {
//         return <p>Cargando historial...</p>;
//     }

//     return (
//         <>
//             <Header />
//             <h2>Historial de Compras</h2>
//             <div className="purchase-history-container">
//                 {purchaseHistory.length === 0 ? (
//                     <Alert variant="info">No hay compras realizadas.</Alert>
//                 ) : (
//                     purchaseHistory.map((purchase, index) => (
//                         <Card key={index} className="purchase-card">
//                             <Card.Body>
//                                 <Card.Title>Compra realizada el {new Date(purchase.purchaseDate).toLocaleDateString()}</Card.Title>
//                                 <Card.Text>
//                                     <strong>Total:</strong> ${purchase.totalPrice}
//                                     <br />
//                                     <strong>Productos:</strong>
//                                     <ul>
//                                         {purchase.cartItems.map((item, idx) => (
//                                             <li key={idx}>
//                                                 {item.name} - ${item.price}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     ))
//                 )}
//             </div>
//         </>
//     );
// };

// PurchaseHistory.propTypes = {
//     userId: PropTypes.number.isRequired,
// };

// export default PurchaseHistory;
