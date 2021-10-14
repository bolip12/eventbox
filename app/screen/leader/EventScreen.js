import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, Divider, Button } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';

class EventScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
           <Appbar.Content title="Event" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView } >
          
          <List.Item
            title="Event Coding"
            titleStyle={{ fontSize:17 }}
            right={props => <List.Icon {...props} icon="pencil" color='green'  />}
            onPress={() => this.props.navigation.navigate('EventDetailScreen')}
          />
          <Divider />

          <List.Item
            title="Kampanye"
            titleStyle={{ fontSize:17 }}
            //onPress={() => this.props.navigation.navigate('ProfilScreen')}
            right={props => <List.Icon {...props} icon="pencil" color='green'  />}
            
          />
          <Divider />

        </ScrollView>

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
            style={styleApp.Button}
            icon='plus'
          >
            Tambah Event
          </Button>
        </View>

      </>
    );
  }
}

export default EventScreen;