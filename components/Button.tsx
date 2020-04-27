import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontWeight: "800",
    color: "black",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

type ButtonType = {
  onPress: () => void;
  text: string;
};

const Button: React.FC<ButtonType> = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
