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
  Platform
} from 'react-native';

export default class GalleryTab extends React.Component {
  
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
        } else {
          this.setState({ orientation: 'landscape' });
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
    })
    .catch((err) => {
      //Error Loading Images
    });
  }

  render() {
    return (
      <View ref = "rootView" style = {styles.container}>
        <ScrollView>
          {this.state.photos.map((p, i) => {
          return (
            <Image
              key={i}
              style={{
                width: Dimensions.get('window').width,
                height: p.node.image.height,
              }}
              source={{ uri: p.node.image.uri }}
            />
          );
          })}
        </ScrollView>
      </View>
    );
  }
}


styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
