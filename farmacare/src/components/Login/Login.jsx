// Login.jsx
import { useState, useRef, useContext } from "react";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthenticationContext } from "../../services/authentication/authentication";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const { handleLogin } = useContext(AuthenticationContext);

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
                email: false,
            }));
            return;
        }

        handleLogin(username);
        navigate("/home");
    };

    return (
        <div className="login-container">
            <Card>
                <Card.Body>
                    <Row>
                        <h5>Login</h5>
                    </Row>
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
                                    Iniciar Sesión
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
