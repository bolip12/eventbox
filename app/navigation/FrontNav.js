import React, { Component } from 'react';

//stack
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//template
import { Provider as PaperProvider } from 'react-native-paper';

//screen
import LoginScreen from '../screen/LoginScreen';

class FrontNav extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default FrontNav;