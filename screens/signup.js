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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      no_members: 1,
      family_name: "",
      city: "",
    };
  }
  user_signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        db.collection("families").add({
          email: this.state.email,
          family_name: this.state.family_name,
          no_members: this.state.no_members,
          city: this.state.city,
        });

        alert("Your Family is registered");
        var user = userCredential.user;

        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            source={require("../assets/logo1.png")}
            style={{
              width: 150,
              height: 150,
              alignSelf: "center",
              marginTop: 30,
            }}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 22, textAlign: "center" }}
          >
            {" "}
            Let's add your Family First
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: "90%",
              marginTop: 10,
              alignSelf: "center",
            }}
          >
            <View style={{ padding: 5 }}>
              <MaterialCommunityIcons
                name="email-minus-outline"
                size={24}
                color="black"
              />
            </View>
            <TextInput
              style={{ width: "90%", paddingLeft: 10 }}
              placeholder="E-mail"
              onChangeText={(value) => {
                this.setState({ email: value });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: "90%",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <View style={{ padding: 5 }}>
              <AntDesign name="user" size={22} color="black" />
            </View>
            <TextInput
              style={{ width: "90%", paddingLeft: 10 }}
              placeholder="Family Name"
              onChangeText={(value) => {
                this.setState({ family_name: value });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: "90%",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <View style={{ padding: 5 }}>
              <AntDesign name="lock" size={22} color="black" />
            </View>
            <TextInput
              style={{ width: "90%", paddingLeft: 10 }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(value) => {
                this.setState({ password: value });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: "90%",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <View style={{ padding: 5 }}>
              <MaterialIcons name="people" size={24} color="black" />
            </View>
            <TextInput
              style={{ width: "90%", paddingLeft: 10 }}
              placeholder="No. family Member"
              onChangeText={(value) => {
                this.setState({ no_members: value });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              width: "90%",
              marginTop: 40,
              alignSelf: "center",
            }}
          >
            <View style={{ padding: 5 }}>
              <MaterialIcons name="location-pin" size={24} color="black" />
            </View>
            <TextInput
              style={{ width: "90%", paddingLeft: 10 }}
              placeholder="Where you live"
              onChangeText={(value) => {
                this.setState({ city: value });
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              width: "60%", 
              borderWidth: 1,
              marginTop: 40,
              alignSelf: "center",
              height: 40,
              borderRadius: 20,
              backgroundColor: "#56aeff",
              justifyContent: "center",
            }}
            onPress={() => {
              if (
                this.state.email &&
                this.state.password &&
                this.state.family_name &&
                this.state.no_members &&
                this.state.city
              ) {
                this.user_signup();
              } else {
                alert("Please fill all the details!");
              }
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Signup
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "60%",
              borderWidth: 1,
              marginTop: 30,
              alignSelf: "center",
              height: 40,
              borderRadius: 20,
              borderColor: "pink",
              justifyContent: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={{ textAlign: "center" }}>Log In</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
