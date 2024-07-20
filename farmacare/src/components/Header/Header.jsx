import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaHistory, FaSignOutAlt, FaPlus, FaUsers } from 'react-icons/fa';
import { AuthenticationContext } from "../../services/authentication/authentication";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { handleLogout, user } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        handleLogout();
        navigate("/login");
    };

    const goToCart = () => {
        navigate("/cart");
    };

    const goToHistory = () => {
        navigate("/history");
    };

    const backToHome = () => {
        navigate("/home");
    };

    const goToAddProduct = () => {
        navigate("/add-product");
    };

    const goToUsersList = () => {
        navigate("/users");
    };

    const userType = user ? user.userType : null; // Obtener el tipo de usuario del objeto user

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
                        {userType === 'client' && (
                            <>
                                <Nav.Link onClick={goToCart}>
                                    <FaShoppingCart className="icon" />
                                </Nav.Link>
                                <Nav.Link onClick={goToHistory}>
                                    <FaHistory className="icon" />
                                </Nav.Link>
                            </>
                        )}
                        {userType === 'admin' && (
                            <>
                                <Nav.Link onClick={goToHistory}>
                                    <FaHistory className="icon" />
                                </Nav.Link>
                                <Nav.Link onClick={goToAddProduct}>
                                    <FaPlus className="icon" />
                                </Nav.Link>
                            </>
                        )}
                        {userType === 'sysAdmin' && (
                            <>
                                <Nav.Link onClick={goToHistory}>
                                    <FaHistory className="icon" />
                                </Nav.Link>
                                <Nav.Link onClick={goToAddProduct}>
                                    <FaPlus className="icon" />
                                </Nav.Link>
                                <Nav.Link onClick={goToUsersList}>
                                    <FaUsers className="icon" />
                                </Nav.Link>
                            </>
                        )}
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
