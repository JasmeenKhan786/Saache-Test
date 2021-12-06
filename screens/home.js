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
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome5 } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";

//justify content - main axis
//alignItems - cross axis

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: firebase.auth().currentUser.email,
      data: [],
      todo: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  log_out = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("Logout");
        this.props.navigation.navigate("First");
      })
      .catch((error) => {
        alert(error);
      });
  };
  getData = async () => {
    //collection get()
    //await async
    this.setState({ data: [] });
    var response = await db
      .collection("families")
      .where("email", "==", firebase.auth().currentUser.email)
      .get();
    response.docs.map((x) => {
      var temp = this.state.data;
      var temp2 = x.data();
      temp2["id"] = x.id;
      temp.push(temp2);
      this.setState({ data: temp });  
    });

    var resp = await db
      .collection("assignment")
      .where("email_receiever", "==", firebase.auth().currentUser.email)
      .where("status", "==", "Pending")
      .get();

    resp.docs.map((d)=>{
      this.setState({task:d.data()})
    })
    this.setState({ todo: resp.docs.length });


    var resp = await db
      .collection("assignment")
      .where("email_receiever", "==", firebase.auth().currentUser.email)
      .where("status", "==", "Completed")
      .get();

    this.setState({ done: resp.docs.length });

    var resp = await db
      .collection("assignment")
      .where("email_sender", "==", firebase.auth().currentUser.email)
      .get();

    this.setState({ given: resp.docs.length });
  };

  render() {
    if (this.state.data.length === 0) {
      return (
        <View style={{ alignItems: "center", marginTop: "60%" }}>
          <Image
            source={require("../assets/circles-menu-1.gif")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 75,
            }}
          />
          <Text style={{ fontSize: 30 }}>Loading..</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, borderRadius: 25, backgroundColor: "#FBF2E3" }}>
          <ScrollView contentContainerStyle={{flex:1}}>
          <View
            style={{
              flexDirection: "row",
              marginTop: '15%', 
              justifyContent: "space-around",
              alignItems:'center' 
            }}
          >
            <View>
              <Text
                style={{ color: "#80687D", fontWeight: "bold", fontSize: 30 }}
              >
                {this.state.data[0].family_name}
              </Text>
              <Text style={{ color: "#80687D", fontSize: 11 }}>Child</Text>
            </View>

            <Image
              source={require("../assets/bg.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 75,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.log_out();
              }}
              style={{ 
                alignItems:'center'
              }}
            >
              <MaterialCommunityIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 20,
              width: "80%",
              height: 40,
              alignSelf: "center",
              marginTop: 30,
              alignItems:'center'
            }}
          >
            <TextInput
              style={{
                paddingLeft: 20,
                width: "85%",
                height: 30,
              }}
              placeholder="Search"
            />
            <View>
              <TouchableOpacity style={{  }}>
                <AntDesign name="search1" size={20} color="purple" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 30, marginLeft: "10%" }}>
            <Text style={{ fontSize: 25, color: "#80687D" }}>My Tasks </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#0a83da",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <FontAwesome5 name="clipboard-list" size={24} color="white" />
            </View>
            <Text
              style={{
                color: "#80687D",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              To Do
            </Text>
            <Text
              style={{
                color: "#80687D",
                fontSize: 11,
                marginTop: 20,
                marginLeft: 140,
              }}
            >
              {this.state.todo+" Tasks"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#1590df",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <FontAwesome5 name="clipboard-list" size={24} color="white" />
            </View>
            <Text
              style={{
                color: "#80687D",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Done
            </Text>
            <Text
              style={{
                color: "#80687D",
                fontSize: 11,
                marginTop: 20,
                marginLeft: 140,
              }}
            >
              {this.state.done+" Tasks"}
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#37b9f3",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "10%",
              }}
            >
              <FontAwesome5 name="clipboard-list" size={24} color="white" />
            </View>
            <Text
              style={{
                color: "#80687D",
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              Given
            </Text>
            <Text
              style={{
                color: "#80687D",
                fontSize: 11,
                marginTop: 20,
                marginLeft: 140,
              }}
            >
              {this.state.given+" Tasks"}
            </Text>
          </View>


          <View
            style={{
              backgroundColor: "white",
              borderTopRightRadius: 50,
              borderTopLeftRadius: 50,
              marginTop: 30,
              flex:1
            }}
          >
            <Text
              style={{
                color: "#80687D",
                fontWeight: "bold",
                fontSize: 30,
                marginTop: 5,
                alignSelf:'center'
              }}
            >
              Recently Assigned
            </Text>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 10,
                borderLeftColor: "orange",
                borderLeftWidth: 10,
                justifyContent:'space-between',
                width:'85%',
                alignSelf:'center',
                height:150,
                elevation:20,
                padding:20,
                marginTop:20
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#80687D",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  Task
                </Text>
                <Text style={{  }}> Description of your task</Text>
                <Text style={{  }}> Deadline </Text>
                <Text style={{ alignSelf:'flex-end' , marginTop:30, color:'grey', fontSize:15 }} onPress={()=>{
                  this.props.navigation.navigate('MyTask')
                }}> See All Tasks </Text>

              </View>
              <Text
                style={{
                  color: "#80687D",
                  fontSize: 11,
                  marginTop: 20,
                }}
              >
                High Priority
              </Text>
            </View>
          </View>
          </ScrollView>
        </View>
      );
    }
  }
}
