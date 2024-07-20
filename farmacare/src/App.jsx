import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeAdmin from "./components/HomeAdmin/HomeAdmin";
import HomeClient from "./components/HomeClient/HomeClient";
import HomeSysAdmin from "./components/HomeSysadmin/HomeSysadmin";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Protected from "./routes/Protected";
import NotFound from "./routes/NotFound";
import Cart from "./components/Cart/Cart";
import PurchaseHistory from "./components/PurchaseHistory/PurchaseHistory";
import { TranslateContextProvider } from './custom/TranslateContext';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <Protected allowedRoles={["client"]} />,
      children: [
        {
          path: "/HomeClient",
          element: <HomeClient />,
        }
      ],
    },
    {
      path: "/",
      element: <Protected allowedRoles={["admin"]} />,
      children: [
        {
          path: "/homeAdmin",
          element: <HomeAdmin />,
        }
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Protected allowedRoles={["sysAdmin"]} />,
      children: [
        {
          path: "/homeSysadmin",
          element: <HomeSysAdmin />,
        }
      ],
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/history",
      element: <PurchaseHistory />,
    }
  ]);

  return (
    <TranslateContextProvider>
      <RouterProvider router={router} />
    </TranslateContextProvider>
  );
}

export default App;
