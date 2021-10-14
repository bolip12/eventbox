import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, IconButton, Divider, Button } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';

class EventDetailScreen extends Component {

  constructor(props) {
    super(props);
  }

  onRight() {
    return(
      <View style={{ flexDirection: 'row' }}>
        <IconButton icon="pencil" onPress={() => this.props.navigation.navigate('EventUpdateScreen')}/>
        <IconButton icon="account" onPress={() => this.props.navigation.navigate('EventUserScreen')}/>
      </View>
    )
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Event Coding" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>
          <List.Item
            title="Cetak Spanduk"
            titleStyle={{ fontSize:17 }}
            description="Rp. 200,000"
            right={props => this.onRight()}
          />
          <Divider />

          <List.Item
            title="Print Proposal"
            titleStyle={{ fontSize:17 }}
            description="Rp. 300,000"
            right={props => this.onRight()}
          />
          <Divider />

        </ScrollView>

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            //onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
            style={styleApp.Button}
            icon="plus"
          >
            Tambah
          </Button>
        </View>

      </>
    );
  }
}

export default EventDetailScreen;