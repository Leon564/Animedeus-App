import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { playVideo } from "../playVideo";
import theme from "../theme";
import StyledText from "./StyledText";
import { useNavigate } from "react-router-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import useZippyshare from "../hooks/useZippyshare";
import { useState } from "react";

import useTimeAgo from "../hooks/useTimeAgo";
const AnimeItem = ({ item }) => {
  const navigate = useNavigate();
  const timeAgo = useTimeAgo(item.date);
  /*
  const play = async () => {
    setLoading(true);
    const zippyshareurl = item?.episodes[0]?.downloadServers?.find(
      (server) => server.title === "Zippyshare"
    )?.url;
    if (zippyshareurl) {
      try {
        const data = await useZippyshare(zippyshareurl);
        if(!data) return Alert.alert("Error", "No se pudo reproducir el video");
        setLoading(false);
        playVideo(data);
      } catch (e) {
        console.log(e);
        Alert.alert("Error", "Something went wrong");
      }
    }
  };
  */
  const getPlayer = () => {
    navigate(
      `/player/${item.animeSlug}/${item.episodeNumber}?page_title=${item.title}`
    );
    //Alert.alert("Error", "No se pudo reproducir el video");
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => getPlayer()}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item.cover }} />
        <Icon
          style={styles.playIcon}
          name={theme.icons.play_circle}
          color="#fff"
        />
      </View>
      <TouchableOpacity style={styles.infoContainer} onPress={() => navigate(`/anime/${item.animeSlug}`)}>
        
          <View style={styles.episodeDetails}>
            <StyledText numberOfLines={1} fontWeight={"bold"} color="white">
              {item.animeTitle}
            </StyledText>
            <StyledText
              numberOfLines={1}
              color="white"
              style={{ marginVertical: 10 }}
            >
              {`Episodio: ${item.episodeNumber}`}
            </StyledText>
            <StyledText numberOfLines={1} color="white" fontSize={"subTitle"}>
              {`Hace ${timeAgo}`}
            </StyledText>
          </View>
        
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: theme.backgroundColors.darkSecondary,
    marginHorizontal: 7,
    marginTop: 7,
    height: 150,
  },
  imageContainer: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    //height: 150,
    //width: 100,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  episodeDetails: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  infoContainer: {
    width: "70%",
  },
  Buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 5,
  },

  detailsButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    position: "absolute",
    fontSize: 50,
  },
});

export default AnimeItem;
