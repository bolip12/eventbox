import React, { Component } from 'react';
import { View, ScrollView }  from 'react-native';
import { Appbar, Title, Subheading, Divider, List } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import storeApp from '../../config/storeApp';

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    //redux variable
      this.state = storeApp.getState();
      storeApp.subscribe(()=>{
        this.setState(storeApp.getState());
      });

      //default state value
      this.state = {
        ...this.state,
       
      };

  }

  onLogout() {
     storeApp.dispatch({
      type: 'LOGIN',
      payload: { tipe:''}
    });
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
           <Appbar.Content title="Yayasan" titleStyle={{color:'green'}} />
           <Appbar.Action icon="logout" color='green' onPress={() => this.onLogout()} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <List.Item
            title="Event Coding"
            titleStyle={{ fontWeight: 'bold' }}
            description='Rp. 1,000,000 (70%)'
            right={props => <Subheading style={styleApp.Subheading}>40%</Subheading>}
            onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
          />
          <Divider />

          <List.Item
            title="Kampanye"
            titleStyle={{ fontWeight: 'bold' }}
            description='Rp. 1,500,000 (40%)'
            right={props => <Subheading style={styleApp.Subheading}>50%</Subheading>}
          />
          <Divider />

        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;