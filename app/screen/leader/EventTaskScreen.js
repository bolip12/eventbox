import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge, Caption } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';

import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';

class EventTaskScreen extends Component {

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
          .from('task')
          .select('id, task_status_id, name, start_date, end_date, budget_plan, budget_used')
          .eq('event_id', event_id)

      this.setState({data:data, task_status_id:data[0].task_status_id});
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  onRight(item) {
    return(
      <View style={{ flexDirection: 'row' }}>
        <IconButton icon="pencil" onPress={() => this.props.navigation.navigate('EventTaskUpdateScreen', {id:item.id, event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name})}/>
        <IconButton icon="account" onPress={() => this.props.navigation.navigate('EventTaskMemberScreen' , {id:item.id, event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name})}/>
      </View>
    )
  }

  onDesc(item) {
    return(
      <View>
        <Caption>Plan : Rp. {thousandFormat(item.budget_plan)}</Caption>
        { item.budget_used == 0 ?
          <Caption>Used : - </Caption>
          :
          <Caption>Used : Rp. {thousandFormat(item.budget_used)}</Caption>
        }
     </View>
    )
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
                  title={item.name}
                  description={props => this.onDesc(item)}
                  left={props => <Badge style={{ backgroundColor: 'green', margin:5, marginBottom:25 }} size={40}>{item.name.charAt(0)}</Badge>}
                  right={props => this.onRight(item)}
                />
                <Divider />
              </View>
            )}
          />

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('EventTaskInsertScreen', {event_id:this.props.route.params.event_id, task_status_id:this.state.task_status_id, event_name:this.props.route.params.event_name})}
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

export default EventTaskScreen;