import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import slideMenuItems from "../data/slideMenuItems";
import theme from "../theme";
import StyledText from "./StyledText";

const SlideMenuList = ({ hideMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handlePress = (item) => {
    hideMenu();
    navigate({ search: location.search.replace("slide_menu=true", "") });
    navigate(item.path);
  };
  return (
    <FlatList
      data={slideMenuItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(item)}
        >
          <StyledText style={styles.buttonText}>{item.title}</StyledText>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buttonText: {
    color: theme.colors.textPrimary,
  },
});

export default SlideMenuList;
