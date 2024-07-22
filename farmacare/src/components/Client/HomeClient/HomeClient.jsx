import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import HeaderClient from '../HeaderClient/HeaderClient';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/footer';
import useTraduction from '../../../custom/UseTraduction';
import Swal from 'sweetalert2'; 
import { useCart } from '../../../services/CartContext';
import "./HomeClient.css";
import LanguageSelector from '../../../custom/LanguegeSelector';

const HomeClient = () => {
    const { translate } = useTraduction();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState({});
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts()
            .then(data => setProducts(data))
            .catch(error => console.error('No se pudo fetchear a los productos:', error));
    }, []);

    const fetchProducts = async () => {
        const response = await fetch('http://localhost:8000/products');
        if (!response.ok) {
            throw new Error('No se pudo fetchear a los productos');
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
                title: translate('stockInsufficient'),
                text: `${product.name} (${translate('quantity')}: ${quantity}) ${translate('insufficientStock')}.`,
                confirmButtonText: translate('accept')
            });
            return;
        }
        addToCart({ ...product, quantity });
        Swal.fire({
            icon: 'success',
            title: translate('productAdded'),
            text: `${product.name} (${translate('quantity')}: ${quantity}) ${translate('addedToCart')}.`,
            confirmButtonText: translate('accept')
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
            <LanguageSelector /> 
                        <Card.Body>
                            {filteredProducts.length > 0 ? (
                                <Row xs={1} md={2} lg={3} className="g-4 mt-4">
                                    {filteredProducts.map(product => (
                                        <Col key={product.id}>
                                            <Card className='card'>
                                                <Card.Img className='card-img' src={product.image} alt={product.name} />
                                                <Card.Body className='card-body'>
                                                    <Card.Title>{product.name}</Card.Title>
                                                    <Card.Text>{translate('precio')}: ${product.price}</Card.Text>
                                                    <Card.Text>{translate('stock')}: {product.stock}</Card.Text>
                                                    <Form.Group 
                                                        className='select-cant-prod' controlId={`quantity-${product.id}`} >
                                                        <Form.Label>{translate('cantidad')}</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            min="1"
                                                            value={selectedQuantity[product.id] || 1}
                                                            onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                                                        />
                                                    </Form.Group>
                                                    <Button className="add-product-cart-btn" variant="success" onClick={() => handleAddToCart(product)}>
                                                        {translate('agregarAlCarrito')}
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <p>{translate('noProducts')}</p>
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
