import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { playVideo } from "../playVideo";
import theme from "../theme";
import StyledText from "./StyledText";
import { useNavigate } from "react-router-native";
import useZippyshare from "../hooks/useZippyshare";
import { useState } from "react";
import useTimeAgo from "../hooks/useTimeAgo";
const AnimeItem = ({ item }) => {
  const navigate = useNavigate();
  //const timeAgo = useTimeAgo(item.episodes[0].date);
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
  const getAnimeInfo = () => {
    navigate(`/anime/${item.slug}?page_title=${item.title}`);
   //Alert.alert("Error", "No se pudo reproducir el video");
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => getAnimeInfo()}>
      <Image style={styles.image} source={{ uri: item.cover }} />
      <View style={styles.episodeDetails}>
        <StyledText numberOfLines={1} fontWeight={"bold"} color="white">
          {item.title}
        </StyledText>
        <StyledText
          numberOfLines={1}
          color="white"
          style={{ marginVertical: 10 }}
        >
          {`Tipo: ${item.type}`}
        </StyledText>
        <StyledText numberOfLines={1} color="white" fontSize={"subTitle"}>
          {`Estado: ${item.status == "Finished" ? "Finalizado" : "En emision"}`}
        </StyledText>
      </View>
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
  },
  image: {
    //height: 150,
    //width: 100,
    height: 150,
    width: "30%",
    resizeMode: "cover",
  },
  episodeDetails: {
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "70%",
  },
});

export default AnimeItem;
