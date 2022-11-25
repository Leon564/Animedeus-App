import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import EpisodeItem from "./EpisodeRecentItem";
import StyledText from "./StyledText";
import { useEffect, useState } from "react";

const AnimeList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchData = async () => {
    try {
      const response = await fetch("https://animedeus-api.onrender.com/episodes/recents");
      const data = await response.json();
      setData(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    fetchData().then(() => setRefreshing(false));
  };
  if (status === "error") return <StyledText color="white">Error</StyledText>;
  return status === "loading" ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#000f" />
      <StyledText color="secondary" align={"center"}>
        Loading...
      </StyledText>
    </View>
  ) : (
    <FlatList
      data={data.data}
      keyExtractor={({ _id }, index) => _id}
      renderItem={({ item, index }) => <EpisodeItem item={item} index={index} />}
      //renderItem={({ item, index }) => <StyledText>{item.title}</StyledText>}
      style={styles.list}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
});

export default AnimeList;
