import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text }  from 'react-native';
import { Appbar, Title, Subheading, Divider, List, DataTable, TouchableRipple } from 'react-native-paper';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryPie } from "victory-native";

import styleApp from '../../config/styleApp.js';
import storeApp from '../../config/storeApp';


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

  render() {
    return (
      <>
        <Appbar.Header style={styleApp.Appbar}>
           <Appbar.Content title="Detail" titleStyle={{color:'green'}} />
        </Appbar.Header>

        <ScrollView style={ styleApp.ScrollView }>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <VictoryPie
                colorScale={["red", "green" ]}
                data={[
                  { x: 1, y: 2 },
                  { x: 3, y: 4 },
                ]}
                padding={{ top: 100, bottom: 180, right: 200 }}
              />
              
            </View>
            <View style={{ flex: 1 }}>
              <VictoryPie
                colorScale={["red", "green" ]}
                data={[
                  { x: 6, y: 7 },
                  { x: 4, y: 5 },
                ]}
                padding={{ top: 100, bottom: 180, right: 200 }}
              />
              
            </View>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Nama</Text>}</DataTable.Title>
              <DataTable.Title numeric>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Tugas (%)</Text>}</DataTable.Title>
              <DataTable.Title numeric>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Dana (%)</Text>}</DataTable.Title>
            </DataTable.Header>

            <View>
            
              <DataTable.Row>
                <DataTable.Cell>John Wick</DataTable.Cell>
                <DataTable.Cell numeric>50%</DataTable.Cell>
                <DataTable.Cell numeric>20%</DataTable.Cell>
              </DataTable.Row>
              
            </View>

            <View>
              <DataTable.Row>
                <DataTable.Cell>James</DataTable.Cell>
                <DataTable.Cell numeric>70%</DataTable.Cell>
                <DataTable.Cell numeric>40%</DataTable.Cell>
              </DataTable.Row>
              
            </View>
          </DataTable>


        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;