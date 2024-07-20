import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Header from '../../Header/Header';
import Navbar from '../../Navbar/Navbar';
import Cart from '../Cart/Cart';

const HomeClient = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchProducts()
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:8000/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    };

    const addProduct = async (product) => {
        try {
            const response = await fetch('http://localhost:8000/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            const addedProduct = await response.json();
            setProducts([...products, addedProduct]);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const addToCart = (product) => {
        setCart([...cart, { ...product }]);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const finalizePurchase = async () => {
        try {
            const response = await fetch('http://localhost:8000/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart, total: cart.reduce((acc, product) => acc + product.price, 0) }),
            });
            if (!response.ok) {
                throw new Error('Failed to finalize purchase');
            }
            clearCart();
            alert('Compra finalizada con éxito');
        } catch (error) {
            console.error('Error finalizing purchase:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="home-container">
                <div className="nav-container">
                    <Navbar onSelectCategory={handleCategorySelect} showNewCategoryButton={false} />
                </div>
                <div className="products-container">
                    <Card>
                        <Card.Body>
                            {filteredProducts.length > 0 ? (
                                <Row xs={1} md={2} lg={3} className="g-4 mt-4">
                                    {filteredProducts.map(product => (
                                        <Col key={product.id}>
                                            <Card className='card'>
                                                <Card.Img className='card-img' src={product.image} alt={product.name}/>
                                                <Card.Body className='card-body'>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    <Card.Text>Precio: ${product.price}</Card.Text>
                                                    <Button className="card-btn" variant="success" onClick={() => addToCart(product)}>Agregar al Carrito</Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>No hay productos disponibles.</p>
                            )}
                        </Card.Body>
                    </Card>
                </div>
                {cart.length > 0 && (
                    <div className="cart-container">
                        <Cart
                            cart={cart}
                            removeFromCart={removeFromCart}
                            clearCart={clearCart}
                            finalizePurchase={finalizePurchase}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default HomeClient;
