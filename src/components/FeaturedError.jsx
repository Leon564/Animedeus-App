import { Alert } from "react-native";
import { useNavigate } from "react-router-native";

const FeaturedError = ({ error = "Error" }) => {
  const navigate = useNavigate();
  Alert.alert(
    "Ups!",
    "Parece que esta función no está disponible en esta versión",
    [{ text: "OK", onPress: () => navigate(-1) }]
  );
  return null;
};

export default FeaturedError;