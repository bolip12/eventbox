import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import HomeScreen from '../screen/yayasan/HomeScreen';
import HomeDetailScreen from '../screen/yayasan/HomeDetailScreen';

class YayasanNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
          <Stack.Screen name="HomeDetailScreen" component={HomeDetailScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default YayasanNav;