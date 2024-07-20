import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.css'; // Importa el archivo CSS para el estilo personalizado

const Footer = () => {
    return (
        <div className='footer-container'>
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Sobre Farmacare</h5>
                        <p>En Farmacare, nos dedicamos a proporcionar medicamentos y productos de salud de alta calidad para mejorar tu bienestar. Contamos con un equipo de profesionales listos para asistirte en todas tus necesidades farmacéuticas.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Servicios</h5>
                        <ul>
                            <li><a href="#prescription">Recetas Médicas</a></li>
                            <li><a href="#consultation">Consultas Farmacéuticas</a></li>
                            <li><a href="#delivery">Entrega a Domicilio</a></li>
                            <li><a href="#health-check">Chequeos de Salud</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contáctanos</h5>
                        <p>Email: farmacare@gmail.com</p>
                        <p>Teléfono: +123 456 789</p>
                        <p>Ig: @farmacare</p>
                    </Col>
                </Row>
            </Container>
            <div className="footer-bottom">
                <p>&copy; 2024 Farmacare. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default Footer;
