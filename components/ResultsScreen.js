import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { connect } from "react-redux";
import { DataTable } from "react-native-paper";

function ResultsScreen({ scores, fencers, navigation }) {
  const [touchesScored, setTouchesScored] = useState([]);
  const [ready, setReady] = useState(false);
  const [touchesReceived, setTouchesReceived] = useState([]);
  const [victories, setVictories] = useState([]);
  useEffect(() => {
    let scoredTemp = [];
    let receivedTemp = [];
    let vicTemp = fencers.map(() => {
      return 0;
    });

    setTouchesScored(scoredTemp);
    for (let row = 0; row < scores[0].length; row++) {
      let scoredSum = 0;
      let receivedSum = 0;
      for (let col = 0; col < scores.length; col++) {
        if (scores[row][col]) {
          scoredSum = scoredSum + scores[row][col];
        }

        if (scores[col][row]) {
          receivedSum = receivedSum + scores[col][row];
        }
        if (scores[row][col] > scores[col][row]) {
          vicTemp[row] = vicTemp[row] + 1;
        }
      }
      receivedTemp.push(receivedSum);
      scoredTemp.push(scoredSum);
      receivedSum = 0;

      scoredSum = 0;
    }
    setTouchesReceived(receivedTemp);
    setTouchesScored(scoredTemp);
    setVictories(vicTemp);
    setReady(true);
  }, []);
  if (ready) {
    return (
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Fencer</DataTable.Title>
            <DataTable.Title numeric>Touches Scored</DataTable.Title>
            <DataTable.Title numeric>Touches Received</DataTable.Title>
            <DataTable.Title numeric>Victories</DataTable.Title>
          </DataTable.Header>
          {fencers.map((name, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell>{name}</DataTable.Cell>
                <DataTable.Cell>{touchesScored[index]}</DataTable.Cell>
                <DataTable.Cell>{touchesReceived[index]}</DataTable.Cell>
                <DataTable.Cell>{victories[index]}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </DataTable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Fetching Results</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

function mapStateToProps(state) {
  return {
    scores: state.scores,
    fencers: state.fencers,
  };
}

export default connect(mapStateToProps, undefined)(ResultsScreen);
