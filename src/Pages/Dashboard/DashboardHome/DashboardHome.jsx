import React from "react";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/Loder/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import DecoratorDashBoard from "./DecoratorDashBoard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { isLoading, role } = useRole();

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  }
  if (role === "decorator") {
    return <DecoratorDashBoard></DecoratorDashBoard>
  }

   if (role === "user") {
    return <UserDashboard></UserDashboard>
  }
};

export default DashboardHome;
