import React from 'react';
import PropTypes from 'prop-types';
import useTraduction from '../../custom/UseTraduction';
import "./Navbar.css";

const Navbar = ({ onSelectCategory }) => {
    const { translate } = useTraduction();

    const handleCategoryClick = (category) => {
        onSelectCategory(category);
    };

    return (
        <nav className="nav-container">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <a href="#" className="navbar-link" onClick={() => handleCategoryClick(null)}>
                        {translate('todosLosProductos')}
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link" onClick={() => handleCategoryClick('cuidado personal')}>
                        {translate('cuidadoPersonal')}
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link" onClick={() => handleCategoryClick('medicamentos')}>
                        {translate('medicamentos')}
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link" onClick={() => handleCategoryClick('primeros auxilios')}>
                        {translate('primerosAuxilios')}
                    </a>
                </li>
                <li className="navbar-item">
                    <a href="#" className="navbar-link" onClick={() => handleCategoryClick('productos para el cuidado de la piel')}>
                        {translate('productosParaPiel')}
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Navbar.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
    showNewCategoryButton: PropTypes.bool,
};

export default Navbar;
