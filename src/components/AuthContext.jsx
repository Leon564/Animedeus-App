import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocation, useNavigate } from "react-router-native";
import { Alert } from "react-native";

const API_URL = process.env.API_URL || "http://localhost:3000";

const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
  authStatus: "idle",
  getToken: async () => {},
  addFavorite: async (slug) => {},
  checkAnime: async (slug) => {},
  removeFavorite: async (slug) => {},
  removeFromList: async (slug) => {},
  getUserAnimes: async (type) => {},
  getUserFavorites: async () => {},
});

function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState("idle");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    AsyncStorage.getItem("@auth:username").then((user) => {
      if (user) {
        setUser(JSON.parse(user));
        setIsLoggedIn(true);
        setAuthStatus("authenticated");
        //navigate(0);
        return;
      }
      //console.log("useAuth: useEffect: user: ", user);
      setAuthStatus("unauthenticated");
      // navigate(0)
      if (location.pathname !== "/login" && location.pathname !== "/signup") {
        navigate("/login");
      }
    });
  }, [location]);

  const login = async ({ username, password }) => {
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.error) {
          Alert.alert("Error", data.message[0]);
        } else {
          //console.log(data);
          //login({ token: data.access_token, username: data.user.username });
          //navigate("/");
          await AsyncStorage.setItem(
            "@auth:username",
            JSON.stringify(data.user.username)
          );
          await AsyncStorage.setItem("@auth:access_token", data.access_token);
          setUser(username);
          // setUsername(username)
          setAuthStatus("authenticated");
          navigate("/");
          return;
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("@auth:username");
    await AsyncStorage.removeItem("@auth:access_token");
    setUser(null);
    setAuthStatus("unauthenticated");
    navigate("/login");
    return;
  };

  const getToken = async () => {
    const token = await AsyncStorage.getItem("@auth:access_token");
    //console.log("token: ", token);
    return token;
  };

  const addFavorite = async (slug) => {
    const data = await fetch(`${API_URL}/users/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        anime: slug,
      }),
    });
    const res = await data.json();
    //console.log("res: ", res);
    return res;
  };

  const removeFavorite = async (slug) => {
    const data = await fetch(`${API_URL}/users/favorite`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        anime: slug,
      }),
    });
    const res = await data.json();
    //console.log("res: ", res);
    return res;
  };

  const removeFromList = async (slug) => {
    const data = await fetch(`${API_URL}/users/anime/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      body: JSON.stringify({
        anime: slug,
      }),
    });
    const res = await data.json();
    //console.log("res: ", res);
    return res;
  };

  const checkAnime = async (slug) => {
    const data = await fetch(`${API_URL}/users/anime/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    const res = await data.json();
    const keys = Object.keys(res);
    //console.log({res});
    let result = { favorite: res?.favorites?.length > 0 };
    keys.forEach((key) => {
      if (res[key].length !== 0 && key !== "favorites") result["saved"] = true;
    });
    //console.log({ result});
    return result;
  };

  const getUserAnimes = async (type) => {
    //const data = await fetch(`${API_URL}/users/animes/`, {
    const data = await fetch(`${API_URL}/users/animes/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    const res = await data.json();
    console.log({ res });
    return res;
  };

  const getUserFavorites = async () => {
    const data = await fetch(`${API_URL}/users/favorite/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    const res = await data.json();
    console.log({ res });
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,
        authStatus,
        getToken,
        addFavorite,
        checkAnime,
        removeFavorite,
        removeFromList,
        getUserAnimes,
        getUserFavorites,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
