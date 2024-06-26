import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addProductToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <Home addProductToCart={addProductToCart} /> },
    { path: "/register", element: <Register /> },
    { path: "/cart", element: <Cart cartItems={cartItems} removeFromCart={removeFromCart} /> }
  ]);

  return (
    <div className="d-flex flex-column align-items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
