import React, { Component } from 'react';
import { View, ScrollView, FlatList, Alert } from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge, Caption } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';

import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';

class EventMemberScreen extends Component {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,
        data: [],
      };

  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
    })
    
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getData() {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let event_id = this.props.route.params.event_id;

      //query
      let { data, error } = await supabase
          .from('event_member')
          .select('id, member_id, member(name)')
          .eq('event_id', event_id)
      
      let list_event_member = [];
      data.map(row => {
        list_event_member.push(row.member_id);
      })
      
      this.setState({data:data, list_event_member:list_event_member});
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  onDeleteConfirm(id) {
      Alert.alert(
        "Warning",
        "Data will be deleted?",
        [
          { text: "Cancel" },
          { text: "OK", onPress: () => this.onDelete(id) }
        ],
      );
  }

  async onDelete(id) {
    
    store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
        });

    let response = await supabase
            .from('event_member')
            .delete()
            .eq('id', id);

    //notif
    if(response.error) {
          showMessage({
          message: response.error.message,
          icon: 'warning',
          backgroundColor: 'red',
          color: 'white',
        });

    } else {
      showMessage({
          message: 'Data berhasil dihapus',
          icon: 'success',
          backgroundColor: 'green',
          color: 'white',
        }); 
    }

    store.dispatch({
            type: 'LOADING',
            payload: { isLoading:false }
        });
    
    this.getData();
  }


  render() {
    return (
      <>

        <FlatList
            keyboardShouldPersistTaps="handled"
            data={this.state.data}
            keyExtractor={(item) => item.id}
            style={styleApp.FlatList}
            renderItem={({ item }) => (
              <View>
                <List.Item
                  title={item.member.name}
                  left={props => <Badge style={{ backgroundColor: 'green', margin:8 }} size={40}>{item.member.name.charAt(0)}</Badge>}
                  right={props => <IconButton icon="trash-can-outline" color='grey' style={{ marginTop:10 }} onPress={() => this.onDeleteConfirm(item.id)} />}
                />
                <Divider />
              </View>
            )}
          />

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('EventMemberInsertScreen', {list_event_member:this.state.list_event_member, event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name})}
            style={styleApp.Button}
            icon="plus"
          >
            Tambah
          </Button>
        </View>

      </>
    );
  }
}

export default EventMemberScreen;