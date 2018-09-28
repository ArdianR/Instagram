import React, { Component } from 'react';
import { CameraRoll, Image, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class GalleryTab extends Component {
  
  static navigationOptions = {
    header: null,
  }

  state = { photos: null };

  render() {
    let { photos } = this.state;
    return (
      <TouchableOpacity onPress={()=>{this._savePhoto()}}>
        <Text style={styles.paragraph}>Fetching photos...</Text>
      </TouchableOpacity>
    );
  }

  _renderPhotos(photos) {
    let images = [];
    for (let { node: photo } of photos.edges) {images.push(
        <TouchableOpacity onPress={this._savePhoto}>
          <Image source={photo.image} resizeMode="contain" style={{ height: 100, width: 100, resizeMode: 'contain' }}/>
        </TouchableOpacity>
      );
    }
    return images;
  }

  componentDidMount() {
    this._getPhotosAsync().catch(error => {
      console.warn(error);
    });
  }

  async _getPhotosAsync() {
    let photos = await CameraRoll.getPhotos({ first: 4 });
    this.setState({ photos });
  }

  _savePhoto = () => {
    console.log("saving")
    CameraRoll.saveToCameraRoll("https://www.google.ca/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png").then(response =>{
      console.log("image saved");
    }).catch(error => {
      console.log('error: ', error);
    })                    
  }
}


const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
