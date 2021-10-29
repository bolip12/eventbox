import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge, Caption, TextInput, Checkbox, HelperText } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';

import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';
import DateTimeInput from '../../comp/dateTimeInput.js';
import dateFilterFormat from '../../comp/dateFilterFormat.js';
import dateFormat from '../../comp/dateFormat.js';
import PickerInput from '../../comp/pickerInput.js';

class EventPosInsertNewScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,

        email: '',
        password: '',
        name: '',
        phone: '',
        passwordHide: true,
        passwordIcon: 'eye',
        
      }


  }

  componentDidMount() {

  }

  /*async getDataMember() {
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });
    
    let event_id = this.props.route.params.event_id;
    let list_event_member = this.props.route.params.list_event_member;

    let { data, error } = await supabase
          .from('member')
          .select('id, name')
          //.eq('event_id', event_id)
          

    let memberList = [];

    data.map(member => {

      let exist = false;
      list_event_member.map(member_id => {
        if(member.id === member_id) {
          exist = true;
        }
      })

      if(!exist) {
        memberList.push({value:member.id, label:member.name})
      }
    })

    data.map(doc => {
      memberList.push({
        value: doc.id,
        label: doc.name,
      });
    });

    //result
    this.setState({memberList:memberList});

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
  } */

  


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

      //query
      let { data:data_user, error } = await supabase
          .from('user')
          .select('id, email')
          .eq('email', this.state.email)
          .single()

      if(data_user == null) {

        store.dispatch({
          type: 'NEWMEMBER',
          payload: { type_temp:'new', member_id:null, email_temp:this.state.email, password_temp:this.state.password, name_temp:this.state.name, phone_temp:this.state.phone}
        });

        this.props.navigation.navigate('EventPosInsertParentScreen', { event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name})

        store.dispatch({
            type: 'LOADING',
            payload: { isLoading:false }
        });

      } else {
        showMessage({
            message: "Email sudah terdaftar",
            type: 'danger',
            icon: 'danger',
        });

         store.dispatch({
            type: 'LOADING',
            payload: { isLoading:false }
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
        <ScrollView style={ styleApp.ScrollView }>
        <View style={{ marginVertical:10 }}>
          <TextInput
            label="Email"
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            style={styleApp.TextInput}
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

        </ScrollView>

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.onSubmit() }
            style={styleApp.Button}
            icon="plus"
          >
            Simpan
          </Button>
        </View>

      </>
    );
  }
}

export default EventPosInsertNewScreen;