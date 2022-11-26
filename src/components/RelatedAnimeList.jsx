import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import RelatedAnimeCard from "./RelatedAnimeCard";
import StyledText from "./StyledText";

const RelatedAnimeList = ({ related }) => {  
    if(!related || related.length === 0 ) return null;
    return (
        <View style={styles.relatedSection}>
        <StyledText
          fontWeight="bold"
          fontSize="subheading"
          style={styles.relatedText}
        >
          Animes relacionados
        </StyledText>

        <FlatList
          style={styles.relatedContainer}
          data={related}
          renderItem={({ item }) => <RelatedAnimeCard item={item} />}
          keyExtractor={(item) => item.slug}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    relatedSection: {
        width: "100%",
        height: "auto",
        marginTop: 10,
        backgroundColor: theme.backgroundColors.darkPrimary,
        //padding: 10,
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
})

export default RelatedAnimeList