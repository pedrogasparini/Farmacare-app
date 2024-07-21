import PropTypes from 'prop-types';
import "./Navbar.css";

const Navbar = ({ onSelectCategory, showNewCategoryButton = true }) => {
    const handleCategoryClick = (category) => {
        onSelectCategory(category);
    };

    return (
            <nav className="nav-container">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <a href="#" className="navbar-link" onClick={() => handleCategoryClick(null)}>Todos los productos</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link" onClick={() => handleCategoryClick('cuidado personal')}>Cuidado personal</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link" onClick={() => handleCategoryClick('medicamentos')}>Medicamentos</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#" className="navbar-link" onClick={() => handleCategoryClick('primeros auxilios')}>Primeros Auxilios</a>
                    </li>
                    <li className="navbar-item">
                    <a href="#" className="navbar-link" onClick={() => handleCategoryClick('productos para el cuidado de la piel')}>Productos para el cuidado de la piel
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
