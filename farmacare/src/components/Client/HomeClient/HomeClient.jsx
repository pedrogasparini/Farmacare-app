// HomeClient.jsx
import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import HeaderClient from '../HeaderClient/HeaderClient';
import Navbar from '../../Navbar/Navbar';
import Swal from 'sweetalert2'; // Importa SweetAlert2
import { useCart } from '../../../services/CartContext';
import Footer from '../../Footer/footer';

const HomeClient = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { addToCart } = useCart(); // Usa el hook del carrito

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

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    const handleAddToCart = (product) => {
        addToCart(product);
        Swal.fire({
            icon: 'success',
            title: 'Producto Añadido',
            text: `${product.name} ha sido añadido al carrito.`,
            confirmButtonText: 'Aceptar'
        });
    };

    return (
        <>
            <HeaderClient />
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
                                                    <Button className="card-btn" variant="success" onClick={() => handleAddToCart(product)}>Agregar al Carrito</Button>
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
                    <Footer/>
                </div>
            </div>
        </>
    );
};

export default HomeClient;
