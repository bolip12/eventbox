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
           <Appbar.Content title="Charlie" titleStyle={{color:'green'}} />
           <Appbar.Action icon="logout" color='green' onPress={() => this.onLogout()} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <Subheading style={{ marginVertical:15, fontSize:19, alignSelf:'center', fontWeight: 'bold' }}>Event Coding</Subheading>
          <Divider />

          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ marginBottom:10 }}>Percentase</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>40%</Subheading>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ marginBottom:10 }}>Dana</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>Rp. 1,000,000</Subheading>
            </View>
          </View>
          <Divider />

          <List.Item
            title="John Wick"
            titleStyle={{ fontWeight: 'bold' }}
            description='Rp. 200,000'
            right={props => <Subheading style={styleApp.Subheading}>40%</Subheading>}
            onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
          />
          <Divider />

          <List.Item
            title="James"
            titleStyle={{ fontWeight: 'bold' }}
            description='Rp. 500,000'
            right={props => <Subheading style={styleApp.Subheading}>50%</Subheading>}
          />
          <Divider />

        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;