import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, CameraRoll, ImageBackground, Switch, ActivityIndicator, Modal, Alert, TouchableHighlight, Button, FlatList } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { PermissionsAndroid } from 'react-native';

import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

class CameraTab extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      mirrorMode : false,
      cameraType : 'back',
      cameraIcon: 'camera-front',
      flashMode: 'off',
      flashIcons: 'flash-off',
      modalVisible: false,
      autoFocus: 'on',
      autoFocusIcon: 'visibility',
      isRecording: false,
      recordOptions: {
        mute: false,
        maxDuration: 5,
        quality: RNCamera.Constants.VideoQuality["1080p"],
      },
    }
  }

  changeFocus() {
    if (this.state.autoFocus === 'on') {
      this.setState({
        autoFocus: 'off',
        autoFocusIcon: 'visibility-off',
      });
    } else {
      this.setState({
        autoFocus: 'on',
        autoFocusIcon: 'visibility',
      });
    }
  }

  changeModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    CameraRoll.saveToCameraRoll(data.uri);
    this.setState({ image: data });
  }

  takeVideo = async function() {
    if (this.camera) {
      try {
        const promise = this.camera.recordAsync(this.state.recordOptions);

        if (promise) {
          this.setState({ isRecording: true });
          const data = await promise;
          this.setState({ isRecording: false });
          console.warn(data);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  changeCameraType() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirror: true,
        cameraIcon: 'camera-rear',
      });
    } else {
      this.setState({
        cameraType: 'back',
        mirror: false,
        cameraIcon: 'camera-front',
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <RNCamera
          ref={ref => { this.camera = ref }}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          autoFocus={this.state.autoFocus}
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          flashMode={this.state.flashMode}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.warn(barcodes)
          }}
        >
          {({ camera }) => {
            return (
              <View style={{ flex: 0, flexDirection: 'row', margin: 30 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.changeCameraType.bind(this)}>
                    <MaterialIcons name={this.state.cameraIcon} size={25} color='white'/>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' , justifyContent: 'center' }}>
                  <TouchableOpacity style={{ alignSelf: 'center', margin: 5 }} onPress={() => this.takePicture(camera)}>
                    <MaterialIcons name='camera' size={35} color='white'/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ alignSelf: 'center', margin: 5 }} onPress={() => this.takePicture(camera)}>
                    <MaterialIcons name='camera' size={50} color='white'/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ alignSelf: 'center', margin: 5 }} onPress={this.state.isRecording ? () => {} : this.takeVideo.bind(this)}>
                    {
                      this.state.isRecording ?
                      <MaterialIcons name='camera-roll' size={35} color='white'/>
                      :
                      <MaterialIcons name='videocam' size={35} color='white'/>
                    }
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => {this.changeModalVisible(true)}}>
                    <MaterialIcons name='settings' size={25} color='white'/>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }}
        </RNCamera>
        <Modal
          transparent={true}
          animationType={'slide'}
          visible={this.state.modalVisible}
          onRequestClose={ () => { this.changeModalVisible(!this.state.modalVisible)}}>
            <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ alignItems: 'center', backgroundColor : "#404042", height: 500 , width: '80%', borderRadius: 10 }}>
                <TouchableOpacity style={{ margin: 20 }} onPress={this.changeFocus.bind(this)}>
                  <MaterialIcons name={this.state.autoFocusIcon} size={25} color='white'/>
                </TouchableOpacity>
                <TouchableHighlight onPress={() => { this.changeModalVisible(!this.state.modalVisible) }}>
                  <MaterialIcons name='close' size={35} color='white'/>
                </TouchableHighlight>
              </View>
            </View>
        </Modal>
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

})

export default CameraStack