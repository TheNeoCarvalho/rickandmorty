import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Entypo, Foundation } from "@expo/vector-icons";

export default function App() {
  const [person, setPerson] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    LoadingData();
  }, [name]);
  const LoadingData = async () => {
    await fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        setPerson(response.results);
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={styles.head}>Rick and Morty</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Busque por uma personagem"
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8 }}
        data={person}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.status === "Alive" ? (
              <Entypo name="controller-record" size={24} color="green" />
            ) : (
              <Foundation name="skull" size={24} color="black" />
            )}
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />
            <View style={styles.texts}>
              <Text style={styles.titleName}>{item.name}</Text>
              <Text style={styles.titleOrigin}>{item.origin.name}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: 80,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  head: {
    fontSize: 32,
    fontWeight: "bold",
  },
  input: {
    width: "95%",
    height: 50,
    borderWidth: 1,
    marginVertical: 16,
    padding: 8,
    borderRadius: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#ddd",
    padding: 16,
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 8,
    margin: 8,
  },
  texts: {
    flexWrap: "wrap",
  },
  titleName: {
    fontSize: 24,
    color: "#222",
  },
  titleOrigin: {
    fontSize: 18,
    color: "#666",
  },
  alive: {
    width: 20,
    height: 20,
    backgroundColor: "green",
    borderRadius: 10,
  },
  dead: {
    width: 20,
    height: 20,
    backgroundColor: "red",
    borderRadius: 10,
  },
});
