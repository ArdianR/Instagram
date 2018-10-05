import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImagePickerIOS,
  Image,
  TouchableOpacity
} from 'react-native';

export default class CameraRoll extends Component {
  constructor(props) {
    super(props);
      this.state = {
        image: null
      };
      this.chooseImageFromGallery = this.chooseImageFromGallery.bind(this);
      this.chooseImageFromGallery = this.chooseImageFromCamera.bind(this);
  }

  chooseImageFromGallery() {
    ImagePickerIOS.openSelectDialog({}, imageUrl => {
      this.setState({image: imageUrl});
    }, error => console.error(error));
  }

  chooseImageFromCamera() {
    ImagePickerIOS.openCameraDialog({}, imageUrl => {
      this.setState({image: imageUrl});
    }, error => console.error(error));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {this.state.image?<Image style={{flex:1}} source={{url: this.state.image}}></Image>:null} 
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromGallery}>
            <Text style={styles.buttonText}>Open from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.chooseImageFromCamera}>
            <Text style={styles.buttonText}>Open from Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
  }
});