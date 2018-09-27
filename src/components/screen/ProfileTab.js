import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import firebase from 'react-native-firebase';

export default class Main extends React.Component {

  constructor()
  {
    super();
    this.state = {
      currentUser: null,
      Columns: 3,
      height: 135,
      width: 135,
      margin: 1,
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  componentWillMount() {
    return fetch('http://www.splashbase.co/api/v1/images/search?query=car').then((response) => response.json()).then((responseJson) => {
        this.setState({ isLoading: false, dataSource: responseJson.images },
        function() { 
          // console.warn(responseJson.images)
        })
      }).catch((error) => { console.error(error) })
  }

  state = { currentUser: null }
  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('Loading'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  Grid =()=> {
    this.setState({
      Columns: 3,
      height: 135,
      width: 135,
      margin: 1,
    })
  }

  List =()=> {
    this.setState({
      Columns: 1,
      height: 250,
      width: '100%',
      margin: 1,
    })
  }


  GetGridViewItem(item){
    Alert.alert(item)
  }

  render() {
    const { currentUser } = this.state
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#fafafa' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={{uri: 'https://www.joomlack.fr/images/stories/images/on-top-of-earth.jpg'}} style={{ width: 100, height: 100, borderRadius: 50, margin: 15 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black' }}>2213</Text>
                <Text style={{ fontSize: 14, color: 'black' }}>posts</Text>
                <Text style={{ fontSize: 18, color: 'black' }}>891</Text>
                <Text style={{ fontSize: 14, color: 'black' }}>followers</Text>
                <Text style={{ fontSize: 18, color: 'black' }}>511</Text>
                <Text style={{ fontSize: 14, color: 'black' }}>following</Text>
              </View>
          </View>
          <View/>
            <View style={{ flex: 13, backgroundColor: '#fafafa' }}>
                <View style={{ flex: 3, flexDirection: 'row', paddingTop: 10 }}>
                  <View style={{ flex: 3, flexDirection: 'column', justifyContent:'center', backgroundColor: '#fafafa' }}>
                    <Image source={{uri: 'https://www.joomlack.fr/images/stories/images/on-top-of-earth.jpg'}} style={{ width: 100, height: 100, justifyContent: 'center', alignSelf: 'center', borderRadius: 50, }} />
                  </View>
                  <View style={{ flex: 6, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1, justifyContent: 'space-around' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>2213</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>posts</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'space-around' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>891</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>followers</Text>
                      </View>
                      <View style={{ flex: 1, justifyContent: 'space-around' }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: 'black' }}>511</Text>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>following</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 15 }}>
                      <TouchableOpacity style={{ flex: 3, justifyContent: 'space-around', backgroundColor: '#3897f0', margin: 1, width: '80%', height: 35, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2' }}>Message</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', backgroundColor: '#3897f0', margin: 1, width: '80%', height: 35, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2' }}>Me</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{ flex: 1, justifyContent: 'space-around', backgroundColor: '#3897f0', margin: 1, width: '80%', height: 35, borderRadius: 5 }}>
                        <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2' }}>Me</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 3, paddingTop: 10, borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 2, justifyContent: 'space-around', paddingBottom: 5 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', paddingLeft: 18 }}>Message</Text>
                    <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 18 }}>Traveller</Text>
                  </View>
                  <View style={{ flex: 2, justifyContent: 'space-around', paddingBottom: 5 }}>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', paddingLeft: 18 }}>In hac habitasse platea dictumst.</Text>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', paddingLeft: 18 }}>In hac habitasse platea dictumst.</Text>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', paddingLeft: 18 }}>In hac habitasse platea dictumst.</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                    <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 18 }}>Followed by</Text>
                    <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 1 }}>snowgraphs</Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 15, paddingBottom: 15, borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 1, justifyContent: 'space-around'  }}>
                    <TouchableOpacity>
                      <Text style={{ textAlign: 'center', fontSize: 14, color: '#3897f0' }}>Call</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'space-around'  }}>
                    <TouchableOpacity>
                      <Text style={{ textAlign: 'center', fontSize: 14, color: '#3897f0' }}>Email</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'space-around'  }}>
                    <TouchableOpacity>
                      <Text style={{ textAlign: 'center', fontSize: 14, color: '#3897f0' }}>Direction</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 20, paddingBottom: 20, borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth }}>
                  <View style={{ flex: 1, justifyContent: 'space-around'  }}>
                    <TouchableOpacity onPress={this.Grid}>
                      <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../assets/profile/icon_squared_menu.png')}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={this.List}>
                      <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../assets/profile/icon_list.png')}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'space-around' }}>
                    <TouchableOpacity>
                      <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={require('../assets/profile/icon_user_location.png')}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ flex: 6, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <FlatList data={ this.state.dataSource } renderItem={ ({item}) =>
                        <Image style={{ flex: 1, height: this.state.height, width: this.state.width, margin: this.state.margin }} source = {{ uri: item.url }} />
                    }
                    numColumns = { this.state.Columns }
                    key = {( this.state.Columns ) }
                    keyExtractor={ (item, index) => index }
                  />
                </View>
            </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})