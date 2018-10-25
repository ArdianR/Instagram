import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	FlatList,
  Dimensions,
  PixelRatio
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { createStackNavigator } from 'react-navigation';
import Toast from './Toast';

class HomeTab extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
        orientation: '',
        width: 0,
        height: 0,
        numberOfLines: 1,
        readMore: true,
      }
	}

  getOrientation = () => {
    if( this.refs.rootView ) {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) {
          this.setState({ orientation: 'portrait' });
        } else {
          this.setState({ orientation: 'landscape' });
        }
    }
  }

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener( 'change', () => { this.getOrientation() })
  }

	ReadMore = () => {
    this.setState({
      readMore: false,
      numberOfLines: 0,
    })
	}

	componentWillMount() {
		return fetch('https://next.json-generator.com/api/json/get/EkfqX7muB')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					dataSource: responseJson,
				},
				function() {
				});

			})
			.catch((error) => {
					console.error(error);
			});
	}

	render() {
		return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#fafafa' }}>
          <Text style={{ paddingLeft: 5,  margin: 5, textAlign: 'left', fontSize: 12, justifyContent: 'center', color: '#202020' }}>invite Facebook Friends to Instagram</Text>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LeftTab')}>
              <Text style={{ paddingRight: 10, margin: 5, textAlign: 'right', fontSize: 12, color: '#3897f0' }}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.dataSource}
          keyExtractor={item => item.email}
          style={{ backgroundColor: '#fafafa' }}
          renderItem={({ item }) => (
            <View style={{ width: 125, height: 175, flexDirection: 'column', justifyContent:'center', margin: 3, borderRadius: 5 }}>
              <Image source={{uri: item.picture}} style={{ width: 75, height: 75, justifyContent: 'center', alignSelf: 'center', borderRadius: 50, }} />
              <Text numberOfLines={1} style={{ color: 'black', fontSize: 12, textAlign: 'center', padding: 5, paddingBottom: 15 }}>{item.name}</Text>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>{Toast.show(item.name,Toast.SHORT)}}>
                    <Text style={{ borderRadius: 2, fontSize: 12, padding: 2, marginRight: 10, marginLeft: 10, backgroundColor: '#3897f0', textAlign: 'center', color: 'white' }}>invite</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <FlatList
          ref = "rootView"
          style={{ flex: 1 }}
          data={this.state.dataSource}
          keyExtractor={item => item.name}
          style={{ flex: 1, backgroundColor: '#fafafa' }}
          renderItem={({item}) => 
            <View>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={()=>{Toast.show(item.name,Toast.SHORT)}}>
                  <Image source={{ uri: item.picture}} style={{ width: 35, height: 35, margin: 10, borderRadius: 50 }}/>
                </TouchableOpacity>
                <View style={{ flex: 4, justifyContent: 'center' }}>
                  <Text style={{ color: 'black', fontSize: 12 }}>{item.name}</Text>
                  <Text numberOfLines={1} style={{ color: 'black', fontSize: 12 }}>{item.address}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity>
                    <Ionicons name='ios-more' size={25} color='black' style={{ paddingRight: 15, textAlign: 'right' }}/>
                  </TouchableOpacity>
                </View>
              </View>
              <Image source={{uri: item.picture}} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width / 1.75, resizeMode: 'stretch' }} />
              <View style={{ margin: 15, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Ionicons name='md-heart-empty' size={25} color='black' style={{ paddingRight: 25 }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name='ios-chatboxes' size={25} color='black' style={{ paddingRight: 25 }}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name='md-send' size={25} color='black' style={{ paddingRight: 25 }}/>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity>
                    <Ionicons name='md-bookmark' size={25} color='black' style={{ paddingRight: 5, textAlign: 'right' }}/>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingBottom: 5 }}>{item.like} Likes</Text>
              <Text style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingBottom: 5 }}>{item.like} HOURS AGO</Text>
              <Text numberOfLines={this.state.numberOfLines} style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingRight: 15, paddingBottom: 5 }}>{item.about}</Text>
              {
                this.state.readMore ? 
                  <TouchableOpacity onPress={this.ReadMore}>
                      <Text style={{ fontSize: 12, color: 'black', paddingLeft: 15, paddingBottom: 5 }}>more</Text>
                  </TouchableOpacity>
                : null
              }
            </View>
          }
        />
      </ScrollView>
		);
	}
}

const HomeStack = createStackNavigator({ HomeTab }, {
  navigationOptions: ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('CameraTab')}>
          <Ionicons name='md-camera' size={25}/>
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
      <TouchableOpacity onPress={() => navigation.navigate('RightTab')}>
        <Ionicons name='md-paper-plane' size={25}/>
      </TouchableOpacity>
    ),
    headerRightContainerStyle: {
      paddingRight: 15,
    },
    headerStyle: {
      backgroundColor: 'white'
    },
  }),
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
}

const styles = StyleSheet.create({

})

export default HomeStack