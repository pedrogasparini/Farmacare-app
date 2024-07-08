import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import Header from '../Header/Header';
import Swal from 'sweetalert2';
import "./Cart.css";

const Cart = ({ cartItems = [], removeFromCart }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [formError, setFormError] = useState('');
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleFinishPurchase = () => {
        if (!userName || !userEmail || !userAddress) {
            setFormError('Todos los campos son obligatorios.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(userEmail)) {
            setFormError('Ingrese un correo electrónico válido.');
            return;
        }

        //dp mandar los datos a la API
        const purchaseData = {
            userName,
            userEmail,
            userAddress,
            cartItems,
            totalPrice: calculateTotalPrice(),
            purchaseDate: new Date().toISOString(),
        };

        localStorage.setItem('purchaseData', JSON.stringify(purchaseData)); //dp reemplazarlo x la API

        setPurchaseCompleted(true);
        removeFromCart(-1); 

        Swal.fire({
            icon: 'success',
            title: '¡Compra completada!',
            text: 'Gracias por su compra.',
        });
    };

    return (
        <>
            <Header />
            <div className="cart-container">
                <h2>Carrito de Compras</h2>
                {cartItems.length === 0 ? (
                    <p>El carrito está vacío.</p>
                ) : (
                    <>
                        {cartItems.map((item, index) => (
                            <Card key={index} className="cart-item">
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>Precio: ${item.price}</Card.Text>
                                    <Button variant="danger" onClick={() => removeFromCart(index)}>
                                        <BsTrash /> Eliminar
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                        <h3>Total: ${calculateTotalPrice()}</h3>
                        <div style={{ marginBottom: '20px' }}></div>
                        {!purchaseCompleted && (
                            <Form> 
                                <div className="personal-info-section"> 
                                <h3>Datos personales:</h3>
                                <Form.Group controlId="userName">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su nombre completo"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="userEmail">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Ingrese su correo electrónico"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="userAddress">
                                    <Form.Label>Dirección de Envío</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ingrese su dirección de envío"
                                        value={userAddress}
                                        onChange={(e) => setUserAddress(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                </div>

                                {formError && <Alert variant="danger">{formError}</Alert>}

                                <Button variant="primary" onClick={handleFinishPurchase}>
                                    Finalizar Compra
                                </Button>
                            </Form>
                        )}
                        {purchaseCompleted && (
                            <Alert variant="success">
                                ¡Compra completada! Gracias por su compra.
                            </Alert>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

Cart.propTypes = {
    cartItems: PropTypes.array.isRequired,
    removeFromCart: PropTypes.func.isRequired,
};

export default Cart;

