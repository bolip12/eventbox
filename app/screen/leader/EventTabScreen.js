import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Divider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styleApp from '../../config/styleApp.js';

import EventTaskScreen from './EventTaskScreen'; 
import EventMemberScreen from './EventMemberScreen';  

const TopTab = createMaterialTopTabNavigator();

class EventTabScreen extends React.Component {

  constructor(props) {
    super(props);

  
  }

  render() {
    return (
      <>

          <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title={this.props.route.params.event_name} color= 'green'/>
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
            <TopTab.Screen name="Task" component={EventTaskScreen} initialParams={{event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name}} />
            <TopTab.Screen name="Member" component={EventMemberScreen} initialParams={{event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name}} />
          </TopTab.Navigator>
          
      </>    
    );
  }
};


export default EventTabScreen;