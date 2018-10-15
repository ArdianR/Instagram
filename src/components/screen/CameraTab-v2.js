import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CameraRoll, ImageBackground, Switch, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { PermissionsAndroid } from 'react-native';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

class CameraTab extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      cameraType : 'back',
      mirrorMode : false,
      cameraIcons: 'camera-front',
      flashMode: 'off',
      flashIcons: 'flash-off',
    }
  }

  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    CameraRoll.saveToCameraRoll(data.uri);
    this.setState({ image: data });
  }

  changeCameraType() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirror: true,
        cameraIcons: 'camera-rear',
      });
    } else {
      this.setState({
        cameraType: 'back',
        mirror: false,
        cameraIcons: 'camera-front',
      });
    }
  }

  changeflashMode() {
    if (this.state.flashMode === 'off') {
      this.setState({
        flashMode: 'on',
        flashIcons: 'flash-on',
      });
    } else {
      this.setState({
        flashMode: 'off',
        flashIcons: 'flash-off',
      });
    }
  }

  render() {
    const { image, recording, processing } = this.state;
    // if (image) {
    //   return <ImageBackground source={image} style={{ height: 50, width: 50 }}/>;
    // }
    // if (this.state.cameraFrontRear) {
    //   return (
    //     <View style={{flex: 1, justifyContent: 'center' }}>
    //       <ActivityIndicator />
    //     </View>
    //   );
    // }
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          flashMode={this.state.flashMode}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.warn(barcodes)
          }}
        >
          {({ camera }) => {
            return (
              <View style={{ flex: 0, flexDirection: 'row', margin: 25 }}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.capture} onPress={this.changeCameraType.bind(this)}>
                    <MaterialIcons name={this.state.cameraIcons} size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.capture} onPress={this.changeflashMode.bind(this)}>
                    <MaterialIcons name={this.state.flashIcons} size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <MaterialIcons name='camera' size={50} color='black' style={styles.button}/>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.capture}>
                    <MaterialIcons name='photo-camera' size={35} color='black' style={styles.button}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.capture}>
                    <MaterialIcons name='videocam' size={35} color='black' style={styles.button}/>
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

let CameraStack = createStackNavigator({ CameraTab }, {
  navigationOptions: {
    header: null,
  }
})


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
})

export default CameraStack