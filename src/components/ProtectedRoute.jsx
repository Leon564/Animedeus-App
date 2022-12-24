import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-native";
//import useAuth from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({  redirectPath = "/login"/*, user, authStatus */ }) => {
  //const username = user?.username;
  //const { user, authStatus } = useAuth();
  const { user, authStatus } = useContext(AuthContext);
  console.log({user, authStatus});
  if (!user && authStatus === "idle") {
    return null;
  }
  if (!user && authStatus === "unauthenticated") {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
