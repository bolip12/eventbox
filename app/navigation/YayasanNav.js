import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

import HomeScreen from '../screen/yayasan/HomeScreen';
import HomeDetailScreen from '../screen/yayasan/HomeDetailScreen';
import HomeDetailScreen2 from '../screen/yayasan/HomeDetailScreen2';
import SetTugasScreen from '../screen/yayasan/SetTugasScreen';

import EventScreen from '../screen/yayasan/EventScreen';
import EventDetailScreen from '../screen/yayasan/EventDetailScreen';
import EventUserScreen from '../screen/yayasan/EventUserScreen';
import EventUpdateScreen from '../screen/yayasan/EventUpdateScreen';

import LaporanScreen from '../screen/yayasan/LaporanScreen';
import LapPenggunaanDanaScreen from '../screen/yayasan/LapPenggunaanDanaScreen';

class YayasanNav extends Component {

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
                      <Stack.Screen name="HomeDetailScreen2" component={HomeDetailScreen2} options={{headerShown:false}} />
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
                      
                    </Stack.Navigator>
            )}
          </Tab.Screen>

          <Tab.Screen 
            name="LaporanTab" 
            options={{
              tabBarLabel: 'Laporan',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={26} />
              ),
            }} 
          >
            {() => (<Stack.Navigator initialRouteName="Laporan">
                      <Stack.Screen name="LaporanScreen" component={LaporanScreen} options={{headerShown:false}} />
                      <Stack.Screen name="LapPenggunaanDanaScreen" component={LapPenggunaanDanaScreen} options={{headerShown:false}} />
                      
                    </Stack.Navigator>
            )}
          </Tab.Screen>
          
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default YayasanNav;