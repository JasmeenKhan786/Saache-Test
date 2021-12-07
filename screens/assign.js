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
  Modal,
  ScrollView,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";

export default class Assign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      email_sender: firebase.auth().currentUser.email,
      email_receiever: "",
      title: "",
      description: "",
      date: null,
      priority: 0,
      data: [],
    };
  }
  save = () => {
    db.collection("assignment").add({
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      priority: this.state.priority,
      email_sender: this.state.email_sender,
      email_receiever: this.state.email_receiever,
      status: "Pending",
    });
    this.setState({ modalVisible: false });
    alert("You have succeefully Assigned the Task");
    this.getData();
  };
  componentDidMount() {
    this.getData();
  }

  delete_task = async (id) => {
    await db.collection("assignment").doc(id).delete();
    alert("Task Deleted, Do not forget to create a new task");
    this.getData();
  };

  getData = async () => {
    //collection get()
    //await async
    this.setState({ data: [] });
    var response = await db
      .collection("assignment")
      .where("email_sender", "==", firebase.auth().currentUser.email)
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

      return (
        <View style={{ flex: 1, backgroundColor: "#eec0c6" }}>
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
                Assigned Tasks
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={{flex:1}}>
            {this.state.data.length!=0?(this.state.data.map((x,index) => {
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
                    width: "90%",
                    borderWidth: 1,
                    borderColor:'white',
                    borderRadius: 10,
                    marginTop: 10,
                    marginHorizontal: 10,
                    alignSelf: "center",
                    justifyContent: "space-around",
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                    elevation: 30,
                    padding: 10,
                  }}
                >
                  <FontAwesome name="list-alt" size={24} color="black" />
                  <View style={{ width: "70%", paddingLeft: 10 }}>
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
                    <Text style={{ fontWeight: "bold" }}>{x.priority}</Text>
                    <Text style={{ color: "gray", fontSize: 14 }}>
                      {"Sent To: " + x.email_receiever}
                    </Text>
                  </View>
                  <View style={{}}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: text,
                        backgroundColor: bg,
                        padding: 4,
                        borderRadius: 5,
                      }}
                    >
                      {x.status}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.delete_task(x.id);
                      }}
                      style={{
                        marginTop: 20,
                        alignSelf: "center",
                      }}
                    >
                      <AntDesign name="delete" size={24} color="#22a0e7" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })): (<View style={{justifyContent:'center', alignItems:'center', flex:1}}><Text style={{fontWeight:'bold', fontSize:18}}>Tasks assigned by you will appear here</Text></View>)}
          </ScrollView>

          <TouchableOpacity
            style={{
              backgroundColor: "#861657",
              width: "60%",
              height: 30,
              alignSelf: "center",
              borderRadius: 30,
              elevation: 30,
              marginVertical: 10,
              // position:'absolute',
              // bottom:10
            }}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Text style={{ color: "white", textAlign: "center", fontSize: 22 }}>
              + Assign Task
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                width: "80%",
                height: "60%",
                alignSelf: "center",
                backgroundColor: "white",
                borderWidth: 2,
                borderColor: "black",
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 14,
                  textAlign: "center",
                  marginTop: 10,
                }}
              >
                Please provide the following information
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              >
                <FontAwesome5 name="list-ul" size={24} color="black" />
                <TextInput
                  style={{
                    width: "70%",
                    paddingLeft: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: "black",
                    borderRadius: 1,
                    marginLeft: "5%",
                  }}
                  placeholder="Name of the Assignment"
                  onChangeText={(value) => {
                    this.setState({ title: value });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              >
                <MaterialCommunityIcons
                  name="account-details"
                  size={24}
                  color="black"
                />
                <TextInput
                  style={{
                    width: "70%",
                    paddingLeft: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: "black",
                    borderRadius: 1,
                    marginLeft: "5%",
                  }}
                  placeholder="Description"
                  onChangeText={(value) => {
                    this.setState({ description: value });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              >
                <MaterialIcons name="priority-high" size={24} color="black" />
                <TextInput
                  style={{
                    width: "70%",
                    paddingLeft: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: "black",
                    borderRadius: 1,
                    marginLeft: "5%",
                  }}
                  placeholder="Priority (1 Least and 5 Highest)"
                  onChangeText={(value) => {
                    this.setState({ priority: value });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              >
                <Fontisto name="date" size={24} color="black" />
                <DatePicker
                  showIcon={false}
                  androidMode="spinner"
                  style={{ width: "70%", marginLeft: 10 }}
                  date={this.state.date}
                  mode="date"
                  placeholder="DD/MM/YYYY"
                  format="DD-MM-YYYY"
                  confirmBtnText="Chọn"
                  cancelBtnText="Hủy"
                  customStyles={{
                    dateInput: {
                      borderBottomWidth: 1,
                    },
                  }}
                  onDateChange={(date) => {
                    this.setState({ date: date });
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: "10%",
                  marginLeft: "10%",
                }}
              >
                <MaterialCommunityIcons
                  name="email-minus-outline"
                  size={24}
                  color="black"
                />
                <TextInput
                  style={{
                    width: "70%",
                    paddingLeft: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: "black",
                    borderRadius: 1,
                    marginLeft: "5%",
                  }}
                  placeholder="Whom to assign? Email"
                  onChangeText={(value) => {
                    this.setState({ email_receiever: value });
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "blue",
                  width: "50%",
                  height: 30,
                  alignSelf: "center",
                  borderRadius: 10,
                  marginTop: 30,
                  justifyContent: "center",
                }}
                onPress={() => {
                  if (
                    this.state.email_receiever &&
                    this.state.date &&
                    this.state.title &&
                    this.state.description &&
                    this.state.priority
                  ) {
                    if (
                      this.state.email_receiever !== this.state.email_sender
                    ) {
                      this.save();
                    } else {
                      alert("You cannot assign task to yourself!");
                    }
                  } else {
                    alert("Please fill all the details!");
                  }
                }}
              >
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Add Assignment
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }
  
}
