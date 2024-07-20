
// import "./Navbar.css";

// const Navbar = () => {
//     return (
//         <div className="sidebar-container">
//             <nav className="sidebar">
//                 <ul className="navbar-list">
//                     <li className="navbar-item">
//                     <a href="#" className="navbar-link" onClick={() => setSelectedCategory("todos")}>
//                         Todos los productos</a>
//                     </li>
//                     <li className="navbar-item">
//                         <a href="#" className="navbar-link">
//                             Cuidado personal
//                         </a>
//                     </li>
//                     <li className="navbar-item">
//                         <a href="#" className="navbar-link">
//                             Medicamentos
//                         </a>
//                     </li>
//                     <li className="navbar-item">
//                         <a href="#" className="navbar-link">
//                             Productos para el cuidado de la piel
//                         </a>
//                     </li>
//                     <li className="navbar-item">
//                         <a href="#" className="navbar-link">
//                             Materiales de primeros auxilios
//                         </a>
//                     </li>
//                     <li className="navbar-item">
//                         <button className="navbar-btn">Nueva categoría...</button>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// };

// export default Navbar;
import PropTypes from 'prop-types';
import "./Navbar.css";

const Navbar = ({ onSelectCategory, showNewCategoryButton }) => {
    const handleCategoryClick = (category) => {
        onSelectCategory(category);
    };

    return (
        <div className="sidebar-container">
            <nav className="sidebar">
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
                        <a href="#" className="navbar-link" onClick={() => handleCategoryClick('cuidado de la piel')}>Productos para el cuidado de la piel
                        </a>
                    </li>
                    {showNewCategoryButton && (
                        <li className="navbar-item">
                            <button className="navbar-btn">Nueva categoría...</button>
                        </li>
                    )}
                    
                </ul>
            </nav>
        </div>
    );
};
Navbar.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
    showNewCategoryButton: PropTypes.bool,
};

Navbar.defaultProps = {
    showNewCategoryButton: true, // Por defecto, el botón se mostrará
};
export default Navbar;
