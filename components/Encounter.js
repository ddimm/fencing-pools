import React, { useState } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { connect } from "react-redux";
import { setScores } from "../utils/actions";
const _ = require("lodash");

function Encounter({ route, navigation, setScores, scores, fencers }) {
  let { fencerOneIndex } = route.params;
  let { fencerTwoIndex } = route.params;
  const [fencerOneScore, setFencerOneScore] = useState(0);
  const [fencerTwoScore, setFencerTwoScore] = useState(0);
  function increaseScore(fencer) {
    switch (fencer) {
      case 1:
        if (fencerOneScore < 5) {
          setFencerOneScore(fencerOneScore + 1);
        }
        break;

      case 2:
        if (fencerTwoScore < 5) {
          setFencerTwoScore(fencerTwoScore + 1);
        }
        break;
      default:
        break;
    }
  }
  function decreaseScore(fencer) {
    switch (fencer) {
      case 1:
        if (fencerOneScore > 0) {
          setFencerOneScore(fencerOneScore - 1);
        }
        break;

      case 2:
        if (fencerTwoScore > 0) {
          setFencerTwoScore(fencerTwoScore - 1);
        }
        break;
      default:
        break;
    }
  }

  return (
    <View style={{ ...styles.container, flexDirection: "row" }}>
      <View style={{ ...styles.container, flexDirection: "column" }}>
        <Text style={{ padding: 10 }}>{fencers[fencerOneIndex]}</Text>
        <Button
          onPress={() => {
            increaseScore(1);
          }}
          title="+"
        />
        <Text style={{ fontSize: 14, padding: 10 }}>{fencerOneScore}</Text>
        <Button
          onPress={() => {
            decreaseScore(1);
          }}
          title="-"
        />
      </View>
      <View style={{ ...styles.container, flexDirection: "column" }}>
        <Text style={{ padding: 10 }}>{fencers[fencerTwoIndex]}</Text>
        <Button
          onPress={() => {
            increaseScore(2);
          }}
          title="+"
        />
        <Text style={{ fontSize: 14, padding: 10 }}>{fencerTwoScore}</Text>
        <Button
          onPress={() => {
            decreaseScore(2);
          }}
          title="-"
        />
      </View>
      <View style={{ alignSelf: "flex-end", margin: 10, padding: 10 }}>
        <Button
          onPress={() => {
            setScores(
              scores.map((rowArr, rowIndex) => {
                const newScoreRow = [...rowArr];
                if (rowIndex === fencerOneIndex) {
                  newScoreRow[fencerTwoIndex] = fencerOneScore;
                } else if (rowIndex === fencerTwoIndex) {
                  newScoreRow[fencerOneIndex] = fencerTwoScore;
                }
                return newScoreRow;
              })
            );
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
    fencers: state.fencers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
