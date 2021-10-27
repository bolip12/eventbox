import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Divider, HelperText } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import supabase from '../../config/supabase';
import store from '../../config/storeApp';

import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';
import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';


class EventInsertScreen extends ValidationComponent {

  constructor(props) {
    super(props);

     //redux variable
      this.state = store.getState();
      store.subscribe(()=>{
        this.setState(store.getState());
      });

     this.state = {
        ...this.state,

        name: '',
        start_date:new Date(),
        end_date: new Date(),
        budget: '',
        description: '',
        
    }
  }

  componentDidMount() {
    
  }

  async onSubmit() {
    this.validate({
      name: {required:true},
      budget: {required:true},
      start_date: {required:true},
      end_date: {required:true},
    });

    if(this.isFormValid()) {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let currDate = new Date();

      let { data, error } = await supabase
          .from('event')
          .insert([{ 
                    name: this.state.name,
                    budget: clearThousandFormat(this.state.budget),
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    description:this.state.description,
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

      this.props.navigation.navigate('EventScreen');

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

  render() {
    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    let minDate = new Date();

    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.navigate('EventScreen')} />
          <Appbar.Content title="Insert Event" titleStyle={{color:'green'}} />
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
            label="Budget"
            value={thousandFormat(this.state.budget)}
            onChangeText={text => this.setState({budget: text})}
            keyboardType={"numeric"}
            style={styleApp.TextInput}
          />
          {this.isFieldInError('budget') && this.getErrorsInField('budget').map(errorMessage => <HelperText type="error">{errorMessage}</HelperText>) }

          <TextInput
            label="Description"
            value={this.state.description}
            onChangeText={text => this.setState({description: text})}
            multiline={true}
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