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

class EventPosInsertParentScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,

        parentList: [],
        parent_id: '',
        parent: '',

        position_name:'',
        can_manage: false,
      }


  }

  componentDidMount() {
    
    this.getDataParent();
  } 

  async getDataParent() {
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });
    
    let event_id = this.props.route.params.event_id;

    let { data:data_parent, error:erorr_parent } = await supabase
          .from('event_member')
          .select('id, member(id, name)')
          .eq('event_id', event_id)

    let parentList = [];
    data_parent.map(doc => {
      parentList.push({
        value: doc.member.id,
        label: doc.member.name,
      });
    });

    //result
    this.setState({parentList:parentList});

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
  }

  async onSubmitNew() {
    this.validate({
      parent_id: {required:true},
      position_name: {required:true},
    });

    if(this.isFormValid()) {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let currDate = new Date();
      let event_id = this.props.route.params.event_id;

      const { user, error } = await supabase.auth.signUp({
        email: this.state.email_temp,
        password: this.state.password_temp,
      })

      if(error != null) {
        showMessage({
            message: error.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {
      
        const { data:insert_user, error:error_user} = await supabase
            .from('user')
            .insert([{ 
                      auth_id: user.id,
                      email: this.state.email_temp,
                      created_at: currDate,
                      updated_at: currDate,
                    }])

        let uid = insert_user[0].id;

        let { data:insert_member, error: error_member} = await supabase
            .from('member')
            .insert([{ 
                      name: this.state.name_temp,
                      phone: this.state.phone_temp,
                      uid: uid,
                      created_at: currDate,
                      updated_at: currDate,
                    }])
            

        let member_id = insert_member[0].id;

        let { data:insert_event_member, error: error_event_member} = await supabase
            .from('event_member')
            .insert([{ 
                      event_id: event_id,
                      member_id: member_id,
                      member_pid: this.state.parent_id,
                      can_manage:this.state.can_manage,
                      status:true,
                      event_position_name: this.state.position_name,
                    }])
            

        this.props.navigation.navigate('EventTabScreen', {event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name});

        showMessage({
            message: 'Data berhasil disimpan',
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

  async onSubmitExist() {
    this.validate({
      parent_id: {required:true},
      position_name: {required:true},
    });

    if(this.isFormValid()) {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let currDate = new Date();
      let event_id = this.props.route.params.event_id;

      let { data:insert_event_member, error: error_event_member} = await supabase
          .from('event_member')
          .insert([{ 
                    event_id: event_id,
                    member_id: this.state.member_id,
                    member_pid: this.state.parent_id,
                    can_manage:this.state.can_manage,
                    status:true,
                    event_position_name: this.state.position_name,
                  }])
            

        this.props.navigation.navigate('EventTabScreen', {event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name});

        showMessage({
            message: 'Data berhasil disimpan',
            type: 'success',
            icon: 'success',
        });
          

      store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
      });

    }
  }

  onChecked() {
     this.setState({can_manage: !this.state.can_manage});
  }
  
  render() {
    return (
      <>

        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Insert Position" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>
        <View style={{ marginVertical:10 }}>
          <PickerInput
            title="Parent"
            options={this.state.parentList}
            value={this.state.parent_id}
            label={this.state.parent}
            onChangePickerValue={value => this.setState({parent_id: value})}
            onChangePickerLabel={label => this.setState({parent: label})}
          />
          
          <TextInput
            label="Position Name"
            value={this.state.position_name}
            onChangeText={text => this.setState({position_name: text})}
            style={styleApp.TextInput}
          />
          {this.isFieldInError('position_name') && this.getErrorsInField('position_name').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

         <List.Item
            title="Can Manage"
            right={() => <Checkbox status={this.state.can_manage ? 'checked' : 'unchecked'} onPress={() => this.onChecked()} color='green' />}
            onPress={() => this.onChecked()}
          />
          <Divider style={{ backgroundColor: 'green', marginHorizontal:10 }}  />

        </View>
        </ScrollView>

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.state.type_temp == 'new' ? this.onSubmitNew() : this.onSubmitExist() }
            style={styleApp.Button}
            icon="check"
          >
            Simpan
          </Button>
        </View>

      </>
    );
  }
}

export default EventPosInsertParentScreen;