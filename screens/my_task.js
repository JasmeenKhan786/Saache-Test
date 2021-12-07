import React, { useState } from "react";
import {
  View,
  Picker,
  StyleSheet,
  Image,
  TextInput,
  CheckBox,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";

//Ternary Operator ?:
// condition?true:false

export default class MyTask extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }
  taskupdate = async (id) => {
    await db.collection("assignment").doc(id).update({ status: "Completed" });
    alert("Hurry!, You have completed a task.");
    this.getData();
  };

  getData = async () => {
    //collection get()
    //await async
    this.setState({ data: [] });
    var response = await db
      .collection("assignment")
      .where("email_receiever", "==", firebase.auth().currentUser.email)
      .get();
    response.docs.map((x) => {
      var temp = this.state.data;
      var temp2 = x.data();
      temp2["id"] = x.id;
      temp.push(temp2);
      this.setState({ data: temp });
      console.log(temp);
    });
  };

  render() {
    if (this.state.data.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#F2EBE0' }}
        >
          <Text style={{fontWeight:'bold', fontSize:18}}>Tasks assigned to you will appear here!</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: "#F2EBE0" }}>
          <View
            style={{
              backgroundColor: "#861657",
              flexDirection: "row",
            }}
          >
            <View
              style={{ flexDirection: "row", paddingTop: "10%", padding: 10 }}
            >
              <AntDesign name="calendar" size={27} color="white" />
              <Text style={{ color: "white", marginLeft: "5%", fontSize: 25 }}>
                My Tasks
              </Text>
            </View>
          </View>

          <ScrollView>
            {this.state.data.map((x, index) => {
              var color = "";
              if (x.priority <= 3) {
                color = "green";
              } else if (x.priority === 4) {
                color = "orange";
              } else {
                color = "red";
              }

              var bg = "";
              var text = "";

              if (x.status === "Pending") {
                bg = "red";
                text = "orange";
              } else x.status === "Complete";
              {
                bg = "green";
                text = "white";
              }

              return (
                <View
                key ={index}
                  style={{
                    width: "100%",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginTop: 10,
                    marginHorizontal: 10,
                    alignSelf: "center",
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                    backgroundColor: "white",
                    elevation: 30,
                  }}
                >
                  <FontAwesome name="list-alt" size={24} color="black" />
                  <View style={{ width: "65%", marginLeft: 20 }}>
                    <Text style={{ color: "gray", fontSize: 18 }}>
                      {x.title}
                    </Text>
                    <Text style={{ color: "gray", fontSize: 16 }}>
                      {x.description}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {x.date}
                    </Text>
                    <Text style={{ color: color, fontWeight: "bold" }}>
                      {x.priority}
                    </Text>
                    <Text style={{ color: "gray", fontSize: 14 }}>
                      {"Sent By: " + x.email_sender}
                    </Text>
                  </View>

                  <View style={{}}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: text,
                        backgroundColor: bg,
                        borderRadius: 5,
                        padding: 4,
                      }}
                    >
                      {x.status}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.taskupdate(x.id);
                      }}
                      style={{ marginTop: 10, alignSelf: "center" }}
                    >
                      {x.status === "Pending" ? (
                        <Feather name="square" size={24} color="black" />
                      ) : (
                        <AntDesign
                          name="checksquareo"
                          size={24}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  }
}
