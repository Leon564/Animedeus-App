import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import AnimeItem from "./AnimeItem";
import StyledText from "./StyledText";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-native";

const AnimeList = () => {
  //const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  //const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const location = useLocation();
  const url = "https://animedeus-api.onrender.com/animes/directory";

  useEffect(() => {
    try {
      setStatus("loading");
      const query = new URLSearchParams(location.search).get("q") || "";
      //setQuery(new URLSearchParams(location.search).get("q") || "");
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

  /*
  const onRefresh = () => {
    fetchData().then(() => setRefreshing(false));
  };
  */
  //if(status === "success") return <StyledText color="white">sucess</StyledText>;
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
      //renderItem={({ item, index }) => <StyledText>{item.title}</StyledText>}
      style={styles.list}
      //refreshing={refreshing}
      //onRefresh={onRefresh}
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
