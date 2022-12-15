import React, { useEffect } from "react";
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

const Main = () => {
  const [history, setHistory] = React.useState([]);
  const [slideMenu, setSlideMenu] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHistory([...history, location.pathname]);
    if (history.length > 10) {
      setHistory(history.slice(1));
    }
    const handleBackButton = () => {
      if (location.pathname === "/") {
        Alert.alert(
          "Exit App",
          "Exiting the application?", // <- this part is optional, you can pass an empty string
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },

            { text: "OK", onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        );
        return true;
      } else {
        navigate(-1);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => backHandler.remove();
  }, [location.pathname]);

  //return (<Login/>);
  const user = null;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppBar slideMenu={() => setSlideMenu(true)} />
      <SlideMenuModal
        visible={slideMenu}
        onRequestClose={() => setSlideMenu(false)}
      />
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
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
