import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import DynamicHeightWebView from "./DynamicHeightWebView";
import OnlyBackTopBar from "./OnlyBackTopBar";
import theme from "../theme";
import config from "../config";

const WebViewTest = () => {
  // const [url, setUrl] = React.useState("https://www.google.com");
  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;
  return (
    <View style={styles.container}>
      <OnlyBackTopBar title={"Chat"} style={styles.topBar}/>
      <DynamicHeightWebView
        source={{ uri: config.CBOX_URL }}
        style={{...styles.WebView, width: imageWidth, height: imageHeight}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColors.darkSecondary,
    width: "100%",
  },
  WebView: {
    paddingTop: 20,
  },
  topBar: {
    //backgroundColor: "#613acf",
    backgroundColor: theme.backgroundColors.darkSecondary,
  },

});

export default WebViewTest;