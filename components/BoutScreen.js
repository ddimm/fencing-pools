import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { setFencers, setScores } from "../utils/actions";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";

function BoutScreen({ navigation, fencers, scores, setScores }) {
  return (
    <View style={styles.container}>
      <Text>Bouts will go here</Text>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setScores: (score) => dispatch(setScores(score)),
  };
}

function mapStateToProps(state) {
  return {
    fencers: state.fencers,
    scores: state.scores,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BoutScreen);
