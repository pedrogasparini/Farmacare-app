import { useState } from "react";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    })

    const submitHandler = (event) => {
        event.preventDeafult();
    }



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
                                placeholder="Ingrese su email..."
                                type="text"

                            />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Control
                                placeholder="Ingrese su contraseña..."
                                type="password"

                            />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Col className="d-flex justify-content-end" />
                                <Button variant="secondary" type="submit">
                                    Iniciar Sesion
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}
export default Login;