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

class EventPosInsertExistScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,

        email: '',
      }


  }

  componentDidMount() {
    

  }

  async onSubmit() {
    this.validate({
      email: {required:true},
    });

    if(this.isFormValid()) {
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      //query
      let { data:data_user, error } = await supabase
          .from('user')
          .select('id, email, member(id, name, phone)')
          .eq('email', this.state.email)
          .single()

      let member_id = '';

        if(data_user !== null) {
        member_id = data_user.member[0].id;

        store.dispatch({
          type: 'NEWMEMBER',
          payload: { type_temp:'existing', member_id:member_id, email_temp:null, password_temp:null, name_temp:null, phone_temp:null}
        });

        this.props.navigation.navigate('EventPosInsertParentScreen', { event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name})

        store.dispatch({
            type: 'LOADING',
            payload: { isLoading:false }
        });

      } else {

        showMessage({
            message: "Email belum terdaftar",
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

export default EventPosInsertExistScreen;