import React, { Component } from 'react';
import { View, ScrollView} from 'react-native';
import { Appbar, Divider, TextInput, Button } from 'react-native-paper';
import ValidationComponent from 'react-native-form-validator';
import { showMessage } from "react-native-flash-message";

import supabase from '../../config/supabase.js';
import styleApp from '../../config/styleApp.js';
import DateTimeInput from '../../comp/dateTimeInput.js';
import store from '../../config/storeApp';
import PickerInput from '../../comp/pickerInput.js';

import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';

class HomeDetailScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
        ...this.state,

        waktu:new Date(),
        dana: '',

        statusList: [],

        statusId: '',
        status: '',
    }
  }

  componentDidMount() {
    this.getData();
    this.fetchDataStatus();
   /* this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
      this.fetchDataStatus();
    });*/
  }

  componentWillUnmount() {
    //this._unsubscribe();
  }

  async getData() {
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });

    let task_id = this.props.route.params.task_id;

    let { data, error } = await supabase
        .from('task')
        .select('id, name, budget_used, task_status(name)')
        .eq('id', task_id)
        .single()

    this.setState({
      name:data.name,
      statusId: data.task_status_id,
      status: data.task_status.name,
      dana:data.budget_used
    });

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
  }  

  async fetchDataStatus() {
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:true }
    });
    
    let { data, error } = await supabase
          .from('task_status')
          .select('id, name')

    let statusList = [];
    data.map(doc => {
      statusList.push({
        value: doc.id,
        label: doc.name,
      });
    });

    //result
    this.setState({statusList:statusList});

    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
  }

  async onSubmit() {
    let currDate = new Date();
    let task_id = this.props.route.params.task_id;
    let member_id = this.props.route.params.member_id;

    let { data:update_task, error } = await supabase
        .from('task')
        .update([{ 
                  budget_used: clearThousandFormat(this.state.dana),
                  finished_at: this.state.waktu,
                  finished_by: member_id,
                  task_status_id: this.state.statusId,
                  updated_at: currDate,
                  updated_by: member_id,
                }])
        .eq('id', task_id);

    if(error != null) {
      showMessage({
          message: error.message,
          type: 'danger',
          icon: 'danger',
      });

    } else {

    this.props.navigation.navigate('HomeScreen');

      showMessage({
          message: 'Data berhasil disimpan',
          type: 'success',
          icon: 'success',
      });
    }

  }


  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title={this.state.name} titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <DateTimeInput
            title="Tanggal"
            value={this.state.waktu}
            mode="date"
            onChangeDate={(date) => this.setState({waktu:date})}
            style={{ marginTop:-10}}
          />
          <Divider />

          <TextInput
            label="Dana"
            value={thousandFormat(this.state.dana)}
            onChangeText={text => this.setState({dana: text})}
            style={styleApp.TextInput}
          />

          <PickerInput
              title="Status"
              options={this.state.statusList}
              value={this.state.statusId}
              label={this.state.status}
              onChangePickerValue={value => this.setState({statusId: value})}
              onChangePickerLabel={label => this.setState({status: label})}
          />


        </ScrollView>

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.onSubmit()}
            style={styleApp.Button}
            icon="check"
          >
            Simpan
          </Button>
        </View>

      </>
    );
  }
}

export default HomeDetailScreen;