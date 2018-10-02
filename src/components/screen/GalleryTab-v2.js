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
} from 'react-native';

import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';

const { width } = Dimensions.get('window')

export default class GalleryTab extends Component {
  
  static navigationOptions = {
    header: null,
  }

  getPhotos = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'All',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
  }

  share = () => {
    const image = this.state.photos[this.state.index].node.image.uri      
    RNFetchBlob.fs.readFile(image, 'base64')
      .then((data) => {
        let shareOptions = {
          title: "React Native Share Example",
          message: "Check out this photo!",
          url: `data:image/jpg;base64,${data}`,
          subject: "Check out this photo!"
        }
        Share.open(shareOptions)
          .then((res) => console.log('res:', res))
          .catch(err => console.log('err', err))
      })
  }

  state = {
    modalVisible: false,
    photos: [],
    index: null
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  navigate = () => {
    const { navigate } = this.props.navigation
    navigate('ImageBrowser')
  }

  render() {
    console.log('state :', this.state)

    return (
      <View style={styles.container}>
       <View>
         <Button title="Load Images" onPress={this.getPhotos()} />
         <ScrollView>
           {this.state.photos.map((p, i) => {
           return (
             <Image
               key={i}
               style={{
                 width: 300,
                 height: 300,
               }}
               source={{ uri: p.node.image.uri }}
             />
           );
         })}
         </ScrollView>
       </View>
        <Button
          title='View Photos'
          onPress={() => { this.toggleModal(); this.getPhotos() }}
        />
        <Button
          title='Browse Images'
          onPress={this.navigate}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={this.toggleModal}
            />
            <ScrollView
              contentContainerStyle={styles.scrollView}>
              {
                this.state.photos.map((p, i) => {
                  return (
                    <TouchableHighlight
                      style={{opacity: i === this.state.index ? 0.5 : 1}}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.setIndex(i)}
                    >
                      <Image
                        style={{
                          width: width/3,
                          height: width/3
                        }}
                        source={{uri: p.node.image.uri}}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
            {
              this.state.index !== null  && (
                <View style={styles.shareButton}>
                  <Button
                      title='Share'
                      onPress={this.share}
                    />
                </View>
              )
            }
          </View>
        </Modal>
      </View>
    );
  }
}


styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  shareButton: {
    position: 'absolute',
    width,
    padding: 10,
    bottom: 0,
    left: 0
  }
})
