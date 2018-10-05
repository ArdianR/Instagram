import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import HomeTab from './HomeTab';
import SearchTab from './SearchTab';
import ProfileTab from './ProfileTab';

import FollowingTab from './FollowingTab';
import YouTab from './YouTab';

import GalleryTab from './GalleryTab';
import CameraTab from './CameraTab';

import CameraRoll from './CameraRoll';

import Toast from './Toast';

const HomeStack = createStackNavigator({ HomeTab }, {
  navigationOptions: {
    headerLeft: (
      <TouchableOpacity
        onPress={()=>{Toast.show('Playing',Toast.SHORT)}}
      >
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
    header: null,
  }
})

// let SearchStack = createStackNavigator({ SearchTab }, {
//   navigationOptions: {

//     headerTitle: (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <TextInput
//           style={{ margin: 5, width: '96%' ,borderRadius: 3, backgroundColor: '#f2f3f4' }}
//           underlineColorAndroid='transparent'
//           placeholder="Search"
//           returnKeyType="search"
//           placeholderStyle={{}}
//         />
//       </View>
//     ),
//     headerTitleContainerStyle: {
//       justifyContent: 'center',
//     },
//     headerTitleStyle: {
//       fontWeight: 'normal',
//       color: 'black'
//     },
//     headerStyle: {
//       backgroundColor: 'white'
//     },
//   }
// })

let GalleryStack = createStackNavigator({ GalleryTab })

let CameraStack = createStackNavigator({ CameraTab })

let CameraRollStack = createStackNavigator({ CameraRoll })

let AddStack = createMaterialTopTabNavigator(
  {
    GalleryStack,
    CameraStack,
    CameraRollStack
  },
  {
    initialRouteName: 'GalleryStack',
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
      ''
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

GalleryStack.navigationOptions = {
  tabBarLabel: 'Gallery',
}

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
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
    initialRouteName: 'HomeStack',
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
