import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Divider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styleApp from '../../config/styleApp.js';

import EventUserExistScreen from './EventUserExistScreen'; 
import EventUserNewScreen from './EventUserNewScreen';  

const TopTab = createMaterialTopTabNavigator();

class EventUserScreen extends React.Component {

  constructor(props) {
    super(props);

  
  }

  render() {
    return (
      <>

          <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Cetak Spanduk" color= 'green'/>
          </Appbar.Header>
          
          <Divider style={{ backgroundColor: '#9e9e9e' }}/>

          <TopTab.Navigator
              tabBarOptions={{
                pressColor: 'green',
                indicatorStyle: { backgroundColor: 'green' },
              }}
              lazy={true}
              swipeEnabled={false}
          >
            <TopTab.Screen name="Dipilih" component={EventUserExistScreen} />
            <TopTab.Screen name="Tambah" component={EventUserNewScreen} />
          </TopTab.Navigator>
          
      </>    
    );
  }
};


export default EventUserScreen;