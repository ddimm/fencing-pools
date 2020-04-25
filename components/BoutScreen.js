import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { setScores } from "../utils/actions";
import getBoutOrder from "../utils/boutorders";
import { Button, Card, Paragraph, Title, Subheading } from "react-native-paper";

function BoutScreen({ navigation, fencers, scores, setScores }) {
  const boutOrders = getBoutOrder(fencers.length);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (scores === undefined || scores.length < 1) {
      setScores([...Array(fencers.length)].map(() => Array(fencers.length)));
    }
  }, []);
  useEffect(() => {
    isOver(scores).then((result) => {
      setFinished(result);
    });
  }, [scores]);

  return (
    <View style={{ marginTop: 10, justifyContent: "center", flex: 1 }}>
      <ScrollView>
        {boutOrders.map((value, index) => {
          const [fencer1, fencer2] = value;
          return (
            <Card key={index} style={{ marginBottom: 10, marginHorizontal: 5 }}>
              <Card.Content>
                <Title>{`Bout ${index + 1}`}</Title>
                <Subheading>{`${fencers[fencer1 - 1]} vs. ${
                  fencers[fencer2 - 1]
                }`}</Subheading>
                {scores.length > 0 ? (
                  <Paragraph>
                    {scores[fencer1 - 1][fencer2 - 1] === undefined ||
                    scores[fencer2 - 1][fencer1 - 1] === undefined
                      ? `No Score`
                      : `${scores[fencer1 - 1][fencer2 - 1]} - ${
                          scores[fencer2 - 1][fencer1 - 1]
                        }`}
                  </Paragraph>
                ) : (
                  <Paragraph>No Score</Paragraph>
                )}
              </Card.Content>
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => {
                    navigation.navigate("EncounterScreen", {
                      fencerOneIndex: fencer1 - 1,
                      fencerTwoIndex: fencer2 - 1,
                    });
                  }}
                >
                  Input Score
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
      <View>
        <Button
          mode="contained"
          style={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("ResultsScreen");
          }}
          disabled={!finished}
        >
          Finish
        </Button>
      </View>
    </View>
  );
}

async function isOver(scores) {
  if (scores === undefined) {
    return false;
  }
  for (let r = 0; r < scores.length; r++) {
    for (let c = 0; c < scores[r].length; c++) {
      if (scores[r][c] === undefined && c !== r) {
        return false;
      }
    }
  }
  return true;
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

export default connect(mapStateToProps, mapDispatchToProps)(BoutScreen);
