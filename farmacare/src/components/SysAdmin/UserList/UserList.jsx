import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Container, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import HeaderSysAdmin from '../HeaderSysAdmin/HeaderSysAdmin';
import './UserList.css'; // Asegúrate de crear este archivo para tus estilos

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filterId, setFilterId] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (filterId) {
            setFilteredUsers(users.filter(user => user.id === parseInt(filterId)));
        } else {
            setFilteredUsers(users);
        }
    }, [filterId, users]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/users');
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting user');
            }
            // Remove the user from the state after successful deletion
            setUsers(users.filter(user => user.id !== userId));
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
            Swal.fire('Usuario eliminado', '', 'success');
        } catch (error) {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
    };

    return (
        <>
            <HeaderSysAdmin />
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="mt-4">
                            <Card.Header>
                                <h2>Lista de Usuarios</h2>
                                <Form.Group controlId="filterId">
                                    <Form.Label>Filtrar por ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el ID del usuario"
                                        value={filterId}
                                        onChange={(e) => setFilterId(e.target.value)}
                                    />
                                </Form.Group>
                            </Card.Header>
                            <Card.Body>
                                {filteredUsers.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {filteredUsers.map(user => (
                                            <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h5>ID: {user.id} - {user.name} {user.lastName}</h5>
                                                    <p>Username: {user.username}</p>
                                                </div>
                                                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                                    Eliminar
                                                </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p>No hay usuarios disponibles.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserList;
