import { StyleSheet, View } from "react-native";
import StyledText from "./StyledText";
import Icon from "react-native-vector-icons/FontAwesome5";
import theme from "../theme";

const AnimeScoreSection = ({ anime }) => {
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

  const score = () => {
    const data = parseFloat(
      Math.round((anime?.jikan?.score / 10) * 5 * 100) / 100
    ).toFixed(2);

    if (isNaN(data)) return "?";
    return data;
  };
  
  return (
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
          {score()}
        </StyledText>
        <StyledText
          fontWeight="bold"
          fontSize="subTitle"
          style={styles.scoreText}
        >
          {anime?.jikan?.scored_by} votos
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
  );
};

const styles = StyleSheet.create({
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
});

export default AnimeScoreSection;
