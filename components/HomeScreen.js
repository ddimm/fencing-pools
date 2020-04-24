import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { setScores, setFencers } from "../utils/actions";

function HomeScreen({ setFencers, setScores, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Start a fencing pool with your pals.</Text>
      <View style={styles.buttonContainer}>
        <Button
          title={"Start a New Pool"}
          onPress={() => {
            setScores([]);
            setFencers([]);
            navigation.navigate("NameScreen");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
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
