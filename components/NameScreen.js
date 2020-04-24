import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { setFencers } from "../utils/actions";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

//input fencer names
function NameScreen({ navigation, setFencers }) {
  const [names, setNames] = useState([]);
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(newText) => {
            setText(newText);
          }}
          value={text}
          placeholder={"fencer name"}
        />
        <TouchableOpacity
          onPress={() => {
            if (text !== "") {
              setNames([...names, text]);
              setText("");
            }
          }}
        >
          <Icon name="plus" size={30} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.namesList}>
        <ScrollView>
          {names.map((item, index) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
                key={index}
              >
                <Text style={{ padding: 10 }}>{`${index + 1}. ${item}`}</Text>
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
                  title="remove"
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.startButtonView}>
        <Button
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
          title="Start Pool"
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
  header: {
    marginTop: "15%",
    fontSize: 20,
    color: "red",
    paddingBottom: 10,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    borderColor: "black",
    borderBottomWidth: 1,
    paddingRight: 10,
    paddingBottom: 10,
    margin: 10,
  },
  textInput: {
    flex: 1,
    height: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
    minHeight: "3%",
  },
  namesList: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
