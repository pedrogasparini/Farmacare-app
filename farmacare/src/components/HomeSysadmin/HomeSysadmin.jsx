import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header";
import Navbar from '../Navbar/Navbar';
import DeleteModal from '../ui/DeleteModal/DeleteModal';
const HomeSysadmin = () => {
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate();

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

    const addProduct = async () => {
        const response = await fetch('http://localhost:8000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        if (!response.ok) {
            throw new Error('Failed to add product');
        }
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setNewProduct({ name: '', price: '', image: '' });
    };

    const editProduct = (product) => {
        setEditingProduct(product);
    };

    const updateProduct = async () => {
        const response = await fetch(`http://localhost:8000/products/${editingProduct.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProduct),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        const updatedProduct = await response.json();
        setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
        setEditingProduct(null);
    };

    const confirmDeleteProduct = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const deleteProduct = async () => {
        const response = await fetch(`http://localhost:8000/products/${productToDelete.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        setProducts(products.filter(p => p.id !== productToDelete.id));
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingProduct) {
            setEditingProduct({ ...editingProduct, [name]: value });
        } else {
            setNewProduct({ ...newProduct, [name]: value });
        }
    };

    const handleAddOrUpdate = () => {
        if (editingProduct) {
            updateProduct();
        } else {
            addProduct();
        }
    };

    return (
        <div className="home-container">
            <Header />
            <Navbar />
            <Card className="home-card">
                <Card.Body>
                    <Form>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Nombre del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editingProduct ? editingProduct.name : newProduct.name}
                                onChange={handleInputChange}
                                placeholder="Ingresa el nombre del producto"
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductPrice">
                            <Form.Label>Precio del Producto</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={editingProduct ? editingProduct.price : newProduct.price}
                                onChange={handleInputChange}
                                placeholder="Ingresa el precio del producto"
                            />
                        </Form.Group>
                        <Form.Group controlId="formProductImage">
                            <Form.Label>Imagen del Producto</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={editingProduct ? editingProduct.image : newProduct.image}
                                onChange={handleInputChange}
                                placeholder="Ingresa la URL de la imagen del producto"
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleAddOrUpdate}>
                            {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                        </Button>
                    </Form>
                    {products.length > 0 ? (
                        <Row xs={1} md={2} lg={3} className="g-4 mt-4">
                            {products.map(product => (
                                <Col key={product.id}>
                                    <Card>
                                        <Card.Img variant="top" src={product.image} alt={product.name} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>Precio: ${product.price}</Card.Text>
                                            <Button variant="primary" onClick={() => addToCart(product.id)}>Agregar al carrito</Button>
                                            <Button variant="secondary" onClick={() => editProduct(product)} className="mx-2">Editar</Button>
                                            <Button variant="danger" onClick={() => confirmDeleteProduct(product)}>Eliminar</Button>
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
            <DeleteModal
                showDeleteModal={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onDelete={deleteProduct}
            />
        </div>
    );
};

export default HomeSysadmin;
