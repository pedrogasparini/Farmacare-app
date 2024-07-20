import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="sidebar-container">
            <nav className="sidebar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <a href="#" className="navbar-link">
                            Todos los productos
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link">
                            Cuidado personal
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link">
                            Medicamentos
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link">
                            Productos para el cuidado de la piel
                        </a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link">
                            Materiales de primeros auxilios
                        </a>
                    </li>
                    <li className="navbar-item">
                        <button className="navbar-btn">Nueva categoría...</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
