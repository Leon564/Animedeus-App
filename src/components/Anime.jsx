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
import { useNavigate, useParams } from "react-router-native";
import useFetch from "../hooks/useFetch";
import theme from "../theme";

import StyledText from "./StyledText";
import RelatedAnimeList from "./RelatedAnimeList";
import AnimeInfo from "./AnimeInfoSection";
import AnimeDescriptionSection from "./AnimeDescriptionSection";
import AnimeScoreSection from "./AnimeScoreSection";
import AnimeExtraInfoSection from "./AnimeExtraInfoSection";
import AnimeOptionsButton from "./AnimeOptionsButton";


const API_URL = process.env.API_URL || "http://localhost:3000";

const Anime = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { data, status } = useFetch(`${API_URL}/animes/` + slug);
  //console.log(data.error ? "error" : data);

  if (status !== "success") return <Text>Loading...</Text>;

  if (data.error) return <StyledText>Error: Anime no encontrado</StyledText>;
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;
  //console.log(imageHeight, imageWidth);
  //
  let banner = data.banner;
  if (
    banner.includes("x1080.jpg") &&
    data?.jikan?.trailer?.images?.large_image_url
  )
    banner = data?.jikan?.trailer?.images?.large_image_url;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          style={{ height: imageHeight, width: imageWidth }}
          //source={{ uri: data?.jikan.images.jpg.large_image_url }}
          source={{
            uri: banner,
          }}
        />
      </View>

      <AnimeInfo anime={data}>
        <AnimeOptionsButton anime={data} />
      </AnimeInfo>
      <AnimeDescriptionSection anime={data} />
      <AnimeScoreSection anime={data} />

      <AnimeExtraInfoSection anime={data} />

      <View style={styles.episodesSection}>
        <TouchableOpacity
          onPress={() =>
            navigate(`/episodes/${data.slug}?page_title=${data.title}`)
          }
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
    backgroundColor: "gray",
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
