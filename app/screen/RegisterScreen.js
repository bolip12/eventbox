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
    
  }

  async onSubmit() {
    this.validate({
      email: {required:true, email: true},
      password: {required:true, minlength:6},
    });

    if(this.isFormValid()) {
      
      const email = this.state.email;
      const password = this.state.password;

      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      if(error != null) {
        showMessage({
            message: error.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {

       const { data, error } = await supabase
          .from('user')
          .insert([{ 
                    auth_id: user.id,
                    email: email,
                    tipe: 'member',
                    created_at: new Date(),
                    updated_at: new Date(),
                  }])
          

       await AsyncStorage.setItem('@loginEmail', email);
       await AsyncStorage.setItem('@loginPassword', password);       

       this.props.navigation.navigate('LoginScreen');

        showMessage({
            message: 'Berhasil Login',
            type: 'success',
            icon: 'success',
        });

      }

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
            <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
            <Appbar.Content title="Sign Up" titleStyle={{color:'green'}} />
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
              onPress={() => this.onSubmit()}
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
