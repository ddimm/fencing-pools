import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { connect } from "react-redux";

function Encounter({
  fencerOneIndex,
  fencerTwoIndex,
  navigation,
  setScores,
  scores,
}) {
  const [fencerOneScore, setFencerOneScore] = useState(0);
  const [fencerTwoScore, setFencerTwoScore] = useState(0);

  return (
    <View style={{ ...styles.container, flexDirection: "row" }}>
      <View style={{ ...styles.container, flexDirection: "column" }}>
        <Button
          onPress={() => {
            setFencerOneScore(fencerOneScore + 1);
          }}
          title="+"
        />
        <Text style={{ fontSize: 14, padding: 10 }}>{fencerOneScore}</Text>
        <Button
          onPress={() => {
            setFencerOneScore(fencerOneScore - 1);
          }}
          title="-"
        />
      </View>
      <View style={{ ...styles.container, flexDirection: "column" }}>
        <Button
          onPress={() => {
            setFencerTwoScore(fencerTwoScore + 1);
          }}
          title="+"
        />
        <Text style={{ fontSize: 14, padding: 10 }}>{fencerTwoScore}</Text>
        <Button
          onPress={() => {
            setFencerTwoScore(fencerTwoScore - 1);
          }}
          title="-"
        />
      </View>
      <View style={{ alignSelf: "flex-end", margin: 10, padding: 10 }}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title={"submit score"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setScores: (score) => dispatch(setScores(score)),
  };
}

function mapStateToProps(state) {
  return {
    scores: state.scores,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
