import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import RelatedAnimeCard from "./RelatedAnimeCard";
import StyledText from "./StyledText";

const RelatedAnimeList = ({ related }) => {
  if (!related || related.length === 0) return null;
  return (
    <View style={styles.relatedSection}>
      <StyledText
        fontWeight="bold"
        fontSize="subheading"
        style={styles.relatedText}
      >
        Animes relacionados
      </StyledText>

      <View style={styles.relatedList}>
        <FlatList
          style={styles.relatedContainer}
          data={related}
          keyExtractor={({ slug }, index) => index}
          renderItem={({ item }) => (
            <RelatedAnimeCard key={item.slug} item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  relatedSection: {
    width: "100%",
    height: "auto",
    marginTop: 10,
    backgroundColor: theme.backgroundColors.darkPrimary,
    //padding: 10,
  },
  relatedList: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  relatedContainer: {
    width: "100%",
    height: "auto",
    marginTop: 10,
    //backgroundColor: "red",
    backgroundColor: theme.backgroundColors.darkPrimary,
    padding: 10,
  },

  relatedText: {
    backgroundColor: theme.backgroundColors.darkSecondary,
    padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default RelatedAnimeList;
