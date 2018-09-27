import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import firebase from 'react-native-firebase';

import HomeTab from './HomeTab';
import SearchTab from './SearchTab';
import AddMediaTab from './AddMediaTab';
import FollowingTab from './FollowingTab';
import YouTab from './YouTab';
import ProfileTab from './ProfileTab';

class A extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>A</Text>
      </View>
    )
  }
}

class B extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>B</Text>
      </View>
    )
  }
}

class C extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>C</Text>
      </View>
    )
  }
}

class D extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>D</Text>
      </View>
    )
  }
}

class E extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>E</Text>
      </View>
    )
  }
}

const HomeStack = createStackNavigator({ HomeTab }, {
  navigationOptions: {
    headerLeft: (
      <TouchableOpacity>
        <Icon name='md-camera' size={25}/>
      </TouchableOpacity>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 15,
    },

    headerTitle: (
      <Image style={{ resizeMode: 'center', height: 40 }} source={require('../assets/home/logo_instagram.png')}/>
    ),
    headerTitleContainerStyle: {
      justifyContent: 'center',
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      color: 'black'
    },

    headerRight: (
      <TouchableOpacity>
        <Icon name='md-paper-plane' size={25}/>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {
      paddingRight: 15,
    },

    headerStyle: {
      backgroundColor: 'white'
    },
  }
})

let SearchStack = createStackNavigator({ SearchTab }, {
  navigationOptions: {

    headerTitle: (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{ margin: 5, width: '96%' ,borderRadius: 3, backgroundColor: '#f2f3f4' }}
          underlineColorAndroid='transparent'
          placeholder="Search"
          returnKeyType="search"
          placeholderStyle={{}}
        />
      </View>
    ),
    headerTitleContainerStyle: {
      justifyContent: 'center',
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      color: 'black'
    },
    headerStyle: {
      backgroundColor: 'white'
    },
  }
})

let AddStack = createStackNavigator({ C })

let FollowingStack = createStackNavigator({ FollowingTab })

let YouStack = createStackNavigator({ YouTab })

let LikeStack = createMaterialTopTabNavigator(
  {
    FollowingStack,
    YouStack
  },
  {
    initialRouteName: 'FollowingStack',
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

let PeopleStack = createStackNavigator({ ProfileTab }, {
  navigationOptions: {
    headerLeft: (
      <TouchableOpacity>
        <Icon name='md-camera' size={25}/>
      </TouchableOpacity>
    ),
    headerLeftContainerStyle: {
      paddingLeft: 15,
    },

    headerTitle: (
      ''
    ),
    headerTitleContainerStyle: {
      justifyContent: 'center',
    },
    headerTitleStyle: {
      fontWeight: 'normal',
      color: 'black'
    },

    headerRight: (
      <TouchableOpacity>
        <Icon name='ios-more' size={25} color='black'/>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {
      paddingRight: 15,
    },

    headerStyle: {
      backgroundColor: 'white'
    },
  }
})


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
}

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
}

AddStack.navigationOptions = {
  tabBarLabel: 'Add',
}

LikeStack.navigationOptions = {
  tabBarLabel: 'Like',
}

PeopleStack.navigationOptions = {
  tabBarLabel: 'People',
}

FollowingStack.navigationOptions = {
  tabBarLabel: 'Following',
}

YouStack.navigationOptions = {
  tabBarLabel: 'You',
}

export default createBottomTabNavigator(
  {
    HomeStack,
    SearchStack,
    AddStack,
    LikeStack,
    PeopleStack
  },
  {
    initialRouteName: 'PeopleStack',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'HomeStack')
        {
          iconName = `md-home${focused ? '' : ''}`;
        }
        if (routeName === 'SearchStack')
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
        if (routeName === 'PeopleStack')
        {
          iconName = `md-person${focused ? '' : ''}`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  }
)
