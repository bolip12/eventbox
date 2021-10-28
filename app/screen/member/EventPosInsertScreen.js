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

class EventPosInsertScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,

        memberList: [],
        member_id: '',
        member: '',
        
        parentList: [],
        parent_id: '',
        parent: '',

        position_name:'',
        can_manage: false,

        selected: false,
      }


  }

  componentDidMount() {
    console.log(this.props.route.params.list_event_member)
    this.getDataParent();
    this.getDataMember();

  }

  async getDataMember() {
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

   /* data.map(doc => {
      memberList.push({
        value: doc.id,
        label: doc.name,
      });
    });*/

    //result
    this.setState({memberList:memberList});

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
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


  async onSubmit() {
    this.validate({
      position_name: {required:true},
    });

    if(this.isFormValid()) {
      
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
          console.log(error_event_member)


      if(error_event_member != null) {
        showMessage({
            message: error_event_member.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {

      this.props.navigation.navigate('EventTabScreen', {event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name});

        showMessage({
            message: 'Data berhasil disimpan',
            type: 'success',
            icon: 'success',
        });
      }

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

          <PickerInput
            title="Parent"
            options={this.state.parentList}
            value={this.state.parent_id}
            label={this.state.parent}
            onChangePickerValue={value => this.setState({parent_id: value})}
            onChangePickerLabel={label => this.setState({parent: label})}
          />

          <PickerInput
              title="Member"
              options={this.state.memberList}
              value={this.state.member_id}
              label={this.state.member}
              onChangePickerValue={value => this.setState({member_id: value})}
              onChangePickerLabel={label => this.setState({member: label})}
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

export default EventPosInsertScreen;