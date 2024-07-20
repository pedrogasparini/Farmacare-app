import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddProduct = ({ productToEdit, onAddOrUpdate, onCancel }) => {
    const [product, setProduct] = useState({ name: '', price: '', image: '' });

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct({ name: '', price: '', image: '' });
        }
    }, [productToEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddOrUpdate(product);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formProductName">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Ingresa el nombre del producto"
                />
            </Form.Group>

            <Form.Group controlId="formProductPrice">
                <Form.Label>Precio del Producto</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleInputChange}
                    placeholder="Ingresa el precio del producto"
                />
            </Form.Group>

            <Form.Group controlId="formProductImage">
                <Form.Label>Imagen del Producto</Form.Label>
                <Form.Control
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleInputChange}
                    placeholder="Ingresa la URL de la imagen del producto"
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                {productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}
            </Button>

            <Button variant="secondary" onClick={onCancel} className="ms-2">
                Cancelar
            </Button>
        </Form>
    );
};

export default AddProduct;
