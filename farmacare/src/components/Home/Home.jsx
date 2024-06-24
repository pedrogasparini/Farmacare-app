import { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Card } from 'react-bootstrap';
import { BsCart4, BsTrash } from 'react-icons/bs';
import ProductsService from '../../services/products/products';
import CategoriesService from '../../services/products/categories';
import Header from '../Header/Header';
import "./Home.css";

const productsList = new ProductsService();
const categoriesService = new CategoriesService();
const productsData = productsList.getProducts();
const categoriesData = categoriesService.getCategories();

const Home = ({ addProductToCart }) => {
    const [productsFiltered, setProductsFiltered] = useState(productsData);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setProductsFiltered(productsData);
    }, []);

    const filterProductsByCategory = (categoryId) => {
        setSelectedCategory(categoryId);

        if (categoryId === 'all') {
            setProductsFiltered(productsData);
        } else {
            const filteredProducts = productsData.filter(product => product.idCategory === categoryId);
            setProductsFiltered(filteredProducts);
        }
    };

    const addProductHandler = (newProduct) => {
        const productData = { ...newProduct, productId: Math.random() };

        fetch("http://localhost:5173/products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(productData),
        })
            .then((response) => {
                if (response.ok) return response.json();
                else {
                    throw new Error("The response has some errors");
                }
            })
            .then(() => {
                const newProductsArray = [productData, ...productsFiltered];
                setProductsFiltered(newProductsArray);
            })
            .catch((error) => console.log(error));
    };

    const deleteProductHandler = (id) => {
        fetch(`http://localhost:5173/products/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setProductsFiltered((prevProducts) => prevProducts.filter((product) => product.id !== id));
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Header />
            <div className="home-container">
                <div className="nav-container">
                    <Navbar expand="lg" className="custom-navbar flex-column">
                        <Nav className="flex-column custom-nav">
                            <Nav.Link href="#all" onClick={() => filterProductsByCategory('all')} className="nav-link">
                                Todos los productos
                            </Nav.Link>
                            {categoriesData.map(category => (
                                <Nav.Link
                                    key={category.id}
                                    href={`#${category.name}`}
                                    onClick={() => filterProductsByCategory(category.id)}
                                    className={`nav-link ${selectedCategory === category.id ? 'active' : ''}`}
                                >
                                    {category.name}
                                </Nav.Link>
                            ))}
                            <Form className="button-navbar-form">
                                <Form.Control placeholder="Buscar producto..." />
                                <Button variant="secondary" type="submit" className="button-navbar">
                                    Buscar
                                </Button>
                            </Form>
                        </Nav>
                    </Navbar>
                </div>
                <div className="products">
                    {productsFiltered.map(product => (
                        <Card className="products-card" key={product.id} style={{ width: '15rem' }}>
                            <Card.Img variant="top" src={product.pathImg} alt={product.name} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>Precio: {product.price}</Card.Text>
                                <Button variant="primary" className="button-product-card" onClick={() => { addProductHandler(product); addProductToCart(product); }}>
                                    <BsCart4 />
                                </Button>
                                <Button variant="danger" className="button-product-card" onClick={() => deleteProductHandler(product.id)}>
                                    <BsTrash />
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
