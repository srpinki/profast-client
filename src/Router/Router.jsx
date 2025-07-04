import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Authorization/Login";
import Register from "../Pages/Authorization/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../Routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import Myparcels from "../Pages/Dashboard/Myparcels/Myparcels";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('../warehouses.json')
      },
      {
        path: '/send-parcel',
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
        loader: () => fetch('../warehouses.json')
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes>
      <DashboardLayout></DashboardLayout>
    </PrivateRoutes>,
    children: [
      {
        path: 'my-parcels',
        Component: Myparcels
      }
    ]
  }
]);
