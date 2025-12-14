import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loder/Loading";
import Forbidden from "../Components/Forbidden/Forbidden";

const DecoratorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();
  //console.log(role)

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  if (role !== "decorator") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default DecoratorRoute;
