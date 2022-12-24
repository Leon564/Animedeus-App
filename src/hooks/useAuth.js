import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from "react-router-native";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("idle");
  //const [_username, setUsername] = useState("guest")
  const navigate = useNavigate();

  useEffect(() => {
    AsyncStorage.getItem("@auth:username").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
        setAuthStatus("authenticated");
        navigate(0);
        return;
      }
      console.log("useAuth: useEffect: user: ", user);
      setAuthStatus("unauthenticated");
      navigate(0)

    });
  }, [/*username*/]);

  const login = async ({ username, token }) => {
    await AsyncStorage.setItem("@auth:username", JSON.stringify(username));
    await AsyncStorage.setItem("@auth:access_token", token);
    setUser(username);
   // setUsername(username)
    setAuthStatus("authenticated");
    navigate("/");
    return;
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@auth:username");
    await AsyncStorage.removeItem("@auth:access_token");
    setUser(null);
    setAuthStatus("unauthenticated");
    navigate("/login");
    return;
  };

  return { user, authStatus, login, logout };
}
