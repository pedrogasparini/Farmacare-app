import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeClient from './components/Client/HomeClient/HomeClient';
import HomeAdmin from './components/Admin/HomeAdmin/HomeAdmin';
import HomeSysadmin from './components/SysAdmin/HomeSysadmin/HomeSysadmin';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Protected from "./routes/Protected";
import NotFound from "./routes/NotFound";
import Cart from './components/Client/Cart/Cart';
import CartPage from './components/Client/Cart/CartPage';
import OrderHistory from './components/Client/OrderHistory/OrderHistory';
import UserList from './components/SysAdmin/UserList/UserList';
import UsersHistory from './components/SysAdmin/UsersHistory/UsersHistory';

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
          element: <HomeSysadmin />,
        }
      ],
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/history",
      element: <OrderHistory />,
    },
    {
      path:"/userList",
      element: <UserList />
    },
    {
      path: "/users-history",
      element: <UsersHistory/>
    }
  ]);

  return (
      
      <RouterProvider router={router} />
      
  );
}

export default App;
