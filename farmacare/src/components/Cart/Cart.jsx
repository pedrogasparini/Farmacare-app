
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import Header from '../Header/Header';
import "./Cart.css";

const Cart = ({ cartItems = [], removeFromCart }) => {
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
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
