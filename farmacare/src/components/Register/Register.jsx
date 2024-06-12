import { useState, useRef, useContext } from "react";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate,useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Register.css"
import { AuthenticationContext } from "../../services/authentication/authentication";

const Register = ({  }) => {
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
    const { handleLogin } = useContext(AuthenticationContext);

    const nameHandler = (event) => {
        const inputName = event.target.value;
        setName(inputName);
    };

    const lastNameHandler = (event) => {
        const inputLastName = event.target.value;
        setLastName(inputLastName);
    };

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

        if (nameRef.current.value.length === 0) {
            nameRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: true,
            }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese su nombre.',
            });
            return;
        }

        if (lastNameRef.current.value.length === 0) {
            lastNameRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                lastName: true,
            }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese su apellido.',
            });
            return;
        }

        if (usernameRef.current.value.length === 0) {
            usernameRef.current.focus();
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: true,
            }));
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Por favor, ingrese su nombre de usuario.',
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
                text: 'Por favor, ingrese su contraseña.',
            });
            return;
        }

        // Aquí puedes realizar más validaciones, como verificar la fortaleza de la contraseña,
        // si el nombre de usuario ya existe, etc.

        // Lógica para registrar al usuario
        const newUser = {
            name: name,
            lastName: lastName,
            username: username,
            password: password
        };
        // Agregar la lógica para registrar al usuario en la base de datos o en el contexto de autenticación

        // Redireccionar al usuario después del registro
        navigate("/login");
    };

    return (
        <div className="sign-up-container">
            <h1>Sign Up</h1>
            <h6>Complete el siguiente formulario para la creación de su cuenta.</h6>
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