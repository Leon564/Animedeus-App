import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useLocation, useNavigate } from "react-router-native";
import theme from "../theme";
import { AuthContext } from "./AuthContext";
import MyAnimeCard from "./MyAnimeCard";
import StyledText from "./StyledText";

const OptionButton = ({ option, onPress, active }) => {
  //resaltar el borde inferior del boton activo
  const _active = active ? { borderBottomWidth: 2, borderBottomColor: theme.colors.extras } : {};

  return (
    <TouchableOpacity style={{...ButtonsStyles.button, ..._active}} onPress={onPress}>
      <StyledText>{option}</StyledText>
    </TouchableOpacity>
  );
};

const ButtonsStyles = StyleSheet.create({
  button: {
    width: "auto",
    height: 40,
    backgroundColor: theme.backgroundColors.darkPrimary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

const Options = () => {
  const [option, setOption] = useState("favorites");

  const navigate = useNavigate();
 
  useEffect(() => {
    navigate({ search: `?option=${option}` });
  }, [option]);

  const location = useLocation();
  let flatListRef = null;

  const handleOption = (value) => {
    setOption(value);
    flatListRef.scrollToIndex({ animated: true, index: value });
  };

  return (
    <View style={OptionsStyles.container}>
      <FlatList
        data={[
          { label: "FAVORITOS", value: 0 },
          { label: "EN PROCESO", value: 1 },
          { label: "COMPLETADO", value: 2 },
          { label: "EN ESPERA", value: 3 },
          { label: "DESCARTADO", value: 4 },
        ]}
        ref={(ref) => { flatListRef = ref; }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OptionButton
            option={item.label}
            active = {item.value === option}
            onPress={() => handleOption(item.value)}
          />
        )}
        keyExtractor={(item) => item.value}
        horizontal={true}
      />
    </View>
  );
};

const OptionsStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    backgroundColor: theme.backgroundColors.darkSecondary,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

const MyAnimes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { getUserFavorites, getUserAnimes } = useContext(AuthContext);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get("option") || "0";
    setLoading(true);
    if (q === "0") {
      getUserFavorites().then((data) => {
        setData(data);
        setLoading(false);
      });
    } else {
      getUserAnimes(q).then((data) => {
        setData(data);
        setLoading(false);
      });
    }
  }, [location]);

  if (loading) {
    return (
        <View style={{ width: "100%", height: "90%" }}>
            <Options />
            <StyledText>Cargando...</StyledText>
        </View>
        
    )
  }
  return (
    <View style={{ width: "100%", height: "90%"}}>
      <Options />

      <FlatList
        data={data.result}
        renderItem={({ item }) => <MyAnimeCard anime={item} key={item.slug} />}
        keyExtractor={(item) => item.slug}
        numColumns={3}
      />
    </View>
  );
};

export default MyAnimes;
