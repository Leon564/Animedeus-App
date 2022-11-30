import Constants from "expo-constants";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import StyledText from "./StyledText";
import theme from "../theme";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Configurations = () => {
  const [status, setStatus] = React.useState("loading");
  const [darkMode, setDarkMode] = React.useState(false);
  const [localPlayer, setLocalPlayer] = React.useState(false);
  const [notifications, setNotifications] = React.useState(false);

  useEffect(() => {
    const fetchConfigurations = async () => {
      try {
        const userOptions = await AsyncStorage.getItem("userOptions");
      
        const parsedUserOptions = JSON.parse(userOptions);
        setDarkMode(parsedUserOptions.darkMode);
        setLocalPlayer(parsedUserOptions.localPlayer);
        setNotifications(parsedUserOptions.notifications);
        setStatus("success");
      } catch (error) {
        const userOptions = {
          darkMode: false,
          localPlayer: false,
          notifications: false,
        };
        await AsyncStorage.setItem(
          "userOptions",
          JSON.stringify(userOptions)
        );
        setDarkMode(userOptions.darkMode);
        setLocalPlayer(userOptions.localPlayer);
        setNotifications(userOptions.notifications);
        setStatus("success");
      }
    };
    fetchConfigurations();
  }, []);

  const saveConfigurations = async () => {
    try {
      const userOptions = {
        darkMode,
        localPlayer,
        notifications,
      };
      await AsyncStorage.setItem("userOptions", JSON.stringify(userOptions));
      ToastAndroid.show("Los cambios se han guardado con exito.", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  };

  const toggleOption = (option) => {
    switch (option) {
      case "darkMode":
        setDarkMode(!darkMode);
        break;
      case "localPlayer":
        setLocalPlayer(!localPlayer);
        break;
      case "notifications":
        setNotifications(!notifications);
        break;
    }
  };

  if (status === "error") return <StyledText color="white">Error</StyledText>;
  if (status === "loading")
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000f" />
        <StyledText color="secondary" align={"center"}>
          Loading...
        </StyledText>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <StyledText color="white">Dark Mode</StyledText>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={darkMode ? theme.colors.extras : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleOption("darkMode")}
          value={darkMode}
        />
      </View>
      <View style={styles.option}>
        <StyledText color="white">¿Usar un reproductor externo?</StyledText>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={localPlayer ? theme.colors.extras : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleOption("localPlayer")}
          value={localPlayer}
        />
      </View>
      <View style={styles.option}>
        <StyledText color="white">Notificaciones</StyledText>
        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={notifications ? theme.colors.extras : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleOption("notifications")}
          value={notifications}
        />
      </View>

      <TouchableOpacity onPress={saveConfigurations} style={styles.saveButton}>
        <StyledText color="white">Save</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //height: "auto",
    width: "100%",
    padding: 10,
    backgroundColor: theme.backgroundColors.darkSecondary,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    
  },
  saveButton: {
    backgroundColor: theme.colors.extras,
    padding: 10,
    margin: 10,
    width: "50%",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Configurations;
