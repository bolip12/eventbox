import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Appbar, List, IconButton, Divider, Badge, Button} from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import supabase from '../../config/supabase';
import storeApp from '../../config/storeApp';
import styleApp from '../../config/styleApp.js';

class EventTaskMemberScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
        ...this.state,

        list_new_task_member: [],
        data: [],

        selected: false,
    }

  }

  componentDidMount() {
    this.getData();
  }

  async getData() {

    let { data:member_task } = await supabase
          .from('member_task')
          .select('*')
          .eq('task_id', this.props.route.params.id)

    let { data:event_member } = await supabase
          .from('event_member')
          .select('*, member(name)')
          .eq('event_id', this.props.route.params.event_id)

    let data = [];
    event_member.map(event => {
      
      let selected = false;
      member_task.map(task => {
        if(event.member_id === task.member_id)
          selected = true;
      })

      data.push({ member_id:event.member_id, name:event.member.name, selected:selected})
    })

    
    this.setState({data:data});
  }

  onSelect(id, selected) {

    let list_new_task_member = this.state.list_new_task_member;
    list_new_task_member.push(id);

    let data = this.state.data;
    data.map((member,key) => {
      if(member.member_id == id) {
        data[key].selected = data[key].selected ? false : true;
      }
    })
    
    this.setState({ list_new_task_member:list_new_task_member, data:data });
  }


  async onSave() {

    let data = this.state.data;
    let event_id = this.props.route.params.event_id;
    let id = this.props.route.params.id;
    
    //delete
    let { data:delete_member_task} = await supabase
          .from('member_task')
          .delete()
          .eq('task_id', id)

    data.map(async(row) => {

      if(row.selected) {
        await supabase
          .from('member_task')
          .insert([{ 
                    member_id: row.member_id,
                    task_id: id,
                    event_id: event_id,
                  }])
      }

    })

    this.props.navigation.navigate('EventTabScreen', {event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name});

        showMessage({
            message: 'Data berhasil disimpan',
            type: 'success',
            icon: 'success',
        });
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Task Member" titleStyle={{color:'green'}} />
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
                  onPress={props => this.onSelect(item.member_id, this.state.selected)}
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

export default EventTaskMemberScreen;