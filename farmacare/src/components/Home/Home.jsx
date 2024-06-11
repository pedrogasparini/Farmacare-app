import React from "react";
import "./Home.css";

const Home = () => {

    


    return (
      <div >
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
    );
  };
  
  export default Home;