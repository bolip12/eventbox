import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Divider} from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';

class EventUpdateScreen extends Component {

  constructor(props) {
    super(props);

     this.state = {
        ...this.state,

        tanggal:new Date(),
        dana: '200,000',
        nama: 'Cetak Spanduk'
    }
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Ubah Event" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <TextInput
            label="Nama"
            value={this.state.nama}
            onChangeText={text => this.setState({nama: text})}
            style={styleApp.TextInput}
          />

          <TextInput
            label="Dana"
            value={this.state.dana}
            onChangeText={text => this.setState({dana: text})}
            style={styleApp.TextInput}
          />

           <DateTimeInput
            title="Tanggal"
            value={this.state.tanggal}
            mode="date"
            onChangeDate={(date) => this.setState({waktu:tanggal})}
            style={{ marginTop:-10}}
          />
          <Divider />

        </ScrollView>

      </>
    );
  }
}

export default EventUpdateScreen;