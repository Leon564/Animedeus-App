import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../theme";

const AnimeOptionsModal = ({ visible, onRequestClose, anime }) => {
  //const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Favorito", value: "favs" },
    { label: "Ver mas tarde", value: "laters" },
    { label: "Completado", value: "complets" },
    { label: "Descartado", value: "discards" },
  ]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationIn="bounceIn"
        animationOut="bounceOut"
        animationInTiming={300}
        animationOutTiming={300}
        isVisible={visible}
        useNativeDriver={true}
        onBackdropPress={onRequestClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{anime.title}</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Selecciona una opcion"
              style={{ borderRadius:0 }}
              dropDownContainerStyle={{ borderRadius:0 }}
              coverScreen={false}
            />
            <View style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onRequestClose}
            >
              <Text style={styles.textStyle}>Guardar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onRequestClose}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    //borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    paddingTop: 10,
  },
  button: {
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
 
  buttonClose: {
    backgroundColor: theme.colors.extras,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AnimeOptionsModal;
