import React, { Component } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

class SettingScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
           <Appbar.Content title="Setting" titleStyle={{color:'green'}} />
        </Appbar.Header>

      </>
    );
  }
}

export default SettingScreen;