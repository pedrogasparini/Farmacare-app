import HomeAdmin from "./components/HomeAdmin/HomeAdmin";
import HomeClient from "./components/HomeClient/HomeClient";
import HomeSysadmin from "./components/HomeSysadmin/HomeSysadmin";
import Login from "./components/Login/Login";

import Register from "./components/Register/Register";






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
      element: <Protected allowedRoles={["homeclient"]} />,
      children: [
        {
          path: "/HomeClient",
          element: <HomeClient />,
        }
      ],
    },
    {
      path: "/",
      element: <Protected allowedRoles={["homeAdmin"]} />,
      children: [
        {
          path: "/homeAdmin",
          element: <HomeAdmin />,
        }
      ],
    },
    {
      path: "*",
      element: <Landing />,
    },
    {
      path: "/",
      element: <Protected allowedRoles={["HomeSysadmin"]} />,
      children: [
        {
          path: "/homeSysadmin",
          element: <HomeSysadmin />,
        }
      ],
    },

    {
      path: "/register",
      element: <Register />
    },
  

  ]);

  return (
    <TraductionDictionaryProvider>
      <RouterProvider router={router} />
    </TraductionDictionaryProvider>
  );
}

export default App;
