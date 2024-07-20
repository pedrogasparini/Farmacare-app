// AddProductForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddProduct = ({ productToEdit, onAddOrUpdate, onCancel }) => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: '',
    });

    useEffect(() => {
        if (productToEdit) {
            setProduct({
                name: productToEdit.name,
                price: productToEdit.price,
                image: productToEdit.image,
                category: productToEdit.category,
            });
        } else {
            setProduct({
                name: '',
                price: '',
                image: '',
                category: '',
            });
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddOrUpdate(product);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formPrice">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ingrese el precio del producto"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formImage">
                <Form.Label>Imagen URL</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese la URL de la imagen del producto"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group controlId="formCategory">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese la categoría del producto"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="mt-3">
                <Button variant="primary" type="submit">
                    {productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}
                </Button>
                <Button variant="secondary" onClick={onCancel} className="ml-2">
                    Cancelar
                </Button>
            </div>
        </Form>
    );
};

export default AddProduct;
