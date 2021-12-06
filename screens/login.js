import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import db from '../config';
import firebase from 'firebase';
//Class - states and properties

//JSX - Javascript and XML

//props

//alignItems, justifyContent, alignSelf

//Margin, padding

//states
//JSON format {key:value, key:value}
//JS object
//Arrow functions ()=>{}

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  userLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
       alert("Login successful!");
       this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={{ width: '100%', height: '100%' }}>
          <Image
            source={require('../assets/logo1.png')}
            style={{
              width: 150,
              height: 150,
              alignSelf: 'center',
              marginTop: '20%',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              width: '90%',
              marginTop: 40,
              alignSelf: 'center',
            }}>
            <View style={{ padding: 5 }}>
              <AntDesign name="user" size={22} color="black" />
            </View>
            <TextInput
              style={{ width: '90%', paddingLeft: 10 }}
              placeholder="Email"
              onChangeText={(value) => {
                this.setState({ email: value });
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              width: '90%',
              marginTop: 30,
              alignSelf: 'center',
            }}>
            <View style={{ padding: 5 }}>
              <AntDesign name="lock" size={24} color="black" />
            </View>
            <TextInput
              style={{ width: '90%', paddingLeft: 10 }}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(value) => {
                this.setState({ password: value });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              width: '60%',
              borderWidth: 1,
              marginTop: 80,
              alignSelf: 'center',
              height: 40,
              borderRadius: 20,
              backgroundColor: 'pink',
              borderColor: 'pink',
              justifyContent: 'center',
            }}
            onPress={()=>{
              if(this.state.email && this.state.password){
              this.userLogin()
              }
              else{
                alert('Please fill all the details!')

              }
            }}>
            <Text style={{ textAlign: 'center' }}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '60%',
              borderWidth: 1,
              marginTop: 30,
              alignSelf: 'center',
              height: 40,
              borderRadius: 20,
              borderColor: 'pink',
              justifyContent: 'center',
            }} 
            onPress={()=>{
              this.props.navigation.navigate('Signup')
            }}>
            <Text style={{ textAlign: 'center' }}>Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
};
