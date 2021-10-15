import React, { Component } from 'react';
import { View, ScrollView, Dimensions} from 'react-native';
import { Appbar, Subheading, Divider, List} from 'react-native-paper';

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
          <Appbar.Content title="John Wick" titleStyle={{color:'green'}} />
          <Appbar.Action icon="logout" color='green' onPress={() => this.onLogout()} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              <Subheading>Tugas Selesai</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>40%</Subheading>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Subheading>Dana</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>Rp. 1,000,000</Subheading>
            </View>
          </View>
          <Divider />

          <List.Section>
            <List.Subheader>Daftar Tugas</List.Subheader><Divider />

            <List.Item
              title="Cetak Spanduk"
              titleStyle={{ fontSize:17 }}
              onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
              right={props => <List.Icon {...props} icon="timer-sand" color='green'  />}
              
            />
            <Divider />

            <List.Item
              title="Print Proposal"
              titleStyle={{ fontSize:17 }}
              description="Rp. 100,000"
              //onPress={() => this.props.navigation.navigate('ProfilScreen')}
              right={props => <List.Icon {...props} icon="check" color='green'  />}
              
            />
            <Divider />

          </List.Section>

        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;