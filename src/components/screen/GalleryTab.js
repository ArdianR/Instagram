import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

class GalleryTab extends React.Component {
  
  static navigationOptions = {
    header: null,
  }

  constructor() {
    super();
    this.state = {
      orientation: '',
      photos: [],
    }
  }

  getOrientation = () => {
    if( this.refs.rootView ) {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) {
          this.setState({ orientation: 'portrait' });
          this.setState({ Columns: 3 });
          this.setState({ height: Dimensions.get('window').width / 3 });
          this.setState({ width: Dimensions.get('window').width / 3 });
        } else {
          this.setState({ orientation: 'landscape' });
          this.setState({ Columns: 3 });
          this.setState({ height: Dimensions.get('window').width / 3 });
          this.setState({ width: Dimensions.get('window').width / 3 });
        }
    }
  }

  componentDidMount() {
    this.getOrientation();
    Dimensions.addEventListener( 'change', () => { this.getOrientation(); });
  }

  componentWillMount() {
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'All',
    })
    .then(r => {
      this.setState({ photos: r.edges });
      console.warn(r.edges)
    })
    .catch((err) => {
    })
  }

  render() {
    return (
      <View ref = "rootView" style = {styles.container}>
        <ScrollView>
          {this.state.photos.map((p, i) => {
          return (
            <Image key={i} style={{ flexDirection: 'row', width: Dimensions.get('window').width / 3, height: Dimensions.get('window').width / 3, flexWrap: 'wrap' }}
              source={{ uri: p.node.image.uri }}/>
          );
          })}
        </ScrollView>
        <FlatList
          ref="rootView"
          style={{ flex: 1 }}
          data={this.state.photos}
          renderItem={ ({item}) =>
            <View style={{ flexWrap: 'wrap' }}>
              <TouchableOpacity onPress={() => { Alert.alert(item.guid) }}>
                <Image style={{ width: Dimensions.get('window').width / 3, height: Dimensions.get('window').width / 3, margin: 0 }} source={{ uri: item.node.image.url }} onPress={()=>alert(item.picture)}/>
              </TouchableOpacity>
            </View>
          }
          numColumns={this.state.Columns}
          key={this.state.Columns}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

let AddStack = createMaterialTopTabNavigator(
  {
    GalleryTab,
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


styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


export default AddStack