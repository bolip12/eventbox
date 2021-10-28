import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Appbar, Divider } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import styleApp from '../../config/styleApp.js';
import store from '../../config/storeApp';

import EventMonitorTeamScreen from './EventMonitorTeamScreen'; 
import EventMonitorMeScreen from './EventMonitorMeScreen';  

const TopTab = createMaterialTopTabNavigator();

class EventMonitorScreen extends React.Component {

  constructor(props) {
    super(props);

    //redux variable
      this.state = store.getState();
      store.subscribe(()=>{
        this.setState(store.getState());
      });

    //default state value
    this.state = {
      ...this.state,
     
    }
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <>

          <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title={this.props.route.params.event_name} color= 'green'/>
          </Appbar.Header>
        

          <TopTab.Navigator
            tabBarOptions={{
              pressColor: 'green',
              indicatorStyle: { backgroundColor: 'green' },
            }}
            lazy={true}
            swipeEnabled={false}
          >
            { this.props.route.params.can_manage &&
              <TopTab.Screen name="Team" component={EventMonitorTeamScreen} initialParams={{event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name}} />
            }
            <TopTab.Screen name="Me" component={EventMonitorMeScreen} initialParams={{event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name}} />
          </TopTab.Navigator>
          
      </>    
    );
  }
};


export default EventMonitorScreen;