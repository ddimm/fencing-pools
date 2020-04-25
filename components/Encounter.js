import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";
import { connect } from "react-redux";
import { setScores } from "../utils/actions";
import { Timer } from "react-native-stopwatch-timer";

function Encounter({ route, navigation, setScores, scores, fencers }) {
  let { fencerOneIndex } = route.params;
  let { fencerTwoIndex } = route.params;
  const [fencerOneScore, setFencerOneScore] = useState(0);
  const [fencerTwoScore, setFencerTwoScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reset, setReset] = useState(false);
  function toggleTimer() {
    setPaused(!paused);
    setReset(false);
  }
  function resetTimer() {
    setPaused(false);
    setReset(true);
  }
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
    <View
      style={{
        flexDirection: "column",
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (paused) {
                toggleTimer();
              }
              increaseScore(1);
            }}
            onLongPress={() => {
              decreaseScore(1);
            }}
          >
            <Text
              style={{
                fontSize: 20,
                alignSelf: "center",
                padding: 10,
              }}
            >
              {fencers[fencerOneIndex]}
            </Text>
            <Surface
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                height: 100,
              }}
            >
              <Text
                style={{
                  fontSize: 40,
                }}
              >
                {fencerOneScore}
              </Text>
            </Surface>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              padding: 10,
            }}
          >
            {fencers[fencerTwoIndex]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (paused) {
                toggleTimer();
              }

              increaseScore(2);
            }}
            onLongPress={() => {
              decreaseScore(2);
            }}
          >
            <Surface
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "green",
                height: 100,
              }}
            >
              <Text style={{ fontSize: 40, color: "black" }}>
                {fencerTwoScore}
              </Text>
            </Surface>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          flex: 1,
          width: "75%",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleTimer();
          }}
          onLongPress={() => {
            resetTimer();
          }}
        >
          <Surface
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 100,
            }}
          >
            <Timer
              totalDuration={180000}
              start={paused}
              reset={reset}
              handleFinish={() => {
                resetTimer();
                console.log("done");
              }}
            />
          </Surface>
        </TouchableOpacity>
      </View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            if (fencerOneScore !== fencerTwoScore) {
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
            } else {
              alert("fencer scores must not be equal");
            }
          }}
        >
          submit score
        </Button>
      </View>
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
    scores: state.scores,
    fencers: state.fencers,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Encounter);
