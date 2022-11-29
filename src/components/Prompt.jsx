import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Animated, Text, TextInput, Modal } from "react-native";

import BlockButton from "../common/BlockButton";

import { BlurView } from "react-native-blur";

export default class BlurAlert extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: {}
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible,
            title: null,
            body: null
        };
    }

    render() {
        if (this.props.visible) {
            return (
                  <Modal
                    transparent
                    animationType="fade"
                    visible={this.state.visible}
                    onRequestClose={() => {
                      console.log('Modal has been closed.');
                    }}>
                  
                  <View style={styles.wrapper}>
                      <BlurView style={styles.blurView} blurType="dark" blurAmount={5} />

                      <View style={styles.box}>
                          <Text style={styles.titleText}>{this.props.title}</Text>
                          <Text style={styles.bodyText}>{this.props.body}</Text>

                          {this.props.children}

                          <BlockButton
                              backgroundColor={"#F0AC8F"}
                              borderColor={"#F0AC8F"}
                              fontColor={"white"}
                              title={this.props.buttonText}
                              padding={23}
                              marginTop={25}
                              disabled={false}
                              onPress={this.props.onClosed}
                          />
                      </View>
                  </View>
                </Modal>
            );
        } else {
            return <View />;
        }
    }
}

BlurAlert.propTypes = {
    title: String,
    body: String,
    buttonText: String,
    visible: Boolean
};

BlurAlert.defaultProps = {
    visible: false,
    buttonText: "OK"
};

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: "100%",
        width: "100%",
        zIndex: 9999
    },
    blurView: {
        flex: 1,
        zIndex: 99999
    },
    container: {
        margin: 25,
        zIndex: 99999,
        position: "relative",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    box: {
        backgroundColor: "white",
        padding: 20,
        position: "absolute",
        top: "15%",
        borderColor: "black",
        borderWidth: StyleSheet.hairlineWidth,
        margin: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        zIndex: 99999,
        width: "85%"
    },
    titleText: {
        fontFamily: "Lora",
        fontSize: 20
    },
    bodyText: {
        marginTop: 15,
        textAlign: "center",
        fontFamily: "Lora",
        fontSize: 16,
        lineHeight: 20
    }
});