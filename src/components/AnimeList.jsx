import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import AnimeItem from "./AnimeItem";
import StyledText from "./StyledText";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-native";
import { API_URL } from "@env";
const AnimeList = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("loading");
  const location = useLocation();
  const url = `${API_URL}/animes/directory`;

  useEffect(() => {
    try {
      setStatus("loading");
      const query = new URLSearchParams(location.search).get("q") || "";
      fetch(query ? `${url}?q=${query}` : url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.animes);
          setStatus("success");
        });
    } catch (error) {
      setStatus("error");
    }
  }, [location.search]);

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
      data={data}
      initialNumToRender={10}
      keyExtractor={({ _id }, index) => _id}
      renderItem={({ item, index }) => <AnimeItem item={item} index={index} />}
      style={styles.list}
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
