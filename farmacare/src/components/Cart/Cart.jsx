import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const Cart = ({ cart, removeFromCart,  clearCart }) => {
    return (
        <div className="shopping-cart">
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    {cart.map(item => (
                        <Card key={item.id} className='cart-item'>
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>Precio: ${item.price}</Card.Text>
                                <Button variant="danger" onClick={() => removeFromCart(item.id)}>Eliminar</Button>
                               
                            </Card.Body>
                        </Card>
                    ))}
                    <Button variant="danger" onClick={clearCart}>Vaciar Carrito</Button>
                </div>
            )}
        </div>
    );
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    updateCartQuantity: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
};
export default Cart;


// import { useState, useContext, useEffect } from 'react';
// import { Button, Card, Form, Alert } from 'react-bootstrap';
// import { BsTrash } from 'react-icons/bs';
// import Header from '../Header/Header';
// import Swal from 'sweetalert2';
// import "./Cart.css";
// import { ApiContext } from '../../services/api/apiContext';

// const Cart = ({ cartItems = [], removeFromCart, userId }) => {
//     const { cart, setCart, setPurchaseHistory, setOrderHistory } = useContext(ApiContext);
//     const [formError, setFormError] = useState('');
//     const [purchaseCompleted, setPurchaseCompleted] = useState(false);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [formData, setFormData] = useState({
//         name: '',
//         address: '',
//         email: ''
//     });

//     useEffect(() => {
//         let total = 0;
//         cart.forEach(item => {
//             total += item.price * item.quantity;
//         });
//         setTotalPrice(total);
//     }, [cart]);

//     const addPurchase = async (purchase) => {
//         const purchaseWithUserId = { ...purchase, userId: userId };

//         try {
//             const response = await fetch("http://localhost:8000/purchase", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(purchaseWithUserId),
//             });
//             if (response.ok) {
//                 const newPurchase = await response.json();
//                 setPurchaseHistory((prev) => [...prev, newPurchase]);
//             } else {
//                 console.error("Error al agregar compra:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error al agregar compra:", error);
//         }
//     };

//     const handleConfirmPurchase = async (event) => {
//         event.preventDefault();

//         if (!formData.name || !formData.address || !formData.email) {
//             setFormError('Por favor, complete todos los campos.');
//             return;
//         }

//         const order = {
//             items: cart,
//             date: new Date().toISOString(),
//             buyerId: userId,
//             buyerName: formData.name,
//             buyerAddress: formData.address,
//             buyerEmail: formData.email
//         };

//         try {
//             const response = await fetch("http://localhost:8000/order", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(order),
//             });

//             if (response.ok) {
//                 const newOrder = await response.json();
//                 setOrderHistory((prevHistory) => [...prevHistory, newOrder]);

//                 for (const item of cart) {
//                     const purchase = {
//                         name: item.name,
//                         description: item.description,
//                         quantity: item.quantity,
//                         price: item.price,
//                     };
//                     await addPurchase(purchase);
//                 }

//                 setCart([]);
//                 setPurchaseCompleted(true);
//                 Swal.fire({
//                     icon: 'success',
//                     title: '¡Compra completada!',
//                     text: 'Gracias por su compra.',
//                 });
//             } else {
//                 console.error("Error placing order:", response.statusText);
//             }
//         } catch (error) {
//             console.error("Error al iniciar sesión:", error.message);
//         }
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     return (
//         <>
//             <Header />
//             <div className="cart-container">
//                 <h2>Carrito de Compras</h2>
//                 <Form onSubmit={handleConfirmPurchase}>
//                     <Form.Group controlId="formName">
//                         <Form.Label>Nombre</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese su nombre"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formAddress">
//                         <Form.Label>Dirección</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese su dirección"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="formEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Ingrese su email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     {formError && (
//                         <Alert variant="danger" className="mt-3">
//                             {formError}
//                         </Alert>
//                     )}
//                     <Button variant="primary" type="submit" className="mt-3">
//                         Confirmar Compra
//                     </Button>
//                 </Form>

//                 {purchaseCompleted && (
//                     <Alert variant="success" className="mt-3">
//                         ¡Compra completada! Gracias por su compra.
//                     </Alert>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Cart;
