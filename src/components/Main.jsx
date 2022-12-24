import React, { useContext, useEffect } from "react";
import { View, StyleSheet, BackHandler, Alert } from "react-native";
import {
  Route,
  Navigate,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";
import AnimeRecentList from "./AnimeRecentList";
import { StatusBar } from "expo-status-bar";
import AppBar from "./AppBar";
import Chat from "./Chat";
import Anime from "./Anime";
import Player from "./Player";
import Directory from "./Directory";
import Episodes from "./Episodes";
import Configurations from "./Configurations";
import FeaturedError from "./FeaturedError";
import SlideMenuModal from "./SlideMenuModal";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
//import useAuth from "../hooks/useAuth";
import useBackButton from "../hooks/useBackButton";
import LogOut from "./LogOut";
import {AuthContext} from "./AuthContext";
import MyAnimes from "./MyAnimes";

const Main = () => {
  const [history, setHistory] = React.useState([]);
  const [slideMenu, setSlideMenu] = React.useState(false);
  //const {user, authStatus} = useAuth();
  const {user, isLoggedIn,...conetc}=useContext(AuthContext);
 // console.log({conetc});

  useBackButton();
  
  //return (<Login/>);
  //const user = true;
  //const user  = useAuth();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppBar slideMenu={() => setSlideMenu(true)} />
      <SlideMenuModal
        visible={slideMenu}
        onRequestClose={() => setSlideMenu(false)}
      />
      <Routes>
        <Route element={<ProtectedRoute user={user} authStatus={isLoggedIn}/>}>
          <Route path="/" element={<AnimeRecentList />} />
          <Route path="/anime/:slug" element={<Anime />} />
          <Route
            path="/player/:slug/:episodeNumber"
            element={<Player from={history[history.length - 2]} />}
          />
          <Route path="/episodes/:slug" element={<Episodes />} />
          <Route
            path="/directory"
            element={<Directory from={history[history.length - 2]} />}
          />
          <Route path="/options" element={<Configurations />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/logout" element={<LogOut/>} />
          <Route path="/favorites" element={<MyAnimes />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="*" element={<FeaturedError />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: theme.backgroundColors.darkPrimary,
    alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Main;
