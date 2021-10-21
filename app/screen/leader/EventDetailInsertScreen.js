import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Divider, HelperText } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import supabase from '../../config/supabase';
import storeApp from '../../config/storeApp';

import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';
import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';


class EventInsertScreen extends ValidationComponent {

  constructor(props) {
    super(props);

     this.state = {
        ...this.state,

        name: '',
        start_date:new Date(),
        end_date: new Date(),
        budget_plan: 0,
        budget_used: 0,
        note: '',

        
    }
  }

  componentDidMount() {

  }


  async onSubmit() {
    this.validate({
      name: {required:true},
      budget_plan: {required:true},
      start_date: {required:true},
      end_date: {required:true},
    });

    if(this.isFormValid()) {

      let event_id = this.props.route.params.event_id;
      let task_status_id = this.props.route.params.task_status_id;
      
      let currDate = new Date();

      let { data, error } = await supabase
          .from('task')
          .insert([{ 
                    event_id: event_id,
                    task_status_id: task_status_id,
                    name: this.state.name,
                    budget_plan: clearThousandFormat(this.state.budget_plan),
                    budget_used: clearThousandFormat(this.state.budget_used),
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    created_at: currDate,
                    updated_at: currDate,
                  }])

      if(error != null) {
        showMessage({
            message: error.message,
            type: 'danger',
            icon: 'danger',
        });

      } else {

      this.props.navigation.navigate('EventDetailScreen');

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
          <Appbar.Content title="Insert" titleStyle={{color:'green'}} />
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
            value={this.state.start_date}
            mode="date"
            minDate={minDate}
            maxDate={maxDate}
            onChangeDate={(date) => this.setState({start_date:date})}
            style={{ marginTop:-10}}
          />
          <Divider />

          <DateTimeInput
            title="End Date"
            value={this.state.end_date}
            mode="date"
            minDate={minDate}
            maxDate={maxDate}
            onChangeDate={(date) => this.setState({end_date:date})}
            style={{ marginTop:-10}}
          />
          <Divider />

        </ScrollView>

         <Button
              mode="contained"
              icon="check"
              onPress={() => this.onSubmit()}
              style={styleApp.Button}
          >
            Simpan
          </Button>

      </>
    );
  }
}

export default EventInsertScreen;