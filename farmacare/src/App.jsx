import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import Protected from "./routes/Protected";
// import NotFound from "./routes/NotFound";
// import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/home", element: <Home /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <div>
      <Login />
      {<RouterProvider router={router} />}
    <div/>
  );
} 

export default App;
