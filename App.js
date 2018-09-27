import React from 'react';
import { StyleSheet, Platform, Image, Text, View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import Loading from './src/components/screen/Loading'
import SignUp from './src/components/screen/SignUp'
import Login from './src/components/screen/Login'
import Main from './src/components/screen/Main'

const App = createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App