import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddUser = ({ onAddUser, onCancel }) => {
    const [user, setUser] = useState({ name: '', email: '', role: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddUser(user);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Agregar Usuario
            </Button>
            {' '}
            <Button variant="secondary" onClick={onCancel}>
                Cancelar
            </Button>
        </Form>
    );
};

export default AddUser;