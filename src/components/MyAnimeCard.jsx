import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import theme from "../theme";
import StyledText from "./StyledText";

import { Dimensions } from 'react-native';
import { useNavigate } from "react-router-native";
const {width} = Dimensions.get("window")
const column = 3
const margin = 5
const SIZE = (width - (margin * column * 2)) / column

const MyAnimeCard = ({ anime }) => {

  const navigate = useNavigate();
  const handlePress = () => {
    navigate(`/anime/${anime?.slug}`);
  };


  return (
    <TouchableOpacity style={{...styles.container,  margin: margin, width: SIZE }} onPress={()=>handlePress()}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: anime?.cover }} />
      </View>
      <View style={styles.infoContainer}>
        <StyledText numberOfLines={2} fontSize={"subtitle"} style={styles.title}>{anime?.title}</StyledText>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
  
    //flex: 1,
    flexDirection: "column",
    backgroundColor: theme.backgroundColors.darkSecondary,
    //borderRadius: 10,
   // margin: 10,
   // padding: 10,
    //width: "50%",
    //height: "100%",
    
    
  },
  imageContainer: {
    height: 150,
    width: "100%",
    resizeMode: "cover",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  infoContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: 10,
  },
  title: {
    //fontSize: 20,
    //fontWeight: "bold",
   // marginBottom: 10,
  },
});

export default MyAnimeCard;
