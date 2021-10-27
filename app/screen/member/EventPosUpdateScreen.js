import React, { Component } from 'react';
import { View, ScrollView, FlatList, Alert} from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge, Caption, TextInput, Checkbox } from 'react-native-paper';
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

class EventPosUpdateScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,
        
      };

  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let position_id = this.props.route.params.position_id;

      //query
      let { data, error } = await supabase
          .from('event_position')
          .select('id, name, seq, can_manage')
          .eq('id', position_id)
          .single();

      this.setState({
        name:data.name,
        seq:data.seq,
        can_manage:data.can_manage,
      });
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  async onSubmit() {
    this.validate({
      name: {required:true},
    });

    if(this.isFormValid()) {
      store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
      });
      
      let currDate = new Date();
      let position_id = this.props.route.params.position_id;

      let { data, error } = await supabase
          .from('event_position')
          .update([{ 
                    name: this.state.name,
                    can_manage:this.state.can_manage,
                    updated_at: currDate,
                    updated_by: this.state.uid,
                  }])
          .eq('id', position_id);

      if(error != null) {
        showMessage({
            message: error.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {

      this.props.navigation.navigate('EventTabScreen', {event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name});

        showMessage({
            message: 'Data berhasil diubah',
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

  onDeleteConfirm() {
      Alert.alert(
        "Warning",
        "Data will be deleted?",
        [
          { text: "Cancel" },
          { text: "OK", onPress: () => this.onDelete(this.props.route.params.position_id) }
        ],
      );
  }

  async onDelete(position_id) {
    
    store.dispatch({
      type: 'LOADING',
      payload: { isLoading:true }
    });

    let response = await supabase
            .from('event_position')
            .delete()
            .eq('id', position_id);

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

    this.props.navigation.navigate('EventTabScreen', {event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name});
    
  }
  
  onChecked() {
     this.setState({can_manage: !this.state.can_manage});
  }
  
  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Update Position" titleStyle={{color:'green'}} />
          <Appbar.Action icon="trash-can-outline" color='grey' onPress={() => this.onDeleteConfirm()} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <TextInput
            label="Name"
            value={this.state.name}
            onChangeText={text => this.setState({name: text})}
            style={styleApp.TextInput}
          />
          {this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

          <TextInput
            label="Seq"
            value={thousandFormat(this.state.seq)}
            disabled
            style={styleApp.TextInput}
          />
          <Divider style={{ backgroundColor: 'green', marginHorizontal:10 }}  />

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

export default EventPosUpdateScreen;