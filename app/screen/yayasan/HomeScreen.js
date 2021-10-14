import React, { Component } from 'react';
import { View, ScrollView }  from 'react-native';
import { Appbar, Title, Subheading, Divider, List } from 'react-native-paper';
import styleApp from '../../config/styleApp.js';

class HomeScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
           <Appbar.Content title="Yayasan" titleStyle={{color:'green'}} />
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