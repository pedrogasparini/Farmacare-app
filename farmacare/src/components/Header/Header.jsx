import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaHistory, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <div className="header-container">
            <Navbar expand="lg">
                <Navbar.Brand href="#home" className="logo-nav">
                    <img
                        src="/src/assets/img/logo.png"
                        width="150"
                        height="80"
                        className="d-inline-block align-top"
                        alt="Farmacare Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-links-container">
                        <Nav.Link href="#cart">
                            <FaShoppingCart className="icon" />
                        </Nav.Link>
                        <Nav.Link href="#history">
                            <FaHistory className="icon" />
                        </Nav.Link>
                        <Nav.Link href="#profile">
                            <FaUser className="icon" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;