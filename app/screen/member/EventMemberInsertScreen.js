import React, { Component } from 'react';
import { View,ScrollView, FlatList} from 'react-native';
import { Appbar, TextInput, Button, Divider, HelperText, List, Badge, IconButton } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import supabase from '../../config/supabase';
import storeApp from '../../config/storeApp';

import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';
import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';


class EventMemberInsertScreen extends ValidationComponent {

  constructor(props) {
    super(props);

     this.state = {
        ...this.state,

        list_new_member: [],
        data: [],

        selected: false,
        
    }
  }

  componentDidMount() {

    this.getData();
  }

  async getData() {
    let list_event_member = this.props.route.params.list_event_member;

    let { data:data_member, error } = await supabase
          .from('member')
          .select('id, name')

    let data = [];
    data_member.map(member => {

      let exist = false;
      list_event_member.map(member_id => {
        if(member.id === member_id) {
          exist = true;
        }
      })

      if(!exist) {
        data.push({id:member.id, name:member.name, selected:false})
      }
    })
    this.setState({data:data});
  }

  

  addMember(id, selected) {
    let list_new_member = this.state.list_new_member;
    list_new_member.push(id);

    let data = this.state.data;
    data.map((member,key) => {
      if(member.id == id) {
        data[key].selected = data[key].selected ? false : true;
      }
    })
    
    this.setState({ list_new_member:list_new_member, data:data });
  }

  async onSave() {

    let list_new_member = this.state.list_new_member;
    let event_id = this.props.route.params.event_id;
    let position_id = this.props.route.params.position_id;

    list_new_member.map(async(row) => {

      let { data:insert_event_member, error:error_event_member} = await supabase
        .from('event_member')
        .insert([{ 
                  event_id: event_id,
                  event_position_id: position_id,
                  member_id: row,
                  status: true,
                }])

      if(error_event_member != null) {
        showMessage({
            message: error_event_member.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {

      this.props.navigation.navigate('EventMemberScreen', {event_id:this.props.route.params.event_id, position_id:this.props.route.params.position_id});

        showMessage({
            message: 'Data berhasil disimpan',
            type: 'success',
            icon: 'success',
        });
      }
    })
  }

  render() {

    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Insert Member" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <FlatList
            keyboardShouldPersistTaps="handled"
            data={this.state.data}
            keyExtractor={(item) => item.id}
            style={styleApp.FlatList}
            renderItem={({ item }) => (
              <View>
                <List.Item
                  title={item.name}
                  left={props => <Badge style={{ backgroundColor: 'green', margin:10 }} size={40}>{item.name.charAt(0)}</Badge>}
                  right={props => 
                    <IconButton 
                      icon={item.selected ? 'check-circle' : 'plus-circle-outline'}
                      color='green' 
                      size={30}
                      animated={true}  
                    />}
                  onPress={props => this.addMember(item.id, this.state.selected)}
                />
                <Divider />
              </View>
            )}
          />

         <Button
              mode="contained"
              icon="check"
              onPress={() => this.onSave()}
              style={styleApp.Button}
          >
            Simpan
          </Button>

      </>
    );
  }
}

export default EventMemberInsertScreen;