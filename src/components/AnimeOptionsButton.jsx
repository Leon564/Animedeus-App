import react from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import theme from "../theme";
import AnimeOptionsModal from "./AnimeOptionsModal";

const AnimeOptionsButton = ({ anime }) => {
  const [modalVisible, setModalVisible] = react.useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
     
      <TouchableOpacity
        style={styles.Button}
        onPress={() => toggleModal()}
      >
        <Icon
          style={styles.headerButtonText}
          name={theme.icons.add}
          color="#fff"
        />
      </TouchableOpacity>
      <AnimeOptionsModal
        visible={modalVisible}
        onRequestClose={() => toggleModal()}
        anime={anime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignContent: "flex-end",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    //spaddingHorizontal: 10,
    marginEnd: 20,
  },
  Button: {
    backgroundColor: theme.colors.extras,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: theme.fontSizes.subheading,
  },
});

export default AnimeOptionsButton;
