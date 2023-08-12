import { useEffect } from "react";
import { Alert, Linking } from "react-native";
import config from "../config";
//import { API_URL } from "@env";
const API_URL = process.env.API_URL || "http://localhost:3000";
const useFetchLastAppVersion = () => {
  
  const compareNewVersion = (actualVersion, newVersion) => {
    const v1Array = actualVersion.split(".");
    const v2Array = newVersion.split(".");
  
    for (let i = 0; i < v1Array.length; i++) {
      if (v1Array[i] > v2Array[i]) {
        return false;
      } else if (v1Array[i] < v2Array[i]) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const fetchLastAppVersion = async () => {
      try {
        console.log(`${API_URL}/versions/last-app-version`);
        const response = await fetch(
          `${API_URL}/versions/last-app-version`
        );
        const data = await response.json();
        if (data.version && compareNewVersion(config.APP_VERSION, data.version)) {
          Alert.alert(
            "Actualización disponible",
            `Hay una nueva versión disponible.\n\n${data.version}\n\n¿Deseas actualizarla?`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Update",
                onPress: () => {
                  Linking.openURL(data.url);
                },
              },
            ]
          );
        }
      } catch (error) {
        console.error(error);
       
      }
    };

    fetchLastAppVersion();
  }, []);
  return true;
};

export default useFetchLastAppVersion;
