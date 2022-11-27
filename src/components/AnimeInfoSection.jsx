import { Image, StyleSheet, View } from "react-native";
import useJikanAired from "../hooks/useJikanAired";
import theme from "../theme";
import StyledText from "./StyledText";

const AnimeInfo = ({ anime }) => {
  
    const aired = useJikanAired(anime?.jikan?.aired);

  return (
    <View style={styles.infoContainer}>
      <View style={styles.coverSection}>
        <Image
          style={styles.coverImage}
          source={{
            uri: anime?.jikan?.images?.jpg?.large_image_url || anime?.cover,
          }}
        />
      </View>
      <View style={styles.infoSection}>
        <StyledText fontWeight="bold" fontSize="title" style={styles.info}>
          {anime?.jikan?.title || anime?.title}
        </StyledText>
        <StyledText fontWeight="bold" fontSize="subTitle" style={styles.info}>
          {aired}
        </StyledText>
        <StyledText fontWeight="bold" fontSize="subTitle" style={styles.info}>
          {anime?.jikan?.type || anime.type}
        </StyledText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default AnimeInfo;
