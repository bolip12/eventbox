import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';

import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';

class EventDetailScreen extends Component {

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
    this.getData();
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
          .select('id, name, start_date, end_date, budget_plan, budget_used')
          .eq('event_id', event_id)

      this.setState({data:data});
      
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  onRight(item) {
    return(
      <View style={{ flexDirection: 'row' }}>
        <IconButton icon="pencil" onPress={() => this.props.navigation.navigate('EventUpdateScreen')}/>
        <IconButton icon="account" onPress={() => this.props.navigation.navigate('EventUserScreen')}/>
      </View>
    )
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
          <Appbar.BackAction color='green' onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Event Coding" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <FlatList
            keyboardShouldPersistTaps="handled"
            data={this.state.data}
            keyExtractor={(item) => item.id}
            style={styleApp.FlatList}
            renderItem={({ item }) => (
              <View>
                <List.Item
                  title={item.name}
                  description={'Rp. '+thousandFormat(item.budget_plan)}
                  left={props => <Badge style={{ backgroundColor: 'green', margin: 10 }} size={40}>{item.name.charAt(0)}</Badge>}
                  right={props => this.onRight(item)}
                />
                <Divider />
              </View>
            )}
          />

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            //onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
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

export default EventDetailScreen;