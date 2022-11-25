import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, View, numberOfLines } from "react-native";

const ReadMoreText = ({ children, style, triggerStyle, type, title }) => {
  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    //To toggle the show text or hide it
    if(type === "alert") return  Alert.alert(title || "Read more", children, [], {cancelable: true});
    setTextShown(!textShown);
    
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= numberOfLines || 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);
 
  return (
    <View style={{...styles.mainContainer, ...style}}>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textShown ? undefined : numberOfLines || 3}
        style={{ lineHeight: 21,...style }}
      >
        {children}
      </Text>

      {lengthMore ? (
        <Text
          onPress={toggleNumberOfLines}
          style={{ lineHeight: 21, marginTop: 10,...style, ...triggerStyle }}
        >
          {textShown ? "Leer menos..." : "Leer más..."}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
});
export default ReadMoreText;
