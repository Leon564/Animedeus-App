import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLocation } from "react-router-native";
import AnimeList from "./AnimeList";
import DirectoryBar from "./DirectoryBar";

const Directory = ({ from }) => {
  const location = useLocation();



  const fetchData = async (q) => {
    try {
      const response = await fetch(
        "https://animedeus-api.onrender.com/animes/directory" + q
      );
      const data = await response.json();
      setData(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };
 
  return (
    <View style={styles.container}>
      <DirectoryBar from={from} />
      <AnimeList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

export default Directory;
