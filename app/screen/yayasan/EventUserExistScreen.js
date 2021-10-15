import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, Divider, IconButton} from 'react-native-paper';

import styleApp from '../../config/styleApp.js';

class EventUserExistScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
      
        <ScrollView style={ styleApp.ScrollView}>
          <List.Item
            title="John Wick"
            right={props => <IconButton icon="trash-can-outline" color='grey' />}
            
          />
          <Divider />

          <List.Item
            title="James"
            right={props => <IconButton icon="trash-can-outline" color='grey'  />}
            
          />
          <Divider />


        </ScrollView>

      </>
    );
  }
}

export default EventUserExistScreen;