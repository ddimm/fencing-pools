import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { setScores, setFencers } from "../utils/actions";
import { Button, Text } from "react-native-paper";

function HomeScreen({ setFencers, setScores, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Start a fencing pool with your pals.</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            setScores([]);
            setFencers([]);
            navigation.navigate("NameScreen");
          }}
          mode="contained"
        >
          Start a New Pool
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    margin: 5,
    fontSize: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setScores: (scores) => dispatch(setScores(scores)),
    setFencers: (fencers) => dispatch(setFencers(fencers)),
  };
}

export default connect(undefined, mapDispatchToProps)(HomeScreen);
