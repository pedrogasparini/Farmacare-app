
import "./HeaderClient.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import { AuthenticationContext } from "../../../services/authentication/authentication";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HeaderClient = () => {
    const { handleLogout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        handleLogout();
        navigate("/login");
    };

    const goToCart = () => {
        navigate("/cart"); // Navega a la página del carrito
    };

    const goToHistory = () => {
        navigate("/history");
    };

    return (
        <div className="header-container">
            <Navbar expand="lg">
                <Navbar.Brand className="logo-nav">
                    <img
                        src="/src/assets/img/logo.png"
                        width="150"
                        height="auto"
                        className="d-inline-block align-top"
                        alt="Farmacare Logo"
                        onClick={() => navigate("/HomeClient")}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-links-container">
                        <Nav.Link onClick={goToCart}>
                            <FaShoppingCart className="icon" />
                        </Nav.Link>
                        <Nav.Link onClick={goToHistory}>
                            <FaHistory className="icon" />
                        </Nav.Link>
                        <Nav.Link onClick={handleLogOut}>
                            <FaSignOutAlt className="icon" />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default HeaderClient;
