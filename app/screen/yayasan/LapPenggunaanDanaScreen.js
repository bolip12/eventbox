import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text }  from 'react-native';
import { Appbar, Title, Subheading, Divider, List, DataTable, TouchableRipple } from 'react-native-paper';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryLegend, VictoryLine, VictoryTheme } from "victory-native";

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
            <VictoryChart theme={VictoryTheme.material}>

              <VictoryLine
                style={{
                  data: { stroke: "green" },
                  parent: { border: "1px solid #ccc"}
                }}
                data={[
                  { x: "Jan", y: 2 },
                  { x: "Feb", y: 3 },
                  { x: "Mar", y: 5 },
                  { x: "Apr", y: 4 },
                  { x: "Mei", y: 6 },
                  { x: "Jun", y: 7 },
                  { x: "Jul", y: 9 },
                  { x: "Ags", y: 4 },
                  { x: "Sep", y: 6 },
                  { x: "Okt", y: 8 },
                  { x: "Nov", y: 2 },
                  { x: "Des", y: 3 },
                ]}
                interpolation="natural"
              />
            </VictoryChart>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Bulan</Text>}</DataTable.Title>
              <DataTable.Title numeric>{<Text style={{fontWeight:'bold', fontSize:14, color:'green'}}>Nominal</Text>}</DataTable.Title>
              
            </DataTable.Header>

              
              <DataTable.Row>
                <DataTable.Cell>Jan</DataTable.Cell>
                <DataTable.Cell numeric>2,000,000</DataTable.Cell>
              </DataTable.Row>
              
           
              
              <DataTable.Row>
                <DataTable.Cell>Feb</DataTable.Cell>
                <DataTable.Cell numeric>3,000,000</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Mar</DataTable.Cell>
                <DataTable.Cell numeric>5,000,000</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Apr</DataTable.Cell>
                <DataTable.Cell numeric>4,000,000</DataTable.Cell>
              </DataTable.Row>

          </DataTable>

          

        </ScrollView>

      </>
    );
  }
}

export default HomeScreen;