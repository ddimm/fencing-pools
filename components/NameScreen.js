import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { setFencers } from "../utils/actions";
import { ScrollView } from "react-native-gesture-handler";
import {
  List,
  Button,
  TextInput,
  IconButton,
  Text,
  Card,
  Paragraph,
  Title,
} from "react-native-paper";

//input fencer names
function NameScreen({ navigation, setFencers }) {
  const [names, setNames] = useState([]);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View
        style={{
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextInput
          style={{ width: "75%" }}
          onChangeText={(newText) => {
            setText(newText);
          }}
          value={text}
          placeholder={"fencer name"}
        ></TextInput>
        <IconButton
          onPress={() => {
            if (text !== "") {
              setNames([...names, text]);
              setText("");
            }
          }}
          icon={"plus"}
        />
      </View>
      <View style={styles.namesList}>
        <ScrollView>
          {names.map((item, index) => {
            return (
              <Card
                key={index}
                style={{ marginBottom: 10, marginLeft: 5, marginRight: 5 }}
              >
                <Card.Content>
                  <Title>{`Fencer ${index + 1}`}</Title>
                  <Paragraph>{`${item}`}</Paragraph>
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() => {
                      setNames(
                        names.filter((val) => {
                          if (val === item) {
                            return false;
                          } else {
                            return true;
                          }
                        })
                      );
                    }}
                    mode="text"
                  >
                    remove
                  </Button>
                </Card.Actions>
              </Card>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.startButtonView}>
        <Button
          mode="contained"
          onPress={() => {
            if (names.length < 3) {
              alert("You must have at least four people to start a pool.");
            } else if (names.length > 12) {
              alert("You cannot have a pool bigger than 12 people.");
            } else {
              setFencers(names);
              navigation.navigate("BoutScreen");
            }
          }}
        >
          Start Pool
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  namesList: {
    flex: 1,

    justifyContent: "center",
  },
  startButtonView: {
    margin: 10,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setFencers: (fencers) => dispatch(setFencers(fencers)),
  };
}

export default connect(undefined, mapDispatchToProps)(NameScreen);
