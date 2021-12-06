import React, { useState } from 'react';
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
} from 'react-native';

import firebase from 'firebase';
export default class First extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { 
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };
  render() {
    return (
      <View>
        <Image
          source={require('../assets/logo1.png')}
          style={{
            width: 300,
            height: 300,
            alignSelf: 'center',
            marginTop: '50%',
          }}
        />

        <TouchableOpacity
          style={{
            width: '60%',
            borderWidth: 1,
            marginTop: 40,
            alignSelf: 'center',
            height: 40,
            borderRadius: 20,
            backgroundColor: '#56aeff',
            justifyContent: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
