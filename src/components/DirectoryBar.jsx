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

const DirectoryBar = ({from}) => {
  const [value, onChangeText] = React.useState("");
  const navigate = useNavigate();

  const resetSearch = () => {
    onChangeText("");
    navigate({ search: "?bar_display=none"});
  };
  
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigate({ search: "",pathname:from })}
        //onPress={() => navigate("/")}
        //onPress={() => navigate(-1,{search:""}) /*setHidden()*/}
      >
        <Icon
          style={styles.headerButtonText}
          name={theme.icons.back}
          size={theme.iconsSizes.large}
          color="#fff"
        />
      </TouchableOpacity>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeText(text)}
          value={value}
          placeholder="Search"
          placeholderTextColor={theme.colors.textSecondary}
          returnKeyType="search"
          onSubmitEditing={() => navigate({ search: "?bar_display=none&q=" + value })}
        />
      </View>
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => resetSearch()}
        >
          <Icon
            style={{
              ...styles.headerButtonText,
              display: value ? "flex" : "none",
            }}
            name={theme.icons.close}
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
    height: 50,
    marginTop: 0,
    width: "100%",
  },
  inputArea: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  input: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
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
    width: "70%",
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
export default DirectoryBar;
