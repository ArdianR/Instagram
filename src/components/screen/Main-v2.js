import React from 'react';
import { Text, View, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import { TabNavigator } from 'react-navigation';

import HomeTab from './HomeTab';
import SearchTab from './SearchTab';
import AddMediaTab from './AddMediaTab';
import LikesTab from './LikesTab';
import ProfileTab from './ProfileTab';

class Main extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <AppTabNavigator/>
    );
  }
}

export default Main

const AppTabNavigator = TabNavigator({
    Home: HomeTab,
    search: SearchTab,
    AddMedia: AddMediaTab,
    Likes: LikesTab,
    Profile: ProfileTab,
  },
  {
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
        style: { backgroundColor: 'white' },
        showLabel: false,
        showIcon: true,
    }
  }
)