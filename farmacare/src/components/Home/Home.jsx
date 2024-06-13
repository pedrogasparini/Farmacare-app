import { useState}  from "react";
import "./Home.css";
import CategoriesService from "./../../services/products/categories";
import ProductsService from "../../services/products/products";

const Home = () => {


    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const categoriesService = new CategoriesService();
    const productList = new ProductsService();

    const categories = categoriesService.getCategories();
    categories.push({ id: 0, name: "Todos" });
    categories.sort((x, y) => x.id - y.id);

    const products = productList.getProducts();
    const filteredProducts = selectedCategory === "Todos" ? products : products.filter(product => product.idCategory === selectedCategory.id);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="home-container">
            <div className="header">
                <nav >
                    <button className="Logo">
                        <img src="src/img/logo.png" alt="logo" />
                    </button>

                    <button className="user">
                        <img src="src/img/user60x60.png" alt="Icono" />
                    </button>

                    <button className="carrito">
                        <img src="src/img/carrito.png" alt="carrito" />
                    </button>

                    <button className="find">
                        <img src="src/img/lupa.png" alt="lupa" />
                    </button>
                    <button className="turnos">
                        <img src="src/img/buscar.png" alt="buscar" />
                    </button>
                    {/* <button className="addUser">
                        <img src="src/img/addUser.png" alt="adduser" />
                    </button> */}
                </nav>

            </div>
            <div className="body">
                <div className="menu">
                    <ul>
                    {categories.map((category) => (
                        <li key={category.id} onClick={() => handleCategoryChange(category)}>{category.name}</li>))}
                    </ul>
                </div>
                <div className="productos">
                    {filteredProducts.map((producto) => (
                        <div key={producto.id}>
                            <img src={producto.pathImg} alt={producto.name} />
                            <p>{producto.name}</p>
                            <p>{producto.price}</p>
                            <button className="add">
                                <img src="src/img/add40.png" alt="add" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;