import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Appbar, List, Divider, Button, Badge, IconButton } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';

class EventScreen extends Component {

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
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async getData() {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let { data, error } = await supabase
          .from('event')
          .select('id, name, budget, start_date, end_date')

      this.setState({data:data});

      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  render() {
    return (
      <>
        <Appbar.Header style={{backgroundColor:'white'}}>
           <Appbar.Content title="Event" titleStyle={{color:'green'}} />
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
                  left={props => <Badge style={{ backgroundColor: 'green', margin: 10 }} size={40}>{item.name.charAt(0)}</Badge>}
                  right={props => <IconButton icon="pencil"/>}
                  onPress={() => this.props.navigation.navigate('EventTabScreen', {event_id:item.id, event_name:item.name})}
                />
                <Divider />
              </View>
            )}
          />

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('EventInsertScreen')}
            style={styleApp.Button}
            icon='plus'
          >
            Tambah Event
          </Button>
        </View>

      </>
    );
  }
}

export default EventScreen;