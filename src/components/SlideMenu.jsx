import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import theme from "../theme";
import StyledText from "./StyledText";
import Animated, {
  Transition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import React, { Component, useEffect, useState } from "react";
import SlideMenuList from "./SlideMenuList";
import { useLocation, useNavigate } from "react-router-native";

const SlideMenu = (/*{ hidden, setHidden }*/) => {
  const opacity = useSharedValue(0);
  const transform = useSharedValue(0);
  //const [hidden, setHidden] = useState(true);
  const [display, setDisplay] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {    
    transform.value = withTiming(/*hidden*/ !display ? -300: 0);
    opacity.value = withTiming(/*hidden*/ !display ? 0 : 0.6);
    setDisplay(
      new URLSearchParams(location.search).get("slide_menu") === "true"? true : false
    );

  }, [location, display]);
  
  const entryAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transform.value }],
    };
  });

  const fadeBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0,0,0,${opacity.value})`,
    };
  });

  const hideMenu = (closeSection) => {
    transform.value = withTiming(-300);
    setTimeout(() => {
      opacity.value = 0;
      setDisplay(false);     
      if(closeSection)navigate({ search: location.search.replace("slide_menu=true", "") });
      //setHidden();
    }, 300);
  };
  if (/*hidden*/!display) return null; 

  return (
    <Animated.View style={[styles.containerP, fadeBackground]}>
      <Animated.View style={[styles.containerMenu, entryAnimation]}>
        <View style={styles.titleSection}>
          <ImageBackground
            source={require("../../assets/wallpaper1.jpg")}
            style={styles.titleMenu}
            resizeMode="cover"
          >
            <StyledText fontWeight={"bold"} style={styles.titleText}>
              ANIMEDEUS
            </StyledText>
          </ImageBackground>
        </View>
        <View style={styles.ButtonsSection}>
          <SlideMenuList hideMenu={()=>hideMenu()} />
        </View>
        <View style={styles.creditsSection}>
          <StyledText style={styles.creditsText}>Powered by</StyledText>
          <StyledText style={styles.creditsText}>Leon564</StyledText>
        </View>
      </Animated.View>

      <TouchableOpacity
        style={styles.closeSection}
        onPress={() => hideMenu(true)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: theme.colors.textPrimary,
  },
  containerP: {
    position: "absolute",
    zIndex: 1,
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    //opacity: 0.9,
  },
  containerMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "60%",
    flex: 1,
    backgroundColor: theme.backgroundColors.darkPrimary,
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  titleMenu: {
    flex: 1,
    width: "100%",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleSection: {
    flex: 1,
    width: "100%",
    height: "20%",
    top: 0,
    justifyContent: "center",
  },

  ButtonsSection: {
    height: "70%",
    width: "100%",
    justifyContent: "space-evenly",
  },

  creditsSection: {
    height: "10%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: theme.colors.textSecondary,
    borderTopWidth: 1,

  },
  creditsText: {
    color: theme.colors.textSecondary,
  },
  closeSection: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "40%",
    height: "100%",
  },
});

export default SlideMenu;
