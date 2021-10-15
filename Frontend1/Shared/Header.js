import React from "react";
import { StyleSheet, Image, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/logo.png")}
        resizeMode="contain"
        style={{ height: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "relative",
    right: 300,
    borderColor: "red",
  },
});

export default Header;
