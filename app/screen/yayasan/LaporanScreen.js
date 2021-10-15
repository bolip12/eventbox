import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, List, Divider, Button } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';

class LaporanScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
           <Appbar.Content title="Laporan" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView } >
          
          <List.Item
            title="Laporan Penggunaan Dana"
            titleStyle={{ fontSize:17 }}
            right={props => <List.Icon {...props} icon="arrow-right" color='green'  />}
            onPress={() => this.props.navigation.navigate('LapPenggunaanDanaScreen')}
          />
          <Divider />

        </ScrollView>

      </>
    );
  }
}

export default LaporanScreen;