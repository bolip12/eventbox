import React, { Component } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';
import { Appbar, Subheading, Divider, List, IconButton, Button, Chip, Caption } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';
import thousandFormat from '../../comp/thousandFormat.js';


class EventMonitorMeScreen extends Component {

  constructor(props) {
    super(props);

     //redux variable
      this.state = store.getState();
      store.subscribe(()=>{
        this.setState(store.getState());
      });

      //default state value
      this.state = {
        ...this.state,
        data: [],
        
        statusList: [''],
        status: false,

      };
  }


  componentDidUpdate(prevProps, prevState) {

    if(prevState.status !== this.state.status) {
      this.getData();
    }

  }

  componentDidMount() {
    this.getDataTask();
    this.statusList();
    this.getData();
    /*this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
      this.getDataDana();
    });*/
  }

  componentWillUnmount() {
   // this._unsubscribe();
  }

  statusList() {
    let statusList = [{id:false, nama:'Pending'}, {id:true, nama:'Done'}]
    this.setState({statusList:statusList});
  }

  async getDataTask() {
    let { data:data_task, error:error_task } = await supabase
        .from('member_task')
        .select('*, task(id, budget_plan, budget_used, is_finish)')
        .eq('member_id', this.state.member_id)
    
    let total_task = 0;
    let total_task_completed = 0;
    let total_budget_plan = 0;
    let total_budget_used = 0;
    let persentase_task_completed = 0;
    let persentase_budget_used = 0;
    data_task.map(row => {
      total_budget_plan += row.task.budget_plan;
      total_budget_used += row.task.budget_used;

      if(row.task.id) {
        total_task += 1;
      }

      if(row.task.is_finish) {
        total_task_completed += 1;
      }

      persentase_task_completed = (total_task_completed/total_task)*100;
      persentase_budget_used = (total_budget_used/total_budget_plan)*100;

    })

    this.setState({ persentase_task_completed:persentase_task_completed, persentase_budget_used:persentase_budget_used })


  }

  async getDataTask2() {
    store.dispatch({
      type: 'LOADING',
      payload: { isLoading:true }
    });

    let { count:count_all_task} = await supabase
        .from('task')
        .select('id', {count:'exact'})

    let { count:count_finish_task } = await supabase
        .from('task')
        .select('id', {count:'exact'})
        .is('is_finish', true)

    let percentase_finish_task = (count_finish_task/count_all_task)*100;

    this.setState({ percentase_finish_task:percentase_finish_task });

    store.dispatch({
      type: 'LOADING',
      payload: { isLoading:false }
    });
  }

  async getData() {
    store.dispatch({
      type: 'LOADING',
      payload: { isLoading:true }
    });

    let { data, error } = await supabase
        .from('member_task')
        .select('id, task:task_id(name, budget_plan, budget_used, is_finish)')
        .eq('member_id', this.state.member_id)
        .is('task.is_finish', this.state.status)
    
    this.setState({ data:data });

    store.dispatch({
      type: 'LOADING',
      payload: { isLoading:false }
    });
  }

  onRight(item) {
    return(
      <View>
        { item.task.is_finish ?
          <IconButton icon="check"/>
          :
          <IconButton icon="timer-sand"/>
        }
      </View>
    )
  }

  onDesc(item) {
    let budget = 0;
    if(item.task !== null) {
      budget = item.task.budget_plan - item.task.budget_used;
    }

    return(
      <View>
        <Caption>Budget : { budget == 0 ? '0' : thousandFormat(budget)}</Caption>
      </View>
    )
  }

  render() {
    return (
      <>
        <View style={{flexDirection:'row', backgroundColor: '#ffffff'}}>
          <Button mode="text" style={{ marginVertical:10 }}>
              Status
          </Button>
          <FlatList
            horizontal={true}
            data={this.state.statusList}
            keyExtractor={(item) => item.id}
            style={{backgroundColor:'#ffffff', maxHeight:55, padding:5}}
            renderItem={({item}) => (
                <Chip mode="outlined" style={item.id == this.state.status ? styleApp.ChipSelected : styleApp.Chip} textStyle={item.id == this.state.status ? styleApp.ChipTextSelected : ''} onPress={() => this.setState({status:item.id})}>{item.nama}</Chip>
            )}
          />
        </View>
        
        <View style={{ backgroundColor: 'white' }}>

          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              
              <Subheading style={{ marginBottom:8, fontSize:20, fontWeight: 'bold' }}>{parseFloat(this.state.persentase_task_completed).toFixed(0)+'%'}</Subheading>
              <Subheading>Task Completed</Subheading>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ marginBottom:8, fontSize:20, fontWeight: 'bold' }}>{parseFloat(this.state.persentase_budget_used).toFixed(0)+'%'}</Subheading>
              <Subheading>Budget Used</Subheading>
            </View>
          </View>
          <Divider />

        </View>

        <FlatList
          keyboardShouldPersistTaps="handled"
          data={this.state.data}
          keyExtractor={(item) => item.id}
          style={styleApp.FlatList}
          renderItem={({ item }) => (

            item.task !== null &&
            <View>
              <List.Item
                title={item.task.name}
                description={() => this.onDesc(item)}
                right={props => this.onRight(item)}
              />
              <Divider />
            </View>
            
          )}
        />


      </>
    );
  }
}

export default EventMonitorMeScreen;