import React, { Component } from 'react';
import { View, Alert, ScrollView } from 'react-native';
import { Provider as PaperProvider, Text, Appbar, Button, TextInput, Portal, Modal, ActivityIndicator, HelperText } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";

import supabase from '../config/supabase';
import store from '../config/storeApp';
import styleApp from '../config/styleApp';


class LoginScreen extends ValidationComponent {

  constructor(props) {
      super(props);

      //redux variable
      this.state = store.getState();
      store.subscribe(()=>{
        this.setState(store.getState());
      });

      //default state value
      this.state = {
        ...this.state,
        email: '',
        password: '',
        name: '',
        phone: '',
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
      name: {required:true},
      phone: {required:true, numeric:true, minlength:10},
    });

    if(this.isFormValid()) {
      store.dispatch({
            type: 'LOADING',
            payload: { isLoading:true }
        });
      
      const email = this.state.email;
      const password = this.state.password;
      const name = this.state.name;
      const phone = this.state.phone;

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

        const { data:insert_user, error} = await supabase
          .from('user')
          .insert([{ 
                    auth_id: user.id,
                    email: email,
                    created_at: new Date(),
                    updated_at: new Date(),
                  }])

        let uid = insert_user[0].id;

        const { data:data_member, error:error_member} = await supabase
          .from('member')
          .insert([{ 
                    name: name,
                    phone: phone,
                    created_at: new Date(),
                    updated_at: new Date(),
                    uid: uid,
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

      store.dispatch({
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

            <TextInput
              label="Name"
              value={this.state.name}
              onChangeText={text => this.setState({name:text})}
              style={ styleApp.TextInput }
            />
            {this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

            <TextInput
              label="Phone"
              value={this.state.phone}
              onChangeText={text => this.setState({phone:text})}
              keyboardType={"numeric"}
              style={ styleApp.TextInput }
            />
          {this.isFieldInError('phone') && this.getErrorsInField('phone').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }
          
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
