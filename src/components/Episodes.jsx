import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import useFetch from "../hooks/useFetch";
import theme from "../theme";
import StyledText from "./StyledText";

const Episodes = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, status } = useFetch(
    `https://animedeus-api.onrender.com/episodes/${slug}`
  );
  // console.log(slug);
  console.log(data.title);
  //Alert.alert(slug);
  if (status === "error") return <StyledText>error</StyledText>;
  if (status !== "success")
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000f" />
        <StyledText color="secondary" align={"center"}>
          Loading...
        </StyledText>
      </View>
    );

  const EpisodeItem = ({ item }) => {
    return (
      //<View style={styles.episodeItem}>
      <TouchableOpacity
        onPress={() =>
          navigate(`/player/${data.slug}/${item.episodeNumber}?page_title=${item.title}`, {
            relative: true,
            replace: true,
          })
        }
        style={styles.episodeItem}
        key={item.slug}
      >
        <View style={styles.EpisodeImageContainer}>
          <Image
            style={styles.EpisodeImage}
            source={{ uri: "https://i.ibb.co/1Tp6cTn/x1080.jpg" }}
          />
        </View>
        <View style={styles.EpisodeInfo}>
          <StyledText fontSize="subheading">
            Episodio {item.episodeNumber}
          </StyledText>
          <StyledText fontSize="subTitle">Subtitulado</StyledText>
        </View>
      </TouchableOpacity>
      //</View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data.episodes}
        keyExtractor={({ episodeNumber }, index) => index}
        renderItem={({ item, index }) => (
          <EpisodeItem item={item} index={index} />
        )}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.backgroundColors.darkPrimary,
    paddingBottom: 10,
    },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.backgroundColors.darkPrimary,
    paddingTop: 5,
  },


  episodeItem: {
    height: 75,
    backgroundColor: theme.backgroundColors.darkSecondary,
    margin: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  EpisodeImageContainer: {
    width: "40%",
    height: "100%",
  },
  EpisodeImage: {
    width: "100%",
    height: "100%",
  },
  EpisodeInfo: {
    width: "60%",
    height: "100%",
    padding: 5,
    paddingBottom: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
export default Episodes;
