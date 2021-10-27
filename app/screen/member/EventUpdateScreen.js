import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Divider} from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import supabase from '../../config/supabase';
import store from '../../config/storeApp';

import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';
import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';

class EventUpdateScreen extends ValidationComponent {

  constructor(props) {
    super(props);

    //redux variable
      this.state = store.getState();
      store.subscribe(()=>{
        this.setState(store.getState());
      });

      this.state = {
        ...this.state,

        start_date: new Date(),
        end_date: new Date(),

    }

    this.event_id = this.props.route.params.event_id;
  }

  componentDidMount() {
     this.getData();
  }

  async getData() {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      //query
      let { data, error } = await supabase
          .from('event')
          .select('id, name, start_date, end_date, budget, description')
          .eq('id', this.event_id)
          .single();

      this.setState({
        name:data.name,
        start_date:data.start_date,
        end_date:data.end_date,
        budget:data.budget,
        description:data.description,
      });
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
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

      let { data:update_event, error:error_event } = await supabase
          .from('event')
          .update([{ 
                    name: this.state.name,
                    budget: clearThousandFormat(this.state.budget),
                    start_date: this.state.start_date,
                    end_date: this.state.end_date,
                    description: this.state.description,
                    updated_at: currDate,
                    updated_by: this.state.uid,
                  }])
          .eq('id', this.event_id);

      if(error_event != null) {
        showMessage({
            message: error_event.message,
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
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Ubah Event" titleStyle={{color:'green'}} />
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

export default EventUpdateScreen;