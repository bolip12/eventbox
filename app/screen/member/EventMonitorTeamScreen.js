import React, { Component } from 'react';
import { View, ScrollView, Dimensions, FlatList } from 'react-native';
import { Appbar, Subheading, Divider, List, IconButton, Title } from 'react-native-paper';

import styleApp from '../../config/styleApp.js';
import supabase from '../../config/supabase.js';
import store from '../../config/storeApp';
import thousandFormat from '../../comp/thousandFormat.js';


class EventMonitorTeamScreen extends Component {

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
    //this.getData();
    /*this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getData();
      this.getDataDana();
    });*/
  }

  componentWillUnmount() {
   // this._unsubscribe();
  }

  /*async getData() {
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
  }*/


  render() {
    return (
      <>
        
        <ScrollView style={ styleApp.ScrollView }>

          <View style={{ marginVertical: 15, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ fontSize:18, marginBottom:12 }}>TASK</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>40%</Subheading>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Subheading style={{ fontSize:18, marginBottom:12 }}>BUDGET</Subheading>
              <Subheading style={{ fontSize:20, fontWeight: 'bold' }}>70%</Subheading>
            </View>
          </View>
          <Divider />

        </ScrollView>

      </>
    );
  }
}

export default EventMonitorTeamScreen;