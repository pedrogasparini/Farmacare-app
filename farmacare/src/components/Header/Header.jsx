import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaHistory, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthenticationContext } from "../../services/authentication/authentication";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { handleLogout } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        handleLogout();
        navigate("/login");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const backToHome = () => {
        navigate("/home")
    }

    return (
        <div className="header-container">
            <Navbar expand="lg">
                <Navbar.Brand href="#home" className="logo-nav">
                    <img
                        src="/src/assets/img/logo.png"
                        width="150"
                        height="auto"
                        className="d-inline-block align-top"
                        alt="Farmacare Logo"
                        onClick={backToHome}
                        
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-links-container">
                    {location.pathname !== '/cart' && (
                        <Nav.Link onClick={goToCart}>
                            <FaShoppingCart className="icon" />
                        </Nav.Link>
                    )}
                        <Nav.Link href="#history">
                            <FaHistory className="icon" />
                        </Nav.Link>
                        <Nav.Link href="#profile">
                            <FaUser className="icon" />
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

export default Header;
