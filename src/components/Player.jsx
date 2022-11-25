import React, { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { useNavigate, useParams } from "react-router-native";
import VideoPlayer from "./VideoPlayer";
import useFetch from "../hooks/useFetch";
import useZippyshare from "../hooks/useZippyshare";
import theme from "../theme";
import StyledText from "./StyledText";


const Player = ({from}) => {
  const { slug, episodeNumber } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [videoUrl, setVideoUrl] = React.useState(null);

  const { status, data } = useFetch(
    `https://animedeus-api.onrender.com/episodes/${slug}/${episodeNumber}`
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (status === "success") {
      const zippyshareurl = data?.episode?.downloadServers?.find(
        (server) => server.title === "Zippyshare"
      )?.url;
      console.log(zippyshareurl);
      useZippyshare(zippyshareurl      
      ).then((data) => {
        if(!data) return Alert.alert("Error", "No se pudo reproducir el video", [{text: "OK", onPress: () => navigate({ search: "",pathname:"../" },{relative: true}) }]);
        setVideoUrl(data);
        setLoading(false);
      });
    }
    return () => {
      true;
    };
  }, [data, status]);
  
  if (status === "error") return <Text>Error</Text>;
  if (loading || !videoUrl) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <StyledText align={"center"}>Loading...</StyledText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <VideoPlayer url={videoUrl} from/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColors.darkPrimary,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Player;
