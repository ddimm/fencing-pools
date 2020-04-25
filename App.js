import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import BoutScreen from "./components/BoutScreen";
import Encounter from "./components/Encounter";
import HomeScreen from "./components/HomeScreen";
import NameScreen from "./components/NameScreen";
import reducer from "./utils/reducers";
import ResultsScreen from "./components/ResultsScreen";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Appbar,
} from "react-native-paper";
import { screensEnabled } from "react-native-screens";
const theme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
};
const Stack = createStackNavigator();
const store = createStore(reducer);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Start"
            screenOptions={{
              header: ({ scene, previous, navigation }) => {
                const { options } = scene.descriptor;
                const title =
                  options.headerTitle !== undefined
                    ? options.headerTitle
                    : options.title !== undefined
                    ? options.title
                    : scene.route.name;

                return (
                  <Appbar.Header>
                    {navigation.canGoBack() ? (
                      <Appbar.BackAction
                        onPress={() => {
                          navigation.goBack();
                        }}
                      />
                    ) : (
                      <></>
                    )}

                    <Appbar.Content title={title} />
                  </Appbar.Header>
                );
              },
            }}
          >
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
            <Stack.Screen
              component={ResultsScreen}
              name="ResultsScreen"
              options={{
                title: "Results",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
