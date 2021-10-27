import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Divider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styleApp from '../../config/styleApp.js';

import EventTaskScreen from './EventTaskScreen'; 
import EventPositionScreen from './EventPositionScreen';  

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
            <Appbar.Action icon="pencil" color='green' onPress={() => this.props.navigation.navigate('EventUpdateScreen', { event_id:this.props.route.params.event_id })}/>
            <Appbar.Action icon="image" color='green' onPress={() => this.props.navigation.navigate('EventImageScreen', { event_id:this.props.route.params.event_id })} />
          </Appbar.Header>
        

          <TopTab.Navigator
              tabBarOptions={{
                pressColor: 'green',
                indicatorStyle: { backgroundColor: 'green' },
              }}
              lazy={true}
              swipeEnabled={false}
          >
            <TopTab.Screen name="Task" component={EventTaskScreen} initialParams={{event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name}} />
            <TopTab.Screen name="Position" component={EventPositionScreen} initialParams={{event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name}} />
          </TopTab.Navigator>
          
      </>    
    );
  }
};


export default EventTabScreen;