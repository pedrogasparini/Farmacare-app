import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import Protected from "./routes/Protected";
// import NotFound from "./routes/NotFound";
// import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {

  const products = [
    { id: 1, name: 'Producto 1', price: 10.99, stock: 20, description: 'Descripción del producto 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Producto 2', price: 19.99, stock: 15, description: 'Descripción del producto 2', image: 'https://via.placeholder.com/150' },
    // más productos
];

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <div className="d-flex flex-column align-items-center">
      {<RouterProvider router={router} />}
      <Home products={products} />
    </div>
  );
}
export default App;
