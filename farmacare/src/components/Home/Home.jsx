import "./Home.css";
import Header from "../Header/Header";
import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/authentication";
import Products from "../Product/Product";

const products = [
    {
        id: 1,
        productName: "Producto 1",
        description: "Descripción del producto 1",
        price: 10.99,
        category: "Cuidado personal",
    },
    {
        id: 2,
        productName: "Producto 2",
        description: "Descripción del producto 2",
        price: 20.99,
        category: "Medicamentos",
    },
    // Añade más productos según sea necesario
];

const Home = () => {

    const [productsFiltered, setProductsFiltered] = useState([]);
    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthenticationContext)

    const searchHandler = (searchInput) => {
        if (searchInput === "") setProductsFiltered(products);

        const searchInputUpperCase = searchInput.toUpperCase();
        const productsSearched = products.filter((product) =>
            product.bookTitle.toUpperCase().includes(searchInputUpperCase)
        );
        setProductsFiltered(productsSearched);
    };

    const handleLogOut = () => {
        handleLogout();
        navigate("/login");
    };

useEffect(() => {
    fetch("http://localhost:8000/products", {
        headers: {
            accept: "aplication/json",
        },
    })

        .then((response) => response.json())
        .then((productData) => {
            const productsMapped = productData.map((product) => ({
                ...product,
            }))
                .sort((a, b) => b.id - a.id);
            setProductsFiltered(productsMapped)
        })
        .catch((error) => console.log(error));
}, []);

const addProductHandler = (newProduct) => {
    const productData = { ...newProduct, productId: Math.random() };

    fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(productData),
    })
        .then((response) => {
            if (response.ok) return response.json();
            else {
                throw new Error("The response has some errors")
            }
        })
        .then(() => {
            const newProductsArray = [productData, ...productsFiltered];
            setProductsFiltered(newProductsArray)
        })
        .catch((error) => console.log(error))
};

const deleteProductHandler = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
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
            <Button onClick={handleLogOut}></Button>
            <div className="home-container">
                <div className="nav-container">
                    <Navbar expand="lg" className="custom-navbar flex-column">
                        <Nav className="flex-column custom-nav">
                            <Nav.Link href="#all-products" className="nav-link">Todos los productos</Nav.Link>
                            <Nav.Link href="#personal-care" className="nav-link">Cuidado personal</Nav.Link>
                            <Nav.Link href="#medicines" className="nav-link">Medicamentos</Nav.Link>
                            <Nav.Link href="#skin-care" className="nav-link">Productos para el cuidado de la piel</Nav.Link>
                            <Nav.Link href="#first-aid" className="nav-link">Materiales de primeros auxilios</Nav.Link>
                            <Form className="search-form">
                                <FormControl type="text" placeholder="Buscar productos" className="search-input" />
                                <Button className="search-button">Buscar</Button>
                            </Form>
                        </Nav>
                    </Navbar>
    
                </div>
                <div className="productos-container">
                    <Products
                        onDelete={deleteProductHandler}
                        products={productsFiltered}
                        onSearch={searchHandler}
                        onAdd={addProductHandler}
                    />
                </div>
            </div>
        </>
    );
};
    





export default Home;
