import { StyleSheet, View } from "react-native";
import theme from "../theme";
import ReadMoreText from "./ReadMoreText";

const AnimeDescriptionSection = ({ anime }) => (
  <View style={styles.descriptionSection}>
    <ReadMoreText
      style={styles.sinopsis}
      type="alert"
      title={anime.title}
      triggerStyle={styles.trigger}
    >
      {anime.sinopsis}
    </ReadMoreText>
  </View>
);

const styles = StyleSheet.create({
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
});

export default AnimeDescriptionSection;
