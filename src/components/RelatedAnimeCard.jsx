import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "./StyledText";
import Icon from "react-native-vector-icons/FontAwesome5";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const RelatedAnimeCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <TouchableOpacity
      onPress={() => navigate(`/anime/${item.slug || item.id}?page_title=${item.title}`, { relative: true, replace: true })}
      style={styles.relatedItem}
      key={item.slug}
    >
      <View style={styles.relatedImageContainer}>
        <Image
          style={styles.relatedItemImage}
          source={{
            uri: item.cover,
          }}
        />
      </View>
      <View style={styles.relatedItemTextContainer}>
        <StyledText
          style={styles.relatedItemText}
          fontSize="subTitle"
          fontWeight="bold"
          numberOfLines={1}
        >
          {item?.title}
        </StyledText>
        <View style={styles.relatedItemTypeSection}>
          <Icon name="eye" color={"gray"} />
          <StyledText
            style={styles.relatedItemSubText}
            fontSize="subTitle"
            numberOfLines={1}
          >
            {item?.type}
          </StyledText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  relatedItem: {
    width: 150,
    height: "auto",
    backgroundColor: theme.backgroundColors.darkSecondary,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "flex-start",

    marginRight: 10,
  },
  relatedImageContainer: {
    width: "100%",
    height: 200,
    //justifyContent: "flex-start",
  },
  relatedItemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  relatedItemTextContainer: {
    width: "100%",
    height: "auto",
    //backgroundColor: ,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignContent: "flex-start",
    //marginRight: 10,
  },
  relatedItemText: {
    width: "100%",
    padding: 5,
  },
  relatedItemTypeSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    paddingLeft: 5,
  },
  relatedItemSubText: {
    width: "100%",
    padding: 5,
    paddingBottom: 10,
    //textAlign: "center",
  },
});

export default RelatedAnimeCard;
