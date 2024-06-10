// import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import Protected from "./routes/Protected";
// import NotFound from "./routes/NotFound";
// import ProductDetails from "./components/ProductDetails/ProductDetails";

const App = () => {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Protected />,
  //     children: [
  //       {
  //         path: "/",
  //         element: <Home />,
  //       },
  //       { path: "/product/:id", element: <ProductDetails /> },
  //     ],
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
  // ]);
  // return (
  //   <div className="d-flex flex-column align-items-center">
  //     <RouterProvider router={router} />
  //   </div>
  // );

  return (
    <div>
      <Login />
      <Register />
      <Home />
    </div>
  )

}

export default App
