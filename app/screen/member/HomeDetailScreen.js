import React, { Component } from 'react';
import { View, ScrollView} from 'react-native';
import { Appbar, Divider, TextInput, Button } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';

class HomeDetailScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
        ...this.state,

        waktu:new Date(),
        dana: '',
    }
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Cetak Spanduk" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <DateTimeInput
            title="Tanggal"
            value={this.state.waktu}
            mode="date"
            onChangeDate={(date) => this.setState({waktu:date})}
            style={{ marginTop:-10}}
          />
          <Divider />

           <DateTimeInput
            title="Waktu"
            value={this.state.waktu}
            mode="time"
            onChangeDate={(time) => this.setState({waktu:time})}
            style={{ marginTop:-10}}
          />
          <Divider />

          <TextInput
            label="Dana"
            value={this.state.dana}
            onChangeText={text => this.setState({dana: text})}
            style={styleApp.TextInput}
          />

        </ScrollView>

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            style={styleApp.Button}
            icon="check"
          >
            Set Selesai
          </Button>
        </View>

      </>
    );
  }
}

export default HomeDetailScreen;