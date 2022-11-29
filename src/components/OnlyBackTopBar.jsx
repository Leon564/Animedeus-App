import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  useNavigate,
  useParams,
  useRoutes,
  useLocation,
} from "react-router-native";
import theme from "../theme";
import StyledText from "./StyledText";

const OnlyBackTopBar = ({ title, backgroundColor, style }) => {
  const navigate = useNavigate();

  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: backgroundColor || theme.backgroundColors.darkPrimary,
        ...style,
      }}
    >
      <TouchableOpacity
        style={styles.headerButton}
        //onPress={() => navigate({ search: "",pathname:from.pathname })}
        onPress={() => navigate(-1)}
        //onPress={() => navigate(-1,{search:""}) /*setHidden()*/}
      >
        <Icon
          style={styles.headerButtonText}
          name={theme.icons.back}
          size={theme.iconsSizes.large}
          color="#fff"
        />
      </TouchableOpacity>
      <StyledText
        style={styles.appTitle}
        fontWeight={"title"}
        numberOfLines={1}
      >
        {title}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //backgroundColor: theme.backgroundColors.darkPrimary,

    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginTop: 0,
    width: "100%",
  },

  headerButton: {
    //backgroundColor: "#613acf",
    width: "15%",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },
  headerButtonText: {
    color: "#fff",
    fontSize: theme.fontSizes.subheading,
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  navButtons: {
    flexDirection: "row",
    width: "15%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    //backgroundColor: "#613acf",
  },
  navButton: {
    //backgroundColor: "#613acf",
    width: "85%",
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    height: "100%",
  },

  appTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    width: "70%",
  },
});
export default OnlyBackTopBar;
