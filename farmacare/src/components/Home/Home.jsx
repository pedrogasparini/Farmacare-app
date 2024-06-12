import React from "react";
import "./Home.css";
import CategoriesService from "./../../services/products/categories";
import ProductsService from "../../services/products/products";

const Home = () => {


    const categoriesService = new CategoriesService();
    const productList = new ProductsService();

    const categories = categoriesService.getCategories();
    categories.push({ id: 0, name: "Todos los productos" });
    categories.sort((x, y) => x.id - y.id);

    const products = productList.getProducts();
    console.log(products);


    return (
        <div>
            <div class="header">
                <nav>
                    <button className="Logo">
                        <img src="Img/logo.png" alt="logo" />
                    </button>

                    <button className="user">
                        <img src="Img/user60x60.png" alt="Icono" />
                    </button>

                    <button className="add">
                        <img src="Img/add57.png" alt="edit" />
                    </button>
                    <button className="find">
                        <img src="Img/lupa.png" alt="lupa" />
                    </button>
                    <button className="turnos">
                        <img src="Img/buscar.png" alt="buscar" />
                    </button>
                    <button className="addUser">
                        <img src="Img/addUser.png" alt="adduser" />
                    </button>
                </nav>

            </div>
            <div class="body">
                <div class="menu">
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>{category.name}</li>
                        ))}
                    </ul>
                </div>
                <div class="">

                </div>
            </div>
        </div>
    );
};

export default Home;