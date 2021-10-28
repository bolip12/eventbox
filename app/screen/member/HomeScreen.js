import React, { Component } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';
import { Appbar, Subheading, Divider, List, IconButton, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';
import thousandFormat from '../../comp/thousandFormat.js';


class HomeScreen extends Component {

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
        data:[],

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
        .from('event_member')
        .select('*, event:event_id(name, description, cover)')
        .eq('member_id', this.state.member_id)

      this.setState({
        data:data
      })

      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }


  onLogout() {
     store.dispatch({
      type: 'LOGIN',
      payload: { isLogin:false}
    });
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
          <Appbar.Content title='Home' titleStyle={{color:'green'}} />
          <Appbar.Action icon="logout" color='green' onPress={() => this.onLogout()} />
        </Appbar.Header>

          <FlatList
            keyboardShouldPersistTaps="handled"
            data={this.state.data}
            keyExtractor={(item) => item.id}
            style={styleApp.FlatList}
            renderItem={({ item }) => (
              <View>
                <Card style={{ margin:10 }} onPress={() =>  this.props.navigation.navigate('EventMonitorScreen', { event_id:item.event_id, event_name:item.event.name, can_manage:item.can_manage })}>
                  { item.event.cover != null &&
                  <Card.Cover 
                    source={{ uri: item.event.cover }} 
                    style={{ resizeMode: "cover", height: 140, width: 'auto' }} 
                  />
                  }
                  <Card.Content>
                    <Title>{item.event.name}</Title>
                    <Paragraph>{item.event.description}</Paragraph>
                  </Card.Content>

                  <Card.Actions style={{ marginTop:5, marginLeft:'auto' }}>

                    { item.can_manage == true &&
                      <Button 
                        mode="outlined" 
                        onPress={() => this.props.navigation.navigate('EventTab', { screen: 'EventTabScreen', params: { event_id: item.event_id, event_name: item.event.name }})} 
                        style={{ borderColor:'green', borderRadius:5 }}
                        icon='account-cog'
                      >
                        Manage
                      </Button>
                    }
                  </Card.Actions>

                </Card>
              </View>
            )}
          />

        <View style={{ backgroundColor: '#ffffff' }}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.navigate('EventTab', { screen: 'EventInsertScreen' })}
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

export default HomeScreen;