import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import AuthLayout from "../Layouts/AuthLayout";
import AboutUs from "../Pages/AboutUs/AboutUs";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import CreateService from "../Pages/Dashboard/CreateService/CreateService";
import ServicesDisplay from "../Pages/ServicesDisplay/ServicesDisplay";
import HandleServices from "../Pages/Dashboard/HandleServices/HandleServices";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import Payment from "../Pages/Dashboard/Payment/Payment";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            Component:Home
        },
        {
        path:"about",
        element:<AboutUs></AboutUs>
      },
      {
        path:"service-display",
        element:<ServicesDisplay></ServicesDisplay>
      },
      {
        path:"service-details/:id",
        element:<ServiceDetails></ServiceDetails>
      }

    ]
  },

  {
    path:"/",
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:"login",
        element:<Login></Login>
      },
      {
        path:"register",
        element:<Register></Register>
      }
    ]
  },

  {
    path:"dashboard",
    element:<PrivateRoute>
      <Dashboard></Dashboard>
    </PrivateRoute>,
    children:[
      {
        path:"my-profile",
        element:<MyProfile></MyProfile>

      },
      {
        path:"manage-users",
        element: <AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path:"create-service",
        element:<AdminRoute>
          <CreateService></CreateService>
        </AdminRoute>
      },
      {
        path:"handle-service",
        element:<AdminRoute>
         <HandleServices></HandleServices>
        </AdminRoute>
      },
      {
        path:"my-bookings",
        element:<MyBookings></MyBookings>
      },
      {
        path:"payment/:bookingId",
        element:<Payment></Payment>
      },
    ]
    }
]);