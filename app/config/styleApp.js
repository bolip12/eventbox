import * as React from 'react';
import { StyleSheet } from 'react-native';
//import theme from './theme';

export default StyleSheet.create({
  Appbar: {
    backgroundColor: '#ffffff',
  },
  AppbarBack: {
    marginRight: -10,
  },
  FlatList: {
    backgroundColor: '#ffffff',
  },
  TextInput: {
    marginHorizontal:10,
    backgroundColor: '#ffffff',
  },
  HelperText: {
    marginHorizontal:10,
  },
  Button: {
  	margin:10,
    borderRadius:20,
  },
  ButtonDelete: {
    marginHorizontal:10,
    borderRadius:20,
  },
  FAB: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'green'
  },
  Chip: {
    borderColor: 'green',
    margin: 5,
    height:35
  },
  ChipSelected: {
    backgroundColor: 'green',
    margin: 5,
    height:35
  },
 
  Caption: {
    fontSize: 14,
  },
  Subheading: {
    fontSize: 17, 
    textAlign: 'right',
    fontWeight: 'bold',
    marginTop: 5,
   color: 'green',
  },
  SubheadingRed: {
    fontSize: 17, 
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'red',
  },
  ScrollView: {
    backgroundColor: '#ffffff',
  }
});

