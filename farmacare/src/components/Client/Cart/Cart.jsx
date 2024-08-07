import React from 'react';
import { Button, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import HeaderClient from '../HeaderClient/HeaderClient';
import './Cart.css';

const Cart = ({ cart, removeFromCart, clearCart, finalizePurchase }) => {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            <HeaderClient />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="mt-4 cart-card">
                            <Card.Header className="cart-header">
                                <h2>Carrito de Compras</h2>
                            </Card.Header>
                            <Card.Body>
                                {cart.length > 0 ? (
                                    <div>
                                        <ListGroup variant="flush">
                                            {cart.map((item, index) => (
                                                <ListGroup.Item key={index} className="cart-item">
                                                    <div>
                                                        <h5>{item.name}</h5>
                                                        <p>Precio: ${item.price}</p>
                                                        <p>Cantidad: {item.quantity}</p>
                                                        <p>Total: ${item.price * item.quantity}</p>
                                                    </div>
                                                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                                                        Eliminar
                                                    </Button>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                        <h3 className="mt-3">Total: ${total.toFixed(2)}</h3>
                                        <div className="d-flex justify-content-between mt-3">
                                            <Button variant="secondary" onClick={clearCart}>
                                                Vaciar Carrito
                                            </Button>
                                            <Button variant="success" onClick={finalizePurchase}>
                                                Finalizar Compra
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No hay productos en el carrito</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Cart;
