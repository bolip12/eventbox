import React, { Component } from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import store from './app/config/storeApp';

import MemberNav from './app/navigation/MemberNav';
import LeaderNav from './app/navigation/LeaderNav';
import FrontNav from './app/navigation/FrontNav';
import YayasanNav from './app/navigation/YayasanNav';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'green',
    accent: '#f1c40f',
    text: 'green',
  },
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = store.getState();  
      store.subscribe(()=>{
        this.setState(store.getState());
      });

      this.state = {
        ...this.state,
      };
  }

  render() {
    if(this.state.tipe == 'member') {
      return (<PaperProvider theme={theme}>
                <MemberNav />
              </PaperProvider>)
    } else if(this.state.tipe == 'leader') {
      return (<PaperProvider theme={theme}>
                <LeaderNav />
              </PaperProvider>) 
    } else if(this.state.tipe == 'yayasan') {
      return (<PaperProvider theme={theme}>
                <YayasanNav />
              </PaperProvider>) 
    } else {
      return (<PaperProvider theme={theme}>
                <FrontNav />
              </PaperProvider>)
    }

  }
}

export default App;