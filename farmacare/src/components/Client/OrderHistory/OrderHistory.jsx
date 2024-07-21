import React, { useEffect, useState } from 'react';
import './OrderHistory.css'; // Asegúrate de la ruta correcta
import HeaderClient from '../HeaderClient/HeaderClient';

const OrderHistory = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/purchases')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPurchases(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error fetching purchases.</div>;

    return (
        <><>
            <HeaderClient />
        </>
        <div className="order-history-container">
                <h1 className="order-history-header">Order History</h1>
                {purchases.length === 0 ? (
                    <p className="loading">No purchases found.</p>
                ) : (
                    <ul className="order-list">
                        {purchases.map(purchase => (
                            <li key={purchase.id} className="order-item">
                                <h2 className="order-id">Purchase ID: {purchase.id}</h2>
                                <p className="order-total">Total: ${typeof purchase.total === 'number' ? purchase.total.toFixed(2) : 'N/A'}</p>
                                <p className="order-date">Date: {purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString() : 'N/A'}</p>
                                <div>
                                    {purchase.items && purchase.items.length > 0 ? (
                                        purchase.items.map(item => (
                                            <div key={item.id} className="order-item-details">
                                                <div>
                                                    <h3 className="order-item-name">{item.name}</h3>
                                                    <p className="order-item-price">Price: ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}</p>
                                                    <p className="order-item-quantity">Quantity: {item.quantity || 1}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="order-item-price">No items available.</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div></>
    );
};

export default OrderHistory;
