import React from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { Banner } from "../images";
import Background from "../components/Background";
import Button from "../components/Button";

const HomeScreen = (props: any) => {
  const { navigate } = props.navigation;
  return (
    <Background>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.sectionBanner}>
          <Image source={Banner} resizeMode="contain" style={styles.banner} />
        </View>
        <View style={styles.sectionContainer}>
          <Button
            onPress={() => navigate("BoardGame")}
            text={"Human VS Human"}
          />
          <Button
            onPress={() => navigate("BoardGame")}
            text={"Human VS Computer"}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  safeAreaView: {
    flex: 1,
  },
  banner: {
    width: "100%",
    height: "100%",
  },
  sectionBanner: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 30,
  },
  sectionContainer: {
    flex: 2,
    marginHorizontal: 28,
  },
});

export default HomeScreen;
