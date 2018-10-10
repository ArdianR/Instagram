import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CameraRoll, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { PermissionsAndroid } from 'react-native';

export default class Camera extends Component {
  
  static navigationOptions = {
    header: null,
  }

  constructor()
  {
    super();
    this.state = {
      image: '',
    }
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    CameraRoll.saveToCameraRoll(data.uri);
    this.setState({ image: data });
  }

  render() {
    const { image } = this.state;
    if (image) {
      return <ImageBackground source={image} style={{ height: 50, width: 50 }}/>;
    }
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        >
          {({ camera }) => {
            return (
              <View style={{ flex: 0, flexDirection: 'row', margin: 25 }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Icon name='camera-front' size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Icon name='camera-rear' size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Icon name='camera' size={50} color='black' style={styles.button}/>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Icon name='photo-camera' size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Icon name='videocam' size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    margin: 25,
  },
  button: {
    alignSelf: 'center',
  },
});
