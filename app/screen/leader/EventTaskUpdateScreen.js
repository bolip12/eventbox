import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge, Caption, TextInput } from 'react-native-paper';
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

class EventTaskUpdateScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    this.state = store.getState();
        store.subscribe(()=>{
          this.setState(store.getState());
        });

      this.state = {
        ...this.state,

        start_date: new Date,
        end_date: new Date,
        
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

      let id = this.props.route.params.id;

      //query
      let { data, error } = await supabase
          .from('task')
          .select('id, name, start_date, end_date, budget_plan, budget_used')
          .eq('id', id)
          .single();

      this.setState({
        name:data.name,
        start_date:data.start_date,
        end_date:data.end_date,
        budget_plan:data.budget_plan,
        budget_used:data.budget_used,
      });
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  async onSubmit() {
    this.validate({
      name: {required:true},
      budget_plan: {required:true},
      start_date: {required:true},
      end_date: {required:true},
    });

    if(this.isFormValid()) {
      
      let currDate = new Date();
      let id = this.props.route.params.id;

      let { data:update_task, error:error_task } = await supabase
          .from('task')
          .update([{ 
                    name: this.state.name,
                    budget_plan: clearThousandFormat(this.state.budget_plan),
                    budget_used: clearThousandFormat(this.state.budget_used),
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    updated_at: currDate,
                  }])
          .eq('id', id);

      if(error_task != null) {
        showMessage({
            message: error_task.message,
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
 
  render() {
    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    let minDate = new Date();

    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Update Task" titleStyle={{color:'green'}} />
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
            label="Budget Plan"
            value={thousandFormat(this.state.budget_plan)}
            onChangeText={text => this.setState({budget_plan: text})}
            keyboardType={"numeric"}
            style={styleApp.TextInput}
          />
          {this.isFieldInError('budget_plan') && this.getErrorsInField('budget_plan').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

          <TextInput
            label="Budget Used"
            value={thousandFormat(this.state.budget_used)}
            onChangeText={text => this.setState({budget_used: text})}
            keyboardType={"numeric"}
            style={styleApp.TextInput}
          />

          <DateTimeInput
            title="Start Date"
            value={new Date(this.state.start_date)}
            mode="date"
            minDate={minDate}
            maxDate={maxDate}
            onChangeDate={(date) => this.setState({start_date:date})}
            style={{ marginTop:-10}}
          />
          <Divider />

          <DateTimeInput
            title="End Date"
            value={new Date(this.state.end_date)}
            mode="date"
            minDate={minDate}
            maxDate={maxDate}
            onChangeDate={(date) => this.setState({end_date:date})}
            style={{ marginTop:-10}}
          />
          <Divider />

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

export default EventTaskUpdateScreen;