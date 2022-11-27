import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useParams } from "react-router-native";
import useFetch from "../hooks/useFetch";
import theme from "../theme";

import StyledText from "./StyledText";
import RelatedAnimeList from "./RelatedAnimeList";
import AnimeInfo from "./AnimeInfoSection";
import AnimeDescriptionSection from "./AnimeDescriptionSection";
import AnimeScoreSection from "./AnimeScoreSection";
import AnimeExtraInfoSection from "./AnimeExtraInfoSection";

const Anime = () => {
  const { slug } = useParams();
  const { data, status } = useFetch(
    "https://animedeus-api.onrender.com/animes/" + slug
  );
  console.log(slug);
  if (status === "error") return <Text>Error</Text>;
  if (status !== "success") return <Text>Loading...</Text>;

  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;
//console.log(data)
  //console.log(imageHeight, imageWidth);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          style={{ height: imageHeight, width: imageWidth }}
          //source={{ uri: data?.jikan.images.jpg.large_image_url }}
          source={{
            uri: data?.jikan?.trailer?.images?.large_image_url || data.banner,
          }}
        />
      </View>
      <AnimeInfo anime={data} />
      <AnimeDescriptionSection anime={data} />
      <AnimeScoreSection anime={data} />

      <AnimeExtraInfoSection anime={data} />

      <View style={styles.episodesSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Episodes", { data })}
          style={styles.episodesButton}
        >
          <StyledText
            fontWeight="bold"
            fontSize="subheading"
            style={styles.episodes}
          >
            Ver episodios
          </StyledText>
        </TouchableOpacity>
      </View>
      <RelatedAnimeList related={data.related} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    //backgroundColor: theme.backgroundColors.darkSecondary,
  },
  
  banner: {
    width: "100%",
    height: 200,
  },
  bannerContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "green",
    position: "relative",
    top: 0,
  },
  
  info: {
    //margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },

  
  
  episodesSection: {
    width: "100%",
    height: "auto",
    marginTop: 10,
    backgroundColor: theme.backgroundColors.darkSecondary,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  episodesButton: {
    backgroundColor: theme.backgroundColors.extras,
    padding: 2,
    //borderRadius: 5,
    width: "90%",
  },
  episodes: {
    color: theme.colors.textPrimary,
    //fontSize: theme.fontSizes.body,
    textAlign: "center",
  },

  //related
});

export default Anime;
