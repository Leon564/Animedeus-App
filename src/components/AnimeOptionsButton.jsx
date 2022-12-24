import AsyncStorage from "@react-native-async-storage/async-storage";
import react from "react";
import { Alert, StyleSheet, TouchableOpacity, View, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import AnimeOptionsModal from "./AnimeOptionsModal";
import { AuthContext } from "./AuthContext";

const AnimeOptionsButton = ({ anime }) => {
  const [modalVisible, setModalVisible] = react.useState(false);
  const [buttonsVisible, setButtonsVisible] = react.useState(false);
  const [isFavorite, setIsFavorite] = react.useState(false);
  const [isSaved, setIsSaved] = react.useState(false);


  const  navigate  = useNavigate();

  const { addFavorite, checkAnime, removeFavorite, removeFromList } = react.useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setButtonsVisible(false);
  };

  const toggleButtons = () => {
    setButtonsVisible(!buttonsVisible);
  };

  react.useEffect(() => {
    checkFav();
  }, []);


  const checkFav = () => {
    checkAnime(anime?.slug).then((res) => {
      if (res.favorite) {
        setIsFavorite(true);
      }
      if (res.saved) {
        setIsSaved(true);
      }
    });

    /*
    AsyncStorage.getItem("@favorites").then((favorites) => {
      if (favorites) {
        console.log({favorites});
        const parsedFavorites = JSON.parse(favorites);
        const isFavorite = parsedFavorites.find(
          (favorite) => favorite === anime.slug
        );
        if (isFavorite) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } else {
        setIsFavorite(false);
      }
    });
    */
  };

  const saveFavorite = () => {
    addFavorite(anime?.slug);
    setIsFavorite(true);
    toggleButtons();
    /*AsyncStorage.getItem("@favorites").then((favorites) => {
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        const isFavorite = parsedFavorites.find(
          (favorite) => favorite.slug === anime.slug
        );
        if (isFavorite) {
          const filteredFavorites = parsedFavorites.filter(
            (favorite) => favorite.slug !== anime.slug
          );
          AsyncStorage.setItem(
            "@favorites",
            JSON.stringify(filteredFavorites)
          ).then(() => {
            //Alert.alert("Removed from favorites");
            setIsFavorite(false);
            toggleButtons();
          });
        } else {
          parsedFavorites.push(anime);
          AsyncStorage.setItem(
            "@favorites",
            JSON.stringify(parsedFavorites)
          ).then(() => {
            //Alert.alert("Added to favorites");
            AsyncStorage.setItem("@favorites", JSON.stringify([anime])).then(
              () => {
                setIsFavorite(true);
                toggleButtons();
              }
            );
          });
        }
      } else {
        AsyncStorage.setItem("@favorites", JSON.stringify([anime])).then(() => {
          //Alert.alert("Added to favorites");
          setIsFavorite(true);
          toggleButtons();
        });
      }
    });
    */
  };

  const unsave = () => {
  
    removeFromList(anime?.slug);
    setIsSaved(false);
    toggleButtons();
  
  }
  const SavedButton = () => {
    if (!isSaved) {
      return (
        <TouchableOpacity
        style={{ ...styles.Button, display: buttonsVisible ? "flex" : "none" }}
        onPress={() => toggleModal()}
      >
        <Icon
          style={styles.headerButtonText}
          name={theme.icons.list}
          color="#fff"
        />
      </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity
      style={{ ...styles.Button, display: buttonsVisible ? "flex" : "none" }}
      onPress={() => unsave()}
    >
      <Icon
        style={styles.headerButtonText}
        name={theme.icons.delete}
        color="#fff"
      />
    </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => toggleButtons() /*toggleModal()*/}
      >
        <Icon
          style={styles.headerButtonText}
          name={buttonsVisible ? theme.icons.times : theme.icons.add}
          color="#fff"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.Button, display: buttonsVisible ? "flex" : "none" }}
        onPress={() => saveFavorite()}
      >
        <Icon
          style={styles.headerButtonText}
          name={theme.icons.heart}
          solid={isFavorite}
          color="#fff"
        />
      </TouchableOpacity>
     
     <SavedButton saved={isSaved} />
     
      <AnimeOptionsModal
        visible={modalVisible}
        onRequestClose={() => toggleModal()}
        anime={anime}
        setSaved = {setIsSaved}
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
    //marginEnd: 20,
    marginTop: -30,
    padding: 0,
  },
  Button: {
    backgroundColor: theme.colors.extras,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    //marginTop: -25,
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: theme.fontSizes.subheading,
  },
});

export default AnimeOptionsButton;
