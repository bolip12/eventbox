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

class EventPosInsertScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,

        name: '',
        can_manage: false,
        seq: this.props.route.params.seq,
        
      };

  }

  componentDidMount() {
  }


  async onSubmit() {
    this.validate({
      name: {required:true},
      seq: {required:true},
    });

    if(this.isFormValid()) {
      
      let currDate = new Date();
      let event_id = this.props.route.params.event_id;

      let { data, error } = await supabase
          .from('event_position')
          .insert([{ 
                    event_id: event_id,
                    name: this.state.name,
                    seq: this.state.seq,
                    can_manage:this.state.can_manage,
                    created_at: currDate,
                    created_by: this.state.uid,
                  }])

      if(error != null) {
        showMessage({
            message: error.message,
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
            onChangeText={text => this.setState({seq: text})}
            keyboardType={"numeric"}
            style={styleApp.TextInput}
          />
          <Divider style={{ backgroundColor: 'green', marginHorizontal:10 }}  />
          {this.isFieldInError('seq') && this.getErrorsInField('seq').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

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