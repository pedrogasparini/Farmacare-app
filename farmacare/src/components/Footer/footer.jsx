import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useTraduction from '../../custom/UseTraduction';
import './footer.css'; 

const Footer = () => {
    const { translate } = useTraduction();

    return (
        <>
            <div className='footer-container'>
                <Container>
                    <Row>
                        <Col md={4}>
                            <h5>{translate('farmacare')}</h5>
                            <p>{translate('description')}</p>
                        </Col>
                        <Col md={4}>
                            <h5>{translate('valores')}</h5>
                            <ul>
                                <li>{translate('compromiso')}</li>
                                <li>{translate('calidad')}</li>
                                <li>{translate('atencion')}</li>
                                <li>{translate('innovacion')}</li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <h5>{translate('contacto')}</h5>
                            <p>Email: farmacare@gmail.com</p>
                            <p>Teléfono: +123 456 789</p>
                            <p>Ig: @farmacare</p>
                        </Col>
                    </Row>
                    <p className='derechos'>&copy; {translate('derechos')}</p>
                </Container>
            </div>
        </>
    );
};

export default Footer;
