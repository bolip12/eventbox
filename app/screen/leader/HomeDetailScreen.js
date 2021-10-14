import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Subheading, Divider, List} from 'react-native-paper';
import styleApp from '../../config/styleApp.js';

class HomeDetailScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="John Wick" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ marginBottom:10 }}>Tugas Selesai</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>40%</Subheading>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ marginBottom:10 }}>Dana</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>Rp. 1,000,000</Subheading>
            </View>
          </View>
          <Divider />

          <List.Section>
            <List.Subheader>Daftar Tugas</List.Subheader><Divider />

            <List.Item
              title="Cetak Spanduk"
              titleStyle={{ fontSize:17 }}
              onPress={() => this.props.navigation.navigate('SetTugasScreen')}
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

export default HomeDetailScreen;