import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddUser = ({ onAddUser, onCancel }) => {
    const [user, setUser] = useState({ userName: '', password: '', userType: '' });
    const userTypes = ['SysAdmin', 'Admin', 'Cliente'];

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
                <Form.Label>UserName</Form.Label>
                <Form.Control
                    type="text"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Tipo de usuario</Form.Label>
                <Form.Select
                    name="userType"
                    value={user.userType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccionar tipo de usuario</option>
                    {userTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
                Agregar Usuario
            </Button>{' '}
            <Button variant="secondary" onClick={onCancel}>
                Cancelar
            </Button>
        </Form>
    );
};

export default AddUser;
