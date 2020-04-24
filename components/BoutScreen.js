import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { setFencers, setScores } from "../utils/actions";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import getBoutOrder from "../utils/boutorders";

function BoutScreen({ navigation, fencers, scores, setScores }) {
  const boutOrders = getBoutOrder(fencers.length);
  useEffect(() => {
    let numFencers = fencers.length;
    setScores([...Array(fencers.length)].map(() => Array(fencers.length)));
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {boutOrders.map((value, index) => {
          const [fencer1, fencer2] = value;
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("EncounterScreen", {
                  fencerOneIndex: fencer1 - 1,
                  fencerTwoIndex: fencer2 - 1,
                });
              }}
              key={index}
            >
              <View
                style={{
                  margin: 10,
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "75%",
                  alignSelf: "center",
                }}
              >
                {scores.length > 0 ? (
                  <Text style={{ ...styles.nameText, alignSelf: "flex-start" }}>
                    {scores[fencer1 - 1][fencer2 - 1] === undefined
                      ? "-"
                      : scores[fencer1 - 1][fencer2 - 1]}
                  </Text>
                ) : (
                  <></>
                )}

                <Text style={styles.nameText}>
                  {fencer1}. {fencers[fencer1 - 1]}
                </Text>
                <Text style={styles.nameText}>vs.</Text>
                <Text style={styles.nameText}>
                  {fencer2}. {fencers[fencer2 - 1]}
                </Text>
                {scores.length > 0 ? (
                  <Text style={{ ...styles.nameText, alignSelf: "flex-end" }}>
                    {scores[fencer2 - 1][fencer1 - 1] === undefined
                      ? "-"
                      : scores[fencer2 - 1][fencer1 - 1]}
                  </Text>
                ) : (
                  <></>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  nameText: {
    fontSize: 14,
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BoutScreen);
