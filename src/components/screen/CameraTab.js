import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  CameraRoll,
  ImageBackground,
  Switch,
  ActivityIndicator,
  Modal,
  Alert,
  TouchableHighlight,
  Button,
  FlatList,
  Slider
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { PermissionsAndroid } from 'react-native';

import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Toast from './Toast';

const landmarkSize = 2;

const flashMode = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
}

const whiteBalanceMode = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

class CameraTab extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cameraMode: 'camera',
      modeIcon: 'videocam',
      modalVisible: false,
      mirrorMode : false,
      cameraType : 'back',
      cameraIcon: 'camera-front',
      cameraIconSize: 30,
      cameraTakeIconSize: 50,
      flashMode: 'off',
      autoFocus: 'on',
      
      recordOptions: {
        mute: false,
        maxDuration: 60,
        quality: RNCamera.Constants.VideoQuality['1080p'],
        mirrorVideo: true,
      },
      isRecording: false,
      orientation: '',
      whiteBalanceMode: 'auto',
      depth: 0,
      showGalleryMode: false,
      showGallery: 'on',
      ratios: [],
      ratio: '16:9',
      faces: [],
      zoom: 0,
      pictureOption: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        quality: 1,
        base64: true,
        mirrorImage: true,
        fixOrientation: true,
        exif: true,

      },
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

  changeMode() {
    if (this.state.cameraMode === 'camera') {
      this.setState({
        cameraMode: 'video',
        modeIcon: 'photo-camera',
        cameraTakeIconSize: 50,
        cameraIcon: 'camera-front',
        cameraIconSize: 25,
      })
    } 
    else {
      this.setState({
        cameraMode: 'camera',
        modeIcon: 'videocam',
        cameraIcon: 'camera-front',
        cameraTakeIconSize: 50,
        cameraIconSize: 30,
      })
    }
  }

  changeModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  changeCameraType() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirrorMode: true,
        cameraIcon: 'camera-rear',
      })
    } else {
      this.setState({
        cameraType: 'back',
        mirrorMode: true,
        cameraIcon: 'camera-front',
      })
    }
  }

  changeFocus() {
    if (this.state.autoFocus === 'on') {
      this.setState({
        autoFocus: 'off',
      })
    } else {
      this.setState({
        autoFocus: 'on',
      })
    }
  }

  takePicture = async function(camera) {
    const data = await camera.takePictureAsync(this.state.pictureOption)
    CameraRoll.saveToCameraRoll(data.uri,'photo')
    Toast.show('saved',Toast.SHORT)
    this.setState({ image: data })
  }

  takeVideo = async function(camera) {
    this.setState({ isRecording: true })
    Toast.show('recording',Toast.SHORT)
    const data = await camera.recordAsync(this.state.recordOptions)
    CameraRoll.saveToCameraRoll(data.uri,'video')
    this.setState({ image: data })
  }

  saveVideo = async function(camera) {
    this.setState({ isRecording: false })
    Toast.show('saved',Toast.SHORT)
    this.camera.stopRecording()
  }

  changeFlash() {
    this.setState({
      flashMode: flashMode[this.state.flashMode],
    });
  }

  changeWhiteBalance() {
    this.setState({
      whiteBalanceMode: whiteBalanceMode[this.state.whiteBalanceMode],
    });
  }

  changeFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  changeGallery() {
    this.setState({
      showGalleryMode: !this.state.showGalleryMode,
      showGallery: this.state.showGallery === 'on' ? 'off' : 'on',
    });
  }

  getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    this.setState({
      ratios
    })
  };

  changeZoom(zoom) {
    this.setState({
      zoom
    });
  }

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      >
        <Text style={{ color: '#FFD700', fontWeight: 'bold', textAlign: 'center', margin: 10 }}>ID: {faceID}</Text>
        <Text style={{ color: '#FFD700', fontWeight: 'bold', textAlign: 'center', margin: 10 }}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={{ color: '#FFD700', fontWeight: 'bold', textAlign: 'center', margin: 10 }}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </View>
    );
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            { width: landmarkSize, height: landmarkSize, position: 'absolute', backgroundColor: 'red' },
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces() {
    return (
      <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }} pointerEvents="none">
        {this.state.faces.map(this.renderFace)}
      </View>
    );
  }

  renderLandmarks() {
    return (
      <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, top: 0 }} pointerEvents="none">
        {this.state.faces.map(this.renderLandmarksOfFace)}
      </View>
    );
  }



  render(image) {
    return (
      <View style={{ flex: 1 }} ref = "rootView">
        <RNCamera
          ref={ref => { this.camera = ref }}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          autoFocus={this.state.autoFocus}
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          flashMode={this.state.flashMode}
          whiteBalance={this.state.whiteBalanceMode}
          ratio={this.state.ratio}
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          onFacesDetected={this.onFacesDetected}
          onFaceDetectionError={this.onFaceDetectionError}
          focusDepth={this.state.depth}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          onGoogleVisionBarcodesDetected={({ barcodes }) => { console.warn(barcodes) }}
          captureAudio= {true}
        >
          {({ camera }) => {
            return (
              <View style={{ flexDirection: 'column', margin: Dimensions.get('window').height / 40 }}>
                <Slider style={{ width: Dimensions.get('window').width / 1.25, margin: Dimensions.get('window').height / 50 }}
                  onValueChange={this.changeZoom.bind(this)} step={0.1}/>
                <Slider style={{ width: Dimensions.get('window').width / 1.25, margin: Dimensions.get('window').height / 50 }}
                  onValueChange={this.changeFocusDepth.bind(this)} step={0.1} disabled={this.state.autoFocus === 'on'}/>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={this.changeCameraType.bind(this)}>
                    <MaterialIcons name={this.state.cameraIcon} size={30} color='white'/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={this.state.image} style={{ width: 35, height: 35, borderRadius: 50 }}/>
                  </TouchableOpacity>
                  
                  {
                    this.state.cameraMode === 'camera' ?
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.takePicture(camera)}>
                      <MaterialIcons name='camera' size={this.state.cameraTakeIconSize} color='white'/>
                    </TouchableOpacity>
                    :
                    this.state.isRecording ?
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.saveVideo(camera)}>
                      <Feather name='stop-circle'  size={this.state.cameraTakeIconSize} color='white'/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.takeVideo(camera)}>
                      <Feather name='play-circle'  size={this.state.cameraTakeIconSize} color='white'/>
                    </TouchableOpacity>
                  }
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={this.changeMode.bind(this)}>
                    <MaterialIcons name={this.state.modeIcon} size={this.state.cameraIconSize} color='white'/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {this.changeModalVisible(true)}}>
                    <MaterialIcons name='settings' size={30} color='white'/>
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
              <View style={{ justifyContent: 'center', backgroundColor : "#404042", height: Dimensions.get('window').height / 1.75, width: Dimensions.get('window').width / 1.25, borderRadius: 15 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }} onPress={this.changeFocus.bind(this)}>
                  <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 16, color: 'white' }}>
                    auto Focus Mode : {this.state.autoFocus}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }} onPress={this.changeFlash.bind(this)}>
                  <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 16, color: 'white' }}>
                    flash Mode : {this.state.flashMode}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }} onPress={this.changeWhiteBalance.bind(this)}>
                  <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 16, color: 'white' }}>
                    white Balance Mode : {this.state.whiteBalanceMode}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }} onPress={this.changeGallery.bind(this)}>
                  <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 16, color: 'white' }}>
                    show Gallery Mode : {this.state.showGallery}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => { this.changeModalVisible(!this.state.modalVisible) }}>
                <MaterialIcons name='close' size={35} color='white' />
              </TouchableOpacity>
            </View>
        </Modal>
      </View>
    )
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