import React from "react";
import { Text, View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  header: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 4,
  },
});

type TileType = {
  isEnd: boolean;
  winner: string;
  player: string;
};

const Tile: React.FC<TileType> = (props) => {
  return (
    <View style={styles.header}>
      {props.isEnd && !props.winner ? (
        <Text style={styles.text}>DRAW</Text>
      ) : props.winner && props.winner !== undefined ? (
        <Text style={styles.text}>WINNER IS - {props.winner}</Text>
      ) : (
        <Text style={styles.text}>CURRENT TURN - {props.player}</Text>
      )}
    </View>
  );
};

export default Tile;
