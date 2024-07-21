import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import HeaderClient from '../HeaderClient/HeaderClient';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/footer';
import Swal from 'sweetalert2'; 
import { useCart } from '../../../services/CartContext';
import "./HomeClient.css"

const HomeClient = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState({});
    const { addToCart: addToCartContext } = useCart(); // Usa el hook del carrito

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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleQuantityChange = (productId, quantity) => {
        setSelectedQuantity({
            ...selectedQuantity,
            [productId]: quantity
        });
    };

    const handleAddToCart = async (product) => {
        const quantity = selectedQuantity[product.id] || 1;
        if (quantity > product.stock) {
            Swal.fire({
                icon: 'error',
                title: 'Stock insuficiente',
                text: `No hay suficiente stock de ${product.name}.`,
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        addToCartContext({ ...product, quantity });
        Swal.fire({
            icon: 'success',
            title: 'Producto Añadido',
            text: `${product.name} (Cantidad: ${quantity}) ha sido añadido al carrito.`,
            confirmButtonText: 'Aceptar'
        });
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <>
            <HeaderClient />
            <div className="home-container">
                <Navbar onSelectCategory={handleCategorySelect} showNewCategoryButton={false} />
                
                <div className="products-container">
                    <Card>
                        <Card.Body>
                            {filteredProducts.length > 0 ? (
                                <Row xs={1} md={2} lg={3} className="g-4 mt-4">
                                    {filteredProducts.map(product => (
                                        <Col key={product.id}>
                                            <Card className='card'>
                                                <Card.Img className='card-img' src={product.image} alt={product.name} />
                                                <Card.Body className='card-body'>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    <Card.Text>Precio: ${product.price}</Card.Text>
                                                    <Card.Text>Stock: {product.stock}</Card.Text>
                                                    <Form.Group 
                                                        className='select-cant-prod' controlId={`quantity-${product.id}`} >
                                                        <Form.Label>Cantidad</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            min="1"
                                                            value={selectedQuantity[product.id] || 1}
                                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                        />
                                                    </Form.Group>
                                                    <Button className="add-product-cart-btn" variant="success" onClick={() => handleAddToCart(product)}>
                                                        Agregar al Carrito
                                                    </Button>
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
            </div>
            <Footer />
        </>
    );
};

export default HomeClient;
