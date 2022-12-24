import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import { useLocation, useNavigate } from "react-router-native";

export default function useBackButton() {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {     
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
  
}
