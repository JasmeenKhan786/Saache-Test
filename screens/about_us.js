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
import { MaterialCommunityIcons } from "@expo/vector-icons";
 
export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      status: "",
    };
  }
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
            <MaterialCommunityIcons 
              name="face-profile"
              size={34}
              color="white"
            />

            <Text style={{ color: "white", marginLeft: "5%", fontSize: 25 }}>
              About Us
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ marginHorizontal:10}}>
          <Text style={{ fontWeight: "bold", fontSize: 30 ,}}>About Us</Text>

          <Text style={{ marginTop: "5%", fontSize: 20 }}>
            Hello world let me introduce to my creative app ChallengeUp. As
            families are becoming nuclear families then in that parents are
            working in respective portfolio in this way, they are not able to
            look after their child(ren). So, I have created this app to solve
            this problem by giving task to each other which will help them to
            connect in a better way. I have made this application with a
            approach to make this world a better place to live and grow.
          </Text>

          <Text style={{ fontWeight: "bold", fontSize: 30 }}>How to use?</Text>

          <Text style={{ marginTop: "5%", fontSize: 20 }}>
            First login/sign up in the app then go to assign screen add a task
            if you are parents then assign to child or child then assign to
            parent by email ids registered with the app. Now go to task screen
            and check for assignment if there then complete it and also mark it
            as completed.
          </Text>
        </ScrollView>
      </View>
    );
  }
}
