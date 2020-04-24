import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./utils/reducers";
import HomeScreen from "./components/HomeScreen";
import NameScreen from "./components/NameScreen";
import BoutScreen from "./components/BoutScreen";
import Encounter from "./components/Encounter";

const Stack = createStackNavigator();
const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={HomeScreen} />
          <Stack.Screen
            name="NameScreen"
            component={NameScreen}
            options={{
              title: "Add Fencers",
            }}
          />
          <Stack.Screen
            component={BoutScreen}
            name="BoutScreen"
            options={{
              title: "Bout Order",
            }}
          />
          <Stack.Screen
            component={Encounter}
            name="EncounterScreen"
            options={{
              title: "Enter The Score",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
