import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import ConfirmAccount from "./views/ConfirmAccount";
import RouteProtected from "./layouts/RouteProtected";
import DashBoard from "./views/DashBoard";
import ViewPatients from "./views/ViewPatients";
import AddMedicalHisotory from "./views/AddMedicalHisotory";
import ViewHistories from "./views/ViewHistories";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/registrarse",
        element: <Register />,
      },
      {
        path: "/confirmar-cuenta",
        element: <ConfirmAccount />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RouteProtected />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "/dashboard/pacientes",
        element: <ViewPatients />,
      },
      {
        path: "/dashboard/historias/ver-historias",
        element:<ViewHistories />
      },
      {
        path: "/dashboard/historias/agregar-historia",
        element: <AddMedicalHisotory />,
      },
    ],
  },
]);
