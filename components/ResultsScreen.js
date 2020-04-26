import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { DataTable, Text, Button } from "react-native-paper";

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
        <View style={{ flex: 1 }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.dataTableHeader}>
                <Text style={styles.headerText}>Fencer</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableHeader} numeric>
                <Text style={styles.headerText}>TS</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableHeader} numeric>
                <Text style={styles.headerText}>TR</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableHeader} numeric>
                <Text style={styles.headerText}>V</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dataTableHeader} numeric>
                <Text style={styles.headerText}>IND</Text>
              </DataTable.Title>
            </DataTable.Header>

            {fencers.map((name, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {touchesScored[index]}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {touchesReceived[index]}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{victories[index]}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {touchesScored[index] - touchesReceived[index]}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
        <View style={{ height: -1, flex: 1, margin: 10 }}>
          <Button
            onPress={() => {
              navigation.navigate("Start");
            }}
            mode={"contained"}
          >
            Start Over
          </Button>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
          }}
        >
          Fetching Results
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
  },
  dataTableHeader: {
    flexWrap: "wrap",
  },
  headerText: {
    textAlign: "center",

    fontSize: 20,
    overflow: "scroll",
  },
});

function mapStateToProps(state) {
  return {
    scores: state.scores,
    fencers: state.fencers,
  };
}

export default connect(mapStateToProps, undefined)(ResultsScreen);
