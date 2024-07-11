import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Header from '../Header/Header';
import Swal from 'sweetalert2';
import "./NewProduct.css"
import PropTypes from "prop-types";

const NewProduct = ({ onAddProduct }) => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState("");

    const changeProductNameHandler = (event) => {
        setProductName(event.target.value);
    };

    const changePriceHandler = (event) => {
        setPrice(event.target.value);
    };

    const changeDescriptionHandler = (event) => {
        setDescription(event.target.value);
    };

    const changeCategoryHandler = (event) => {
        setCategory(event.target.value);
    };

    const changeStockHandler = (event) => {
        setStock(event.target.value);
    };

    const changeImageHandler = (event) => {
        setImage(event.target.value);
    };

    const submitProductHandler = (event) => {
        event.preventDefault();
        const newProduct = {
            productName,
            price: parseFloat(price),
            description,
            category,
            stock: parseInt(stock),
            image,
        };
        onAddProduct(newProduct);
        setProductName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setStock("");
        setImage("");

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado con exito!'
        });
    };

    return (
        <>
        <Header />
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={submitProductHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productName">
                                <Form.Label>Nombre del Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={productName}
                                    placeholder="Ingrese nombre del producto"
                                    onChange={changeProductNameHandler}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productPrice">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese precio"
                                    min={0}
                                    step="any"
                                    onChange={changePriceHandler}
                                    value={price}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productDescription">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Ingrese descripción"
                                    onChange={changeDescriptionHandler}
                                    value={description}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productCategory">
                                <Form.Label>Categoría</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese categoría"
                                    onChange={changeCategoryHandler}
                                    value={category}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productStock">
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingrese stock"
                                    min={0}
                                    onChange={changeStockHandler}
                                    value={stock}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="productImage">
                                <Form.Label>URL de Imagen</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese URL de imagen"
                                    onChange={changeImageHandler}
                                    value={image}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Agregar Producto
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
        </>
    );  
};
NewProduct.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
};

export default NewProduct;
