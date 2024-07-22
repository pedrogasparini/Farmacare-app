import React, { useState, useRef, useContext } from "react";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Register.css";
import { AuthenticationContext } from "../../services/authentication/authentication";

const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        name: false,
        lastName: false,
        username: false,
        password: false,
    });
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { handleRegister } = useContext(AuthenticationContext);

    const nameHandler = (event) => {
        setName(event.target.value);
    };

    const lastNameHandler = (event) => {
        setLastName(event.target.value);
    };

    const usernameHandler = (event) => {
        setUsername(event.target.value);
    };

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: false,
            lastName: false,
            username: false,
            password: false,
        };

        if (name.trim() === "") {
            nameRef.current.focus();
            newErrors.name = true;
            valid = false;
        }

        if (lastName.trim() === "") {
            lastNameRef.current.focus();
            newErrors.lastName = true;
            valid = false;
        }

        if (username.trim() === "") {
            usernameRef.current.focus();
            newErrors.username = true;
            valid = false;
        }

        if (password.trim() === "") {
            passwordRef.current.focus();
            newErrors.password = true;
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const newUser = {
            name: name.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            password: password.trim(),
            userType: 'client' 
        };

        try {
            await handleRegister(newUser);
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Usuario registrado correctamente.'
            });
            navigate("/login");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message
            });
        }
    };

    return (
        <div className="sign-up-container">
            <h1>Registro</h1>
            <h6>Complete el siguiente formulario para crear su cuenta.</h6>
            <Card className="sign-up-card">
                <Card.Body>
                    <Form className="sign-up-form" onSubmit={submitHandler}>
                        <Form.Group className="mb-4">
                            <Form.Control
                                placeholder="Ingrese su nombre..."
                                type="text"
                                value={name}
                                className={`custom-input ${errors.name ? "border border-danger" : ""}`}
                                ref={nameRef}
                                onChange={nameHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                placeholder="Ingrese su apellido..."
                                type="text"
                                value={lastName}
                                className={`custom-input ${errors.lastName ? "border border-danger" : ""}`}
                                ref={lastNameRef}
                                onChange={lastNameHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                placeholder="Ingrese su nombre de usuario..."
                                type="text"
                                value={username}
                                className={`custom-input ${errors.username ? "border border-danger" : ""}`}
                                ref={usernameRef}
                                onChange={usernameHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                placeholder="Ingrese su contraseña..."
                                type="password"
                                value={password}
                                className={`custom-input ${errors.password ? "border border-danger" : ""}`}
                                ref={passwordRef}
                                onChange={passwordHandler}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="secondary" type="submit">
                                    Registrarse
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
