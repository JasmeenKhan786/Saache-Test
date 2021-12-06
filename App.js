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
import Login from './screens/login';
import Signup from './screens/signup'; 
import Home from './screens/home'; 
import First from './screens/first';

import AboutUs from './screens/about_us';
import MyTask from './screens/my_task';
import Assign from './screens/assign';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
//Class - states and properties

//JSX - Javascript and XML

//props

//alignItems, justifyContent, alignSelf

//Margin, padding
export default class App extends React.Component {
  render() {
    return (
     <AppContainer/>
    );
  }
}

const Tabs = createBottomTabNavigator({
  Home: {screen: Home,
  navigationOptions: {
        title: 'Home',
        tabBarIcon: <AntDesign name="home" size={24} color="grey" />,
      }},
  MyTask: {screen: MyTask,
    navigationOptions: {
        title: 'My Task', 
        tabBarIcon: <AntDesign name="calendar" size={24} color="grey" />,
      }},
  Assign: {screen: Assign,
    navigationOptions: {
        title: 'Assign',
        tabBarIcon: <FontAwesome name="tasks" size={24} color="grey" />,
      }},
  AboutUs: {screen: AboutUs,
    navigationOptions: {
        title: 'About Us',
        tabBarIcon: <MaterialCommunityIcons name="face-profile" size={24} color="grey" />,
      }}
},
   {
    tabBarOptions: {
      style: { backgroundColor: '' },
      activeTintColor:'black',
      inactiveTintColor:'grey'
    },});

const Switch = createSwitchNavigator({
 First: {screen: First},
Login: { screen: Login },
   Signup: { screen: Signup },
  Home: {screen: Tabs}
});


const AppContainer = createAppContainer(Switch);
