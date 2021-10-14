import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Text, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator } from 'react-native-paper';

import storeApp from '../config/storeApp';
import styleApp from '../config/styleApp';


class LoginScreen extends Component {

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

  componentDidMount() {
    
  }

  onLoginMember() {

    storeApp.dispatch({
      type: 'LOGIN',
      payload: { tipe:'member'}
    });
  }
  
  onLoginLeader() {

    storeApp.dispatch({
      type: 'LOGIN',
      payload: { tipe:'leader'}
    });
  }

  onLoginYayasan() {

    storeApp.dispatch({
      type: 'LOGIN',
      payload: { tipe:'yayasan'}
    });
  }

  render() {
      return (
        <>
          <Appbar.Header style={ styleApp.Appbar }>
            <Appbar.Content title="Login" titleStyle={{color:'green'}} />
          </Appbar.Header>

          <ScrollView style={ styleApp.ScrollView }>
          <View style={{ marginVertical:10 }}>
            <TextInput
              label="Email"
              value={this.state.email}
              onChangeText={text => this.setState({email:text})}
              style={ styleApp.TextInput }
            />

            <TextInput
              label="Password"
              value={this.state.password}
              onChangeText={text => this.setState({password:text})}
              secureTextEntry={true}
              style={ styleApp.TextInput }
            />
          </View>

          <Button
              mode="contained"
              icon="login"
              onPress={() => this.onLoginMember()}
              style={styleApp.Button}
          >
            Login Member
          </Button>

           <Button
              mode="contained"
              icon="login"
              onPress={() => this.onLoginLeader()}
              style={styleApp.Button}
          >
            Login Leader
          </Button>

          <Button
              mode="contained"
              icon="login"
              onPress={() => this.onLoginYayasan()}
              style={styleApp.Button}
          >
            Login Yayasan
          </Button>

          </ScrollView>
        </>
      )
  }
}

export default LoginScreen;
