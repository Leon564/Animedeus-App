import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../theme";
import StyledText from "./StyledText";
import SlideMenuList from "./SlideMenuList";
const SlideMenuModal = ({ visible, onRequestClose }) => {
 
  return (
      <Modal
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={visible}
        useNativeDriver={true}
        coverScreen={false}
        onBackdropPress={onRequestClose}
        style={{ margin: 0 }}
      >
        <View style={styles.container}>
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
            <SlideMenuList hideMenu={onRequestClose}/>
          </View>
          <View style={styles.creditsSection}>
            <StyledText style={styles.creditsText}>Powered by</StyledText>
            <StyledText style={styles.creditsText}>Leon564</StyledText>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    zIndex: 1,
    flex: 1,
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  container: {
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

export default SlideMenuModal;
