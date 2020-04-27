import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { BackgroundImage } from "../images";

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});

const Background: React.FC = (props: any) => {
  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      {props.children}
    </ImageBackground>
  );
};

export default Background;
