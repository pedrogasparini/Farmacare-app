import { useState, useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import Navbar from '../../Navbar/Navbar';
import DeleteModal from '../../ui/DeleteModal/DeleteModal';
import AddProduct from '../../SysAdmin/AddProduct';
import Footer from '../../Footer/footer';

const HomeAdmin = () => {
    const [products, setProducts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
        setShowAddProductForm(false);
    };

    const updateProduct = async (product) => {
        const response = await fetch(`http://localhost:8000/products/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error('Failed to update product');
        }
        const updatedProduct = await response.json();
        setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
        setEditingProduct(null);
        setShowAddProductForm(false);
    };

    const handleAddOrUpdate = (product) => {
        if (editingProduct) {
            updateProduct(product);
        } else {
            addProduct(product);
        }
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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <>
            <HeaderAdmin />
            <div className="home-container">
                    <Navbar onSelectCategory={handleCategorySelect} />
                <div className="products-container">
                    <Card>
                        <Card.Body>
                            {showAddProductForm || editingProduct ? (
                                <AddProduct
                                    productToEdit={editingProduct}
                                    onAddOrUpdate={handleAddOrUpdate}
                                    onCancel={() => {
                                        setShowAddProductForm(false);
                                        setEditingProduct(null);
                                    }}
                                />
                            ) : (
                                <>
                                    <Button
                                        className='add-product-btn'
                                        variant="primary"
                                        onClick={() => setShowAddProductForm(true)}
                                    >
                                        Agregar Producto
                                    </Button>
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
                                                            <Button className="card-btn" variant="secondary" onClick={() => {
                                                                setEditingProduct(product);
                                                                setShowAddProductForm(true);
                                                            }}>Editar</Button>
                                                            <Button className="card-btn" variant="danger" onClick={() => confirmDeleteProduct(product)}>Eliminar</Button>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <p>No hay productos disponibles.</p>
                                    )}
                                </>
                            )}
                        </Card.Body>
                    </Card>
                    <DeleteModal
                        showDeleteModal={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        onDelete={deleteProduct}
                    />
                </div>
            </div>
                    <Footer />
        </>
    );
};

export default HomeAdmin;
