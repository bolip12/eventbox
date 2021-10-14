import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, IconButton, Divider } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';

class EventUserNewScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ScrollView style={ styleApp.ScrollView}>
          <List.Item
            title="Carla"
            right={props => <IconButton icon="plus-circle-outline" color='green'  />}
            
          />
          <Divider />

          <List.Item
            title="Maria"
            right={props => <IconButton icon="plus-circle-outline" color='green'  />}
            
          />
          <Divider />


        </ScrollView>

      </>
    );
  }
}

export default EventUserNewScreen;