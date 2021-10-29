import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Text, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, HelperText } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

import supabase from '../config/supabase';
import storeApp from '../config/storeApp';
import styleApp from '../config/styleApp';


class LoginScreen extends ValidationComponent {

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
        email: '',
        password: '',
        passwordHide: true,
        passwordIcon: 'eye',
      };
  }

  componentDidMount() {
    this.defaultValue();
  }

  async defaultValue() {

    let loginEmail = await AsyncStorage.getItem('@loginEmail');

    this.setState({ email:loginEmail });

    let loginPassword = await AsyncStorage.getItem('@loginPassword');
    this.setState({ password:loginPassword });

  }

  async onLogin() {
    this.validate({
      email: {required:true, email: true},
      password: {required:true, minlength:6},
    });

    if(this.isFormValid()) {
      storeApp.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      await AsyncStorage.setItem('@loginEmail', this.state.email);
      await AsyncStorage.setItem('@loginPassword', this.state.password);

      const { user, session, error } = await supabase.auth.signIn({
        email: this.state.email,
        password: this.state.password,
      })
      console.log(error)

      if(error != null) {
        showMessage({
            message: error.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {

        const { data:data_user, error:error_user } = await supabase
          .from('user')
          .select('id')
          .eq('auth_id', user.id)
          .single();

        const { data, error } = await supabase
          .from('member')
          .select('id')
          .eq('uid', data_user.id)
          .single();

        storeApp.dispatch({
            type: 'LOGIN',
            payload: { isLogin: true, uid:data_user.id, member_id:data.id}
        });

        showMessage({
            message: 'Berhasil Login',
            type: 'success',
            icon: 'success',
        });

      }

      storeApp.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });

    }

  }

  passwordDisplay() {
    let passwordIcon = this.state.passwordIcon == 'eye' ? 'eye-off-outline' : 'eye';
    this.setState({passwordIcon: passwordIcon});

    this.setState({passwordHide: !this.state.passwordHide});
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
            {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

            <TextInput
              label="Password"
              secureTextEntry={this.state.passwordHide}
              value={this.state.password}
              onChangeText={text => this.setState({password:text})}
              style={ styleApp.TextInput }
              right={<TextInput.Icon icon={this.state.passwordIcon} onPress={() => this.passwordDisplay()} />}
            />
            {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

           
          </View>

          <Button
              mode="contained"
              icon="login"
              onPress={() => this.onLogin()}
              style={styleApp.Button}
          >
            Login
          </Button>

           <Button
              mode="contained"
              icon="account"
              onPress={() => this.props.navigation.navigate('RegisterScreen')}
              style={styleApp.Button}
          >
            Daftar
          </Button>


          </ScrollView>
        </>
      )
  }
}

export default LoginScreen;
