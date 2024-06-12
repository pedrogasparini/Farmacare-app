// Register.jsx
import React, { useState, useRef } from "react";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        username: false,
        password: false,
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const users = [
        { username: "pedro123", password: "password" },
    ];

    const usernameHandler = (event) => {
        const inputUsername = event.target.value;
        setUsername(inputUsername);
    };

    const passwordHandler = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (usernameRef.current.value.length === 0) {
            usernameRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: true,
                password: false,
            }));
            return;
        }

        if (password.length === 0) {
            passwordRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: true,
                username: false,
            }));
            return;
        }

        const userExists = users.some(user => user.username === username);
        if (userExists) {
            setMessage("El nombre de usuario ya está en uso.");
            return;
        }


        setUsers(prevUsers => [...prevUsers, { username, password }]);
        navigate("/login");
    };

    return (
        <div className="registro-container">
            <Card>
                <Card.Body>
                    <div className="icon-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="48px"
                            viewBox="0 -960 960 960"
                            width="48px"
                            fill="#000000">
                            <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5t127.92 44.69q31.3 14.13 50.19 40.97Q800-292 800-254v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm260-321q39 0 64.5-25.5T570-631q0-39-25.5-64.5T480-721q-39 0-64.5 25.5T390-631q0 39 25.5 64.5T480-541Zm0-90Zm0 411Z" /></svg>
                    </div>

                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-5">
                            <Form.Control
                                placeholder="Ingrese su nombre de usuario..."
                                type="text"
                                className={errors.username ? "border border-danger" : ""}
                                ref={usernameRef}
                                onChange={usernameHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Control
                                placeholder="Ingrese su contraseña..."
                                type="password"
                                value={password}
                                className={errors.password ? "border border-danger" : ""}
                                ref={passwordRef}
                                onChange={passwordHandler}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Col className="d-flex justify-content-end" />
                                <Button variant="secondary" type="submit">
                                    Registrarse
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>

                <p>{message}</p>
            </Card>
        </div>
    );
}

export default Register;
