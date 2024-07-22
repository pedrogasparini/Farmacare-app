import { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; 
import { AuthenticationContext } from '../../services/authentication/authentication';

const AddUser = ({ onCancel }) => {
    const { handleRegister } = useContext(AuthenticationContext);
    const [user, setUser] = useState({ username: '', password: '', name: '', lastName: '', userType: '' });
    const userTypes = ['SysAdmin', 'Admin', 'Cliente'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleRegister(user);
            console.log('Usuario registrado exitosamente.');
            // Muestra un SweetAlert de éxito
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado',
                text: 'El usuario se registró correctamente.',
                confirmButtonText: 'Aceptar'
            });
            onCancel();
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al registrar el usuario.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>UserName</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={user.username}
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
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    value={user.lastName}
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

