import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  useEffect(() => {
    async function getAPI() {
      const response = await axios
        .get("https://rickandmortyapi.com/api/character")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }

    getAPI();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Rick and Morty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
