import React, { Component } from 'react';
import { View, ScrollView, FlatList, Alert } from 'react-native';
import { Appbar, List, IconButton, Divider, Button, Badge, Caption } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';

import thousandFormat from '../../comp/thousandFormat.js';
import clearThousandFormat from '../../comp/clearThousandFormat.js';

class EventPositionScreen extends Component {

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
    let seq = 1;
    //query
    let { data, error, count } = await supabase
        .from('event_position')
        .select('id, name, seq', {count:'exact'})
        .eq('event_id', event_id)
        .order('seq', { ascending: true })
    
    seq = count + 1;

    this.setState({data:data, seq:seq});
    
    store.dispatch({
        type: 'LOADING',
        payload: { isLoading:false }
    });
  }

  onRight(item) {
    return(
      <View style={{ flexDirection: 'row' }}>
        <IconButton icon="pencil" onPress={() => this.props.navigation.navigate('EventPosUpdateScreen', {position_id:item.id, event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name})}/>
        <IconButton icon="account" onPress={() => this.props.navigation.navigate('EventMemberScreen', {position_id:item.id, event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name, position_name:item.name})} />
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
                  left={props => <Badge style={{ backgroundColor: 'green', margin:8 }} size={40}>{item.name.charAt(0)}</Badge>}
                  right={props => this.onRight(item)}
                />
                <Divider />
              </View>
            )}
          />

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('EventPosInsertScreen', { event_id:this.props.route.params.event_id, event_name:this.props.route.params.event_name, seq:this.state.seq })}
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

export default EventPositionScreen;