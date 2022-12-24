//import useAuth from "../hooks/useAuth";

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const LogOut = () => {
  const { logout } = useContext(AuthContext);

  logout();
  return null;
};

export default LogOut;
