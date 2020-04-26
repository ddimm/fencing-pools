import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Card,
  IconButton,
  Paragraph,
  TextInput,
  Title,
} from "react-native-paper";
import { connect } from "react-redux";
import { setFencers } from "../utils/actions";

function NameCard({ name, index, removeName }) {
  return (
    <Card
      key={index}
      style={{ marginBottom: 10, marginLeft: 5, marginRight: 5 }}
    >
      <Card.Content>
        <Title>{`Fencer ${index + 1}`}</Title>
        <Paragraph>{`${name}`}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={removeName} mode="text">
          remove
        </Button>
      </Card.Actions>
    </Card>
  );
}

//input fencer names
function NameScreen({ navigation, setFencers }) {
  const [names, setNames] = useState([]);
  const [text, setText] = useState("");
  const [textInputFocus, setFocus] = useState(false);

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
          onFocus={() => {
            setFocus(true);
          }}
          onEndEditing={() => {
            setFocus(false);
          }}
          onSubmitEditing={() => {
            if (text !== "") {
              setNames([...names, text]);
              setText("");
            }
          }}
        ></TextInput>
      </View>
      <View style={styles.namesList}>
        <ScrollView>
          {names.map((value, index) => {
            return (
              <NameCard
                name={value}
                key={index}
                index={index}
                removeName={() => {
                  setNames(
                    names.filter((val) => {
                      if (val === value) {
                        return false;
                      } else {
                        return true;
                      }
                    })
                  );
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      {textInputFocus ? (
        <IconButton
          onPress={() => {
            if (text !== "") {
              setNames([...names, text]);
              setText("");
            }
          }}
          icon={"plus"}
          style={{
            alignSelf: "flex-end",
          }}
        />
      ) : (
        <></>
      )}

      <View style={styles.startButtonView}>
        <Button
          mode="contained"
          onPress={() => {
            if (names.length <= 3) {
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
