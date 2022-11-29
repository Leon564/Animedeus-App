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
import SlideMenu from "./SlideMenu";
import { StatusBar } from "expo-status-bar";
import AppBar from "./AppBar";
import Chat from "./Chat";
import Anime from "./Anime";
import Player from "./Player";
import Directory from "./Directory";
import Episodes from "./Episodes";
import Configurations from "./Configurations";
import FeaturedError from "./FeaturedError";

const Main = () => {
  const [history, setHistory] = React.useState([]);
  //const [hiddenSlide, setHiddenSlide] = React.useState(true);

  /*
  const slideMenu = () => {
    setHiddenSlide(!hiddenSlide);
  };
  */
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
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AppBar />
      <SlideMenu />
      <Routes>
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
