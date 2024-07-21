import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HeaderSysAdmin from '../HeaderSysAdmin/HeaderSysAdmin';

const UsersHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const [users, setUsers] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        fetchPurchases();
        fetchUsers();
    }, []);

    const fetchPurchases = async () => {
        try {
            const response = await fetch('http://localhost:8000/purchases');
            if (!response.ok) {
                throw new Error('Failed to fetch purchases');
            }
            const data = await response.json();
            setPurchases(data);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const getUserById = (id) => {
        const user = users.find(user => user.id === parseInt(id));
        return user ? `${user.name} ${user.lastName}` : 'Unknown User';
    };

    return (
        <>
        <HeaderSysAdmin />
        <Container>
            <h1>Historial de Compras de Usuarios</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map(purchase => (
                        <React.Fragment key={purchase.id}>
                            {purchase.items.map(item => (
                                <tr key={`${purchase.id}-${item.productId}`}>
                                    <td>{getUserById(purchase.userId)}</td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>${purchase.total}</td>
                                    <td>{new Date(purchase.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </Container>
                    </>
    );
};

export default UsersHistory;
