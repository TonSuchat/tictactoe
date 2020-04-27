import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
  },
  tile: {
    width: 110,
    height: 100,
    justifyContent: "center",
  },
  tileMiddle: {
    borderLeftColor: "white",
    borderRightColor: "white",
    borderLeftWidth: 4,
    borderRightWidth: 4,
  },
});

type SlotType = {
  isMiddle: boolean;
  onSlotPress: () => void;
  text: string;
};

const Slot: React.FC<SlotType> = (props) => {
  return (
    <View
      style={
        props.isMiddle && props.isMiddle !== undefined
          ? [styles.tile, styles.tileMiddle]
          : styles.tile
      }
    >
      <TouchableOpacity onPress={() => props.onSlotPress()}>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Slot;
