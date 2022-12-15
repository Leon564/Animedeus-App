import React, { useState } from "react";
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import theme from "../theme";
import { API_URL } from "@env";

const AnimeOptionsModal = ({ visible, onRequestClose, anime }) => {
  //const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Favorito", value: 1 },
    { label: "Viendo", value: 2 },
    { label: "Completado", value: 3},
    { label: "En espera", value: 4 },
    { label: "Descartado", value: 5 },
  ]);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxlb241NjQiLCJzdWIiOiI2Mzk1NjIzZDBkOGZmMzM0NjhhZmIyOWMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzA5NjczMTAsImV4cCI6MTcwMjUwMzMxMH0.qa8nBtFcENRdfHpA58yp8uTW-o1wQ0SKkt278lEJ_G8"
  const pushAnime = (slug, option) => {
    fetch(`${API_URL}/users/anime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        anime:slug,
        type:option,
      }),
    })
  }


  const onSave = () => {
    pushAnime(anime.slug, value);
    onRequestClose();
  }

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
              onPress={()=>onSave()}
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
