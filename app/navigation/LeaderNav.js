import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from '../screen/leader/HomeScreen';
import HomeDetailScreen from '../screen/leader/HomeDetailScreen';
import SetTugasScreen from '../screen/leader/SetTugasScreen';

import EventScreen from '../screen/leader/EventScreen';
import EventDetailScreen from '../screen/leader/EventDetailScreen';
import EventUserScreen from '../screen/leader/EventUserScreen';
import EventUpdateScreen from '../screen/leader/EventUpdateScreen';
import EventInsertScreen from '../screen/leader/EventInsertScreen';
import EventDetailInsertScreen from '../screen/leader/EventDetailInsertScreen';

import SettingScreen from '../screen/leader/SettingScreen';

class LeaderNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName="Home"
          activeColor="green"
          barStyle={{ backgroundColor:'white' }}
        >
          <Tab.Screen 
            name="HomeTab" 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }} 
          >
            {() => (<Stack.Navigator initialRouteName="Home">
                      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}} />
                      <Stack.Screen name="HomeDetailScreen" component={HomeDetailScreen} options={{headerShown:false}} />
                      <Stack.Screen name="SetTugasScreen" component={SetTugasScreen} options={{headerShown:false}} />
                    </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen 
            name="EventTab" 
            options={{
              tabBarLabel: 'Event',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={26} />
              ),
            }} 
          >
            {() => (<Stack.Navigator initialRouteName="Event">
                      <Stack.Screen name="EventScreen" component={EventScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventUserScreen" component={EventUserScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventUpdateScreen" component={EventUpdateScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventInsertScreen" component={EventInsertScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventDetailInsertScreen" component={EventDetailInsertScreen} options={{headerShown:false}} />
                      
                    </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen 
            name="SettingTab" 
            component={SettingScreen} 
            options={{
              tabBarLabel: 'Setting',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default LeaderNav;