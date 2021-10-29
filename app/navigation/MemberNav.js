import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from '../screen/member/HomeScreen';
import HomeDetailScreen from '../screen/member/HomeDetailScreen';

import EventScreen from '../screen/member/EventScreen';
import EventUpdateScreen from '../screen/member/EventUpdateScreen';
import EventInsertScreen from '../screen/member/EventInsertScreen';
import EventTabScreen from '../screen/member/EventTabScreen';
import EventTaskScreen from '../screen/member/EventTaskScreen';
import EventTaskInsertScreen from '../screen/member/EventTaskInsertScreen';
import EventTaskUpdateScreen from '../screen/member/EventTaskUpdateScreen';
import EventMemberScreen from '../screen/member/EventMemberScreen';
import EventMemberInsertScreen from '../screen/member/EventMemberInsertScreen';
import EventTaskMemberScreen from '../screen/member/EventTaskMemberScreen';

import EventPositionScreen from '../screen/member/EventPositionScreen';
import EventPosInsertScreen from '../screen/member/EventPosInsertScreen';
import EventPosUpdateScreen from '../screen/member/EventPosUpdateScreen';

import EventPosInsertParentScreen from '../screen/member/EventPosInsertParentScreen';

import EventImageScreen from '../screen/member/EventImageScreen';

import EventMonitorScreen from '../screen/member/EventMonitorScreen';
import EventMonitorTeamScreen from '../screen/member/EventMonitorTeamScreen';
import EventMonitorMeScreen from '../screen/member/EventMonitorMeScreen';

import SettingScreen from '../screen/member/SettingScreen';

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
                      <Stack.Screen name="EventMonitorScreen" component={EventMonitorScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventMonitorTeamScreen" component={EventMonitorTeamScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventMonitorMeScreen" component={EventMonitorMeScreen} options={{headerShown:false}} />
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
                      <Stack.Screen name="EventUpdateScreen" component={EventUpdateScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventInsertScreen" component={EventInsertScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventTabScreen" component={EventTabScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventTaskScreen" component={EventTaskScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventTaskInsertScreen" component={EventTaskInsertScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventTaskUpdateScreen" component={EventTaskUpdateScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventMemberScreen" component={EventMemberScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventMemberInsertScreen" component={EventMemberInsertScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventTaskMemberScreen" component={EventTaskMemberScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventPositionScreen" component={EventPositionScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventPosInsertScreen" component={EventPosInsertScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventPosUpdateScreen" component={EventPosUpdateScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventImageScreen" component={EventImageScreen} options={{headerShown:false}} />
                      <Stack.Screen name="EventPosInsertParentScreen" component={EventPosInsertParentScreen} options={{headerShown:false}} />
                      
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