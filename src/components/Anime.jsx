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
import { format } from "date-fns";
import { es } from "date-fns/locale";
import StyledText from "./StyledText";
import ReadMoreText from "./ReadMoreText";
import Icon from "react-native-vector-icons/FontAwesome5";
import RelatedAnimeList from "./RelatedAnimeList";

const Anime = () => {
  const { slug } = useParams();
  const { data, status } = useFetch(
    "https://animedeus-api.onrender.com/animes/" + slug
  );

  if (status === "error") return <Text>Error</Text>;
  if (status !== "success") return <Text>Loading...</Text>;

  const dateFormatted = (aired) => {
    if (!aired) return "No hay fecha";
    let from = "";
    if (aired.from)
      from = `Transmitido del ${format(new Date(aired.from), "dd  MMMM  yyyy", {
        locale: es,
      })}`;
    let to = "";
    if (aired.to)
      to = ` al ${format(new Date(aired.to), "dd  MMMM  yyyy", {
        locale: es,
      })}`;
    return from + to;
  };
  const StarIcon = () => {
    return (
      <>
        <Icon name="star" size={35} solid color={theme.colors.extras} />
        <Icon name="star" size={35} solid color={theme.colors.extras} />
        <Icon name="star" size={35} solid color={theme.colors.extras} />
        <Icon name="star" size={35} solid color={theme.colors.extras} />
        <Icon
          name="star-half-alt"
          size={35}
          solid
          color={theme.colors.extras}
        />
      </>
    );
  };
  const openTrailerInBrowser = () => {
    const url = data?.jikan?.trailer?.url;
    if (url) return Linking.openURL(url);
    Alert.alert("No hay trailer disponible");
    //Linking.openURL(data?.jikan?.trailer?.url);
  };

  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;

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
      <View style={styles.infoContainer}>
        <View style={styles.coverSection}>
          <Image
            style={styles.coverImage}
            source={{
              uri: data?.jikan?.images?.jpg?.large_image_url || data?.cover,
            }}
          />
        </View>
        <View style={styles.infoSection}>
          <StyledText fontWeight="bold" fontSize="title" style={styles.info}>
            {data?.jikan?.title || data?.title}
          </StyledText>
          <StyledText fontWeight="bold" fontSize="subTitle" style={styles.info}>
            {dateFormatted(data?.jikan?.aired)}
          </StyledText>
          <StyledText fontWeight="bold" fontSize="subTitle" style={styles.info}>
            {data?.jikan?.type || data.type}
          </StyledText>
        </View>
      </View>
      <View style={styles.descriptionSection}>
        <ReadMoreText
          style={styles.sinopsis}
          type="alert"
          title={data.title}
          triggerStyle={styles.trigger}
        >
          {data.sinopsis}
        </ReadMoreText>
      </View>
      <View style={styles.scoreSection}>
        <View style={styles.scoreContainer}>
          <StyledText
            fontWeight="bold"
            fontSize="subTitle"
            style={styles.scoreText}
          >
            calificación de la comunidad
          </StyledText>
          <StyledText
            fontWeight="bold"
            fontSize="bigTitle"
            style={styles.scoreText}
          >
            {parseFloat(
              Math.round((data?.jikan?.score / 10) * 5 * 100) / 100
            ).toFixed(2)}
          </StyledText>
          <StyledText
            fontWeight="bold"
            fontSize="subTitle"
            style={styles.scoreText}
          >
            {data?.jikan?.scored_by} votos
          </StyledText>
        </View>
        <View style={styles.myScoreContainer}>
          <View style={styles.myScore}>
            <StarIcon />
          </View>
          <StyledText
            fontWeight="bold"
            fontSize="subTitle"
            style={styles.scoreText}
          >
            mi calificación
          </StyledText>
        </View>
      </View>

      <View style={styles.extraInfoContainer}>
        <View style={styles.extraInfoSection}>
          <View style={styles.extraInfo50}>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Classificación
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {data?.jikan?.rating.split(" ")[0]}
              </StyledText>
            </View>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Total de episodios
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {data?.jikan?.episodes}
              </StyledText>
            </View>
          </View>

          <View style={styles.extraInfo50}>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Generos
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {data?.genres?.map((genre) => genre).join(", ")}
              </StyledText>
            </View>
            <View style={styles.extraInfoItem}>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                Duración de episodios
              </StyledText>
              <StyledText
                fontWeight="bold"
                fontSize="subTitle"
                style={styles.extrainfo}
              >
                {data?.jikan?.duration.replace("per ep", "")}
              </StyledText>
            </View>
          </View>
        </View>
        <View style={styles.trailerSection}>
          <TouchableOpacity onPress={() => openTrailerInBrowser()}>
            <StyledText
              fontWeight="bold"
              fontSize="subheading"
              style={styles.trailer}
            >
              Ver trailer
            </StyledText>
          </TouchableOpacity>
        </View>
      </View>

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
  coverSection: {
    width: "auto",
    height: "40%",
    //padding: 10,
    marginLeft: 10,
    marginTop: -40,
    // backgroundColor:theme.backgroundColors.darkPrimary,
  },
  coverImage: {
    width: 120,
    height: 200,
    resizeMode: "contain",
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
  infoContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.backgroundColors.darkSecondary,
  },
  infoSection: {
    width: "60%",
    // backgroundColor: "red",
    //height: "100%",
    //marginRight: 5,
    //paddingRight: 5,
    backgroundColor: theme.backgroundColors.darkSecondary,
  },
  info: {
    //margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  descriptionSection: {
    width: "100%",
    height: "auto",
    padding: 10,
    backgroundColor: theme.backgroundColors.darkSecondary,
  },
  sinopsis: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
  },
  trigger: {
    color: theme.backgroundColors.extras,
  },
  scoreSection: {
    width: "100%",
    height: "auto",
    padding: 10,
    //backgroundColor: "red",
    paddingTop: 20,
    flexDirection: "row",
    backgroundColor: theme.backgroundColors.darkSecondary,
  },
  scoreContainer: {
    width: "30%",
  },
  myScoreContainer: {
    width: "70%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  myScore: {
    flexDirection: "row",
    alignItems: "center",
  },
  extraInfoContainer: {
    backgroundColor: theme.backgroundColors.darkSecondary,
    width: "100%",
    height: "auto",
    marginTop: 10,
    flexDirection: "column",
  },
  extraInfoSection: {
    width: "100%",
    height: "auto",

    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
  extraInfo50: {
    width: "50%",
    height: "auto",
    padding: 10,
  },
  extraInfoItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  trailerSection: {
    width: "100%",
    height: "auto",
    padding: 10,
    alignItems: "center",
  },
  trailer: {
    color: theme.colors.extras,
    //fontSize: theme.fontSizes.body,
    textAlign: "center",
  },
  trailerButton: {
    backgroundColor: theme.backgroundColors.extras,
    padding: 10,
    borderRadius: 5,
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
