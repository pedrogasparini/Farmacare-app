import "./NavBar.css"
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const NavBar = () => {
    return (
        <div className="nav-container">

        <Navbar bg="light" expand="lg" className="custom-navbar">
            <Navbar.Brand href="#home">Farmacare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Inicio</Nav.Link>
                    <Nav.Link href="#products">Productos</Nav.Link>
                </Nav>
                <Form >
                    <FormControl type="text" placeholder="Buscar productos" className="mr-sm-2" />
                    <Button variant="outline-success">Buscar</Button>
                </Form>
        </Navbar>
        </div>
    );
};

export default NavBar;
