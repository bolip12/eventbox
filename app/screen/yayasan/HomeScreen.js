import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text }  from 'react-native';
import { Appbar, Title, Subheading, Divider, List, DataTable, TouchableRipple } from 'react-native-paper';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend } from "victory-native";

import styleApp from '../../config/styleApp.js';
import storeApp from '../../config/storeApp';

const data = {
  dana: [
    { x: 'Event Coding', y: 20 }, 
    { x: 'Kampanye', y: 40 },
    
  ],

  tugas: [
    { x: 'Event Coding', y: 50 },
    { x: 'Kampanye', y: 70 },
  ],
}

class HomeScreen extends Component {

  constructor(props) {
    super(props);

    //redux variable
      this.state = storeApp.getState();
      storeApp.subscribe(()=>{
        this.setState(storeApp.getState());
      });

      //default state value
      this.state = {
        ...this.state,
       
      };

  }

  onLogout() {
     storeApp.dispatch({
      type: 'LOGIN',
      payload: { tipe:''}
    });
  }

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
           <Appbar.Content title="Yayasan" titleStyle={{color:'green'}} />
           <Appbar.Action icon="logout" color='green' onPress={() => this.onLogout()} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <View>
            <VictoryChart>  
              <VictoryGroup offset={40}>
                <VictoryBar 
                  data={data.tugas} 
                  style={{
                    data: {
                      fill: 'green'
                    }
                  }} 
                />
                <VictoryBar 
                  data={data.dana}
                  style={{
                    data: {
                      fill: 'darkseagreen'
                    }
                  }} 
                />
              </VictoryGroup>
              <VictoryLegend 
                x={Dimensions.get('screen').width / 2 - 75}
                orientation="horizontal"
                gutter={25}
                data={[
                  {
                    name: 'Event',
                    symbol: {
                      fill: 'green'
                    },
                  },
                  {
                    name: 'Dana',
                    symbol: {
                      fill: 'darkseagreen'
                    },
                  },
                ]} />
            </VictoryChart>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Event</Text>}</DataTable.Title>
              <DataTable.Title numeric>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Tugas (%)</Text>}</DataTable.Title>
              <DataTable.Title numeric>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Dana (%)</Text>}</DataTable.Title>
            </DataTable.Header>

            <View>
              <TouchableRipple onPress={() => this.props.navigation.navigate('HomeDetailScreen2')}>
              <DataTable.Row>
                <DataTable.Cell>Event Coding</DataTable.Cell>
                <DataTable.Cell numeric>50%</DataTable.Cell>
                <DataTable.Cell numeric>20%</DataTable.Cell>
              </DataTable.Row>
              </TouchableRipple>
            </View>

            <View>
              <TouchableRipple onPress={() => this.props.navigation.navigate('HomeDetailScreen2')}>
              <DataTable.Row>
                <DataTable.Cell>Kampanye</DataTable.Cell>
                <DataTable.Cell numeric>70%</DataTable.Cell>
                <DataTable.Cell numeric>40%</DataTable.Cell>
              </DataTable.Row>
              </TouchableRipple>
            </View>
          </DataTable>

          {/*<List.Item
            title="Event Coding"
            titleStyle={{ fontWeight: 'bold' }}
            description='Rp. 1,000,000 (70%)'
            right={props => <Subheading style={styleApp.Subheading}>40%</Subheading>}
            onPress={() => this.props.navigation.navigate('HomeDetailScreen')}
          />
          <Divider />

          <List.Item
            title="Kampanye"
            titleStyle={{ fontWeight: 'bold' }}
            description='Rp. 1,500,000 (40%)'
            right={props => <Subheading style={styleApp.Subheading}>50%</Subheading>}
          />
          <Divider />*/}

        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;