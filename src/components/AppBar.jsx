import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  useNavigate,
  useParams,
  useRoutes,
  useLocation,
} from "react-router-native";
import config from "../config";
import theme from "../theme";

const AppBar = () => {
  const excludeRoutes = config.APPBAR_EXCLUDE_ROUTES;
  const [title, setTitle] = React.useState("AnimeDeus");
  const [display, setDisplay] = React.useState("true");

  const location = useLocation();
  useEffect(() => {
    setTitle(
      new URLSearchParams(location.search).get("page_title") || "AnimeDeus"
    );   
    if (excludeRoutes.includes(location.pathname)) {
      return setDisplay("none");
    }
    setDisplay("true");
  }, [location]);

  const navigate = useNavigate();
  
  const slideshow = () => {
    let n = location.search;
    if (n) {
      if (n.includes("slide_menu=false")) {
        n = n.replace("slide_menu=false", "slide_menu=true");
      } else {
        n = n + "&slide_menu=true";
      }
    }else{
      n = "?slide_menu=true";
    }
    navigate({
      search: n,
    });
  };

  if (display === "none") return null;
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => slideshow() /*setHidden()*/}
      >
        <Icon
          style={styles.headerButtonText}
          name={theme.icons.menu}
          size={theme.iconsSizes.large}
          color="#fff"
        />
      </TouchableOpacity>
      <View style={styles.headerText}>
        <Text numberOfLines={1} style={styles.appTitle}>
          {title}
        </Text>
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigate("/directory?bar_display=none")}
        >
          <Icon
            style={styles.headerButtonText}
            name="search"
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.backgroundColors.darkSecondary,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    marginTop: 0,
  },
  headerText: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerButton: {
    //backgroundColor: "#613acf",
    width: "20%",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  navButtons: {
    flexDirection: "row",
    width: "20%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    //backgroundColor: "#613acf",
  },
  navButton: {
    //backgroundColor: "#613acf",
    width: "50%",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },

  appTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default AppBar;
