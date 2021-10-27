import React, { Component } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';
import { Appbar, Subheading, Divider, List, IconButton } from 'react-native-paper';

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
        data: [],

      };
  }

  componentDidMount() {
    this.getData();
      this.getDataDana();
    /*this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
      this.getDataDana();
    });*/
  }

  componentWillUnmount() {
   // this._unsubscribe();
  }

  async getData() {
      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:true }
      });

      let { data, error } = await supabase
                          .rpc('get_data_member_task', {
                            member_filter:this.state.member_id
                          })

      this.setState({
        data:data,
        member_name:data[0].member_name
      })

      store.dispatch({
          type: 'LOADING',
          payload: { isLoading:false }
      });
  }

  async getDataDana() {

    let { data, error } = await supabase
                          .rpc('get_sum_budget_used', {
                            finished_by_filter:this.state.member_id
                          })

    let dana = 0;
    data.map(row => {
      dana += row.sum_budget_used;
      
    })                      

    this.setState({ dana:dana })
  }

  onLogout() {
     store.dispatch({
      type: 'LOGIN',
      payload: { tipe:''}
    });
  }

  onRight(item) {
    let statusIcon = '';
      if(item.status_name == 'Pending') {
        statusIcon = 'timer-sand';
      } else if(item.status_name == 'On Progress') {
        statusIcon = 'progress-clock';
      } else if(item.status_name == 'Completed') {
        statusIcon = 'check';
      } else {
        statusIcon = 'cancel';
      }

    return(
      <View>
        <IconButton icon={statusIcon}/>
      </View>
    )
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
          <Appbar.Content title={this.state.member_name} titleStyle={{color:'green'}} />
          <Appbar.Action icon="logout" color='green' onPress={() => this.onLogout()} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              <Subheading>Tugas Selesai</Subheading>
              <Subheading style={{ fontSize:18, fontWeight: 'bold' }}>40%</Subheading>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Subheading>Dana</Subheading>
              <Subheading style={{ fontSize:18, fontWeight: 'bold' }}>Rp. {thousandFormat(this.state.dana)}</Subheading>
            </View>
          </View>
          <Divider />

          <List.Section>
            <List.Subheader>Daftar Tugas</List.Subheader><Divider />

            <FlatList
              keyboardShouldPersistTaps="handled"
              data={this.state.data}
              keyExtractor={(item) => item.id}
              style={styleApp.FlatList}
              renderItem={({ item }) => (
                <View>
                  <List.Item
                    title={item.task_name}
                    titleStyle={{ fontSize:17 }}
                    right={props => this.onRight(item)}
                    onPress={() => this.props.navigation.navigate('HomeDetailScreen', {task_id:item.task_id, member_id:this.state.member_id})}
                  />
                  <Divider />
                </View>
              )}
            />

          </List.Section>

        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;