import { Linking, Platform } from "react-native";
import { ActivityAction, startActivityAsync } from "expo-intent-launcher";
import { useNavigate } from "react-router-native";

export function playVideo(url, callBack) {
  //const navigate = useNavigate();
  if (Platform.OS === "android") {
    const intentParams = {
      data: url ,
      flags: 0x1,
      type: "video/mp4",
    };

    startActivityAsync("android.intent.action.VIEW", intentParams).then(
      (result) => {
        if (result.resultCode === 0) {
          console.log("Video played successfully");
          callBack();
        } else {
          console.log("Video failed to play");
        }
      }
    );
  } else {
    Linking.openURL(url);
  }
}
