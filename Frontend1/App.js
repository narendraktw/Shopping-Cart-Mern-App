import React from "react";
import { StyleSheet, Platform, StatusBar, SafeAreaView } from "react-native";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

// Context API
import Auth from "./Context/store/Auth";

// Navigatiors
import Main from "./Navigators/Main";

// Screens
import Header from "./Shared/Header";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Header />
            <Main />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}

const calcNotchHeight = () => {
  let notchHeight = 0;
  if (Platform.OS === "android" && StatusBar.currentHeight > 24) {
    notchHeight = StatusBar.currentHeight;
  }
  return notchHeight;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 2,
  },
});
