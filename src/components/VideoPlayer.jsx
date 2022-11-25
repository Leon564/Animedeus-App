import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video } from "expo-av";
import { useNavigate } from "react-router-native";

const VideoPlayer = ({ url, from }) => {

  useEffect(() => {
    return () => {
      true;
    };
  }, []);
  
  const setOrientation = () => {
    if (Dimensions.get("window").height > Dimensions.get("window").width) {
      //Device is in portrait mode, rotate to landscape mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      //Device is in landscape mode, rotate to portrait mode.
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };
  const videoRef = React.useRef(null);
  const navigate = useNavigate();
  const handleError = (error) => {
    Alert.alert("Error", "No se pudo reproducir el video", [
      { text: "OK", onPress: () => navigate(from) },
    ]);
  };
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay={true}
        useNativeControls
        ref={videoRef}
        onLoadStart={() => videoRef?.current?.presentFullscreenPlayer()}
        nativeID="video"
        style={{
          width: Dimensions.get("window").width,
          height: 225,
          ...styles.video,
        }}
        onError={(error) => handleError(error)}
        onFullscreenUpdate={setOrientation}
      />
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  video: {
    marginTop: 40,
  },
});

export default VideoPlayer;
