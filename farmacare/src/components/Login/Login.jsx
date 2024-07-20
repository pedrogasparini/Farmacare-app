// src/components/Login/Login.jsx
import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/authentication';
import { TranslateContext, TranslateContextProvider } from '../../custom/TranslateContext';
import useTranslation from '../../custom/UseTranslation';
import Swal from 'sweetalert2';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: false,
        password: false,
    });
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { handleLogin } = useContext(AuthenticationContext);
    const { language, changeLanguageHandler } = useContext(TranslateContext);
    const translate = useTranslation();

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (usernameRef.current.value.length === 0) {
            usernameRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: true,
            }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: translate('username_error'),
            });
            return;
        }

        if (passwordRef.current.value.length === 0) {
            passwordRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: true,
            }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: translate('password_error'),
            });
            return;
        }

        try {
            const data = await handleLogin(username, password); // Pasamos las credenciales y obtenemos la data en caso de éxito
            redirectToHome(data.userType); // Redireccionamos según el tipo de usuario
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    };

    const redirectToHome = (userType) => {
        switch (userType) {
            case 'client':
                navigate('/homeClient');
                break;
            case 'admin':
                navigate('/homeAdmin');
                break;
            case 'sysAdmin':
                navigate('/homeSysAdmin');
                break;
            default:
                navigate('/protected');
                break;
        }
    };

    return (
        <TranslateContextProvider>
            <div className="login-container">
                <h1>{translate('welcome')}</h1>
                <Card className="login-card">
                    <Card.Body>
                        <div className="icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="80px"
                                viewBox="0 -960 960 960"
                                width="90px"
                                fill="#000000"
                            >
                                <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" />
                            </svg>
                        </div>
                        <Form className="login-form" onSubmit={submitHandler}>
                            <Form.Group className="mb-4 mt-3">
                                <Form.Control
                                    placeholder={translate('username_placeholder')}
                                    type="text"
                                    className={`custom-input ${errors.username ? 'border border-danger' : ''}`}
                                    ref={usernameRef}
                                    onChange={usernameHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    placeholder={translate('password_placeholder')}
                                    type="password"
                                    value={password}
                                    className={`custom-input ${errors.password ? 'border border-danger' : ''}`}
                                    ref={passwordRef}
                                    onChange={passwordHandler}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Button variant="secondary" type="submit">
                                        {translate('login')}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row>
                            <p className="p-reg">
                                {translate('first_time')}? Haz click{' '}
                                <a href="/register">{translate('click_here')}</a> para crear un usuario.
                            </p>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </TranslateContextProvider>
    );
};

export default Login;
