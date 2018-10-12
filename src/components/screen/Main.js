import React, {Component} from 'react';

import {
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import HomeTab from './HomeTab';
import SearchTab from './SearchTab';

import GalleryTab from './GalleryTab';
import CameraTab from './CameraTab';

import FollowingTab from './FollowingTab';
import YouTab from './YouTab';

import ProfileTab from './ProfileTab';

let AddStack = createMaterialTopTabNavigator(
  {
    GalleryTab,
    CameraTab,
  },
  {
    initialRouteName: 'GalleryTab',
    swipeEnabled: false,
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: 'black',
      },
      style: {
        backgroundColor: 'white',
      },
  }
})

let LikeStack = createMaterialTopTabNavigator(
  {
    FollowingTab,
    YouTab
  },
  {
    initialRouteName: 'FollowingTab',
    swipeEnabled: false,
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: 'black',
      },
      style: {
        backgroundColor: 'white',
      },
  }
})

const TabNav = createBottomTabNavigator(
  {
    HomeTab,
    SearchTab,
    AddStack,
    LikeStack,
    ProfileTab,
  },
  {
    initialRouteName: 'ProfileTab',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HomeTab')
        {
          iconName = `md-home${focused ? '' : ''}`;
        }
        if (routeName === 'SearchTab')
        {
          iconName = `md-search${focused ? '' : ''}`;
        }
        if (routeName === 'AddStack')
        {
          iconName = `md-add-circle${focused ? '' : ''}`;
        }
        if (routeName === 'LikeStack')
        {
          iconName = `md-heart-empty${focused ? '' : ''}`;
        }
        if (routeName === 'ProfileTab')
        {
          iconName = `md-person${focused ? '' : ''}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  }
)

class LeftTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>LeftTab</Text>
      </View>
    );
  }
}

let LeftStack = createStackNavigator({ LeftTab }, {
  navigationOptions: {
    header: null,
  }
})

class RightTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RightTab</Text>
      </View>
    );
  }
}

let RightStack = createStackNavigator({ RightTab }, {
  navigationOptions: {
    header: null,
  }
})


const StacksOverTabs = createStackNavigator({
  Root: {
    screen: TabNav,
    navigationOptions: {
      header: null,
    },
  },
  Left: {
    screen: LeftStack,
    navigationOptions: {
      title: 'Left',
    },
  },
  Right: {
    screen: RightStack,
    navigationOptions: {
      title: 'Right',
    },
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

export default StacksOverTabs