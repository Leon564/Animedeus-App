import { Linking, Platform } from "react-native";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";

export function playVideo(url) {
  if (Platform.OS === "android") {
    console.log("playVideo: " + url);
    const intentParams = {
      data: url || "https://www.w3schools.com/html/mov_bbb.mp4",
      flags: 0x1,
      type: "video/mp4",
    };

    startActivityAsync("android.intent.action.VIEW", intentParams).then(
      (result) => {
        if (result.resultCode === 0) {
          console.log("Video played successfully");
        } else {
          console.log("Video failed to play");
        }
      }
    );
  } else {
    Linking.openURL(url || "https://www.w3schools.com/html/mov_bbb.mp4");
  }
}
