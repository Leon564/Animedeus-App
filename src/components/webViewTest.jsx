import {WebView} from 'react-native-webview';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const WebViewTest = () => {
   // const [url, setUrl] = React.useState("https://www.google.com");   
  
    
    return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <WebView
            source={{ uri: "https://www.google.com" }}
            style={{ marginTop: 20, width: "100%", height: "100%" }}
        />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
       
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});

export default WebViewTest;