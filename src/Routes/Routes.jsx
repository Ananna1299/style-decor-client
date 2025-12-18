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
import PaymentSuccessful from "../Pages/Dashboard/PaymentSuccessful/PaymentSuccessful";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel/PaymentCancel";
import UserRoute from "./UserRoute";
import ApproveDecorators from "../Pages/Dashboard/ApproveDecorators/ApproveDecorators";
import DeleteDisabled from "../Pages/Dashboard/DeleteDisabled/DeleteDisabled";
import AssignDecorator from "../Pages/Dashboard/AssignDecorator/AssignDecorator";
import DecoratorRoute from "./DecoratorRoute";
import AssignedWork from "../Pages/Dashboard/AssignedWork/AssignedWork";
import TodaySchedule from "../Pages/Dashboard/TodaySchedule/TodaySchedule";
import CompletedWorks from "../Pages/Dashboard/CompleteWorks/CompletedWorks";
import Coverage from "../Pages/Coverage/Coverage";
import Revenue from "../Pages/Dashboard/Revenue/Revenue";
import ErrorPage from "../Components/ErrorPage/ErrorPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<ErrorPage></ErrorPage>,
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
      },
      {
        path:"coverage",
        element:<Coverage></Coverage>,
        loader: ()=> fetch("../coveredAreas.json")
      }
      

    ]
  },

  {
    path:"/",
    element:<AuthLayout></AuthLayout>,
    errorElement:<ErrorPage></ErrorPage>,
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
    errorElement:<ErrorPage></ErrorPage>,
    children:[
       { index: true, 
        element:<DashboardHome></DashboardHome>
       },
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

      {
        path:"payment-success",
        element:<PaymentSuccessful></PaymentSuccessful>
      },
      {
        path:"payment-history",
        element:<UserRoute>
          <PaymentHistory></PaymentHistory>
        </UserRoute>
          
      
      },
      {
        path:"payment-cancel",
        element:<PaymentCancel></PaymentCancel>
      },
      {
        path:"approve-decorators",
        element:<AdminRoute>
          <ApproveDecorators></ApproveDecorators>
        </AdminRoute>
      },
      {
        path:"delete-decorators",
        element:<AdminRoute>
          <DeleteDisabled></DeleteDisabled>
        </AdminRoute>
      },
      {
        path:"assign-decorators",
        element:<AdminRoute>
          <AssignDecorator></AssignDecorator>
        </AdminRoute>
      },
      {
        path:"assigned-work",
        element:<DecoratorRoute>
          <AssignedWork></AssignedWork>
        </DecoratorRoute>
      },
      {
        path:"todays-schedule",
        element:<DecoratorRoute>
        <TodaySchedule></TodaySchedule>
        </DecoratorRoute>
      },
      {
        path:"completed-works",
        element:<DecoratorRoute>
          <CompletedWorks></CompletedWorks>
        </DecoratorRoute>
      },
      {
        path:"revenue",
        element:<AdminRoute>
          <Revenue></Revenue>
        </AdminRoute>
      }
    ]
    }
]);