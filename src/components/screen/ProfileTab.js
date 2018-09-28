import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class Main extends React.Component {

  constructor()
  {
    super();
    this.state = {
      currentUser: null,
      Columns: 3,
      height: 135,
      width: 135,
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  componentWillMount() {
    return fetch('http://www.splashbase.co/api/v1/images/search?query=car').then((response) => response.json()).then((responseJson) => {
        this.setState({ dataSource: responseJson.images },
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
    })
  }

  List =()=> {
    this.setState({
      Columns: 1,
      height: 250,
      width: '100%',
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
          <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
            <Image source={{uri: 'https://www.joomlack.fr/images/stories/images/on-top-of-earth.jpg'}} style={{ width: 100, height: 100, borderRadius: 50 }} />
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>2213</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>posts</Text>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#3897f0', height: 35, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2', margin: 20 }}>Message</Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>2213</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>posts</Text>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#3897f0', height: 35, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2', margin: 15 }}>Me</Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>2213</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>posts</Text>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#3897f0', height: 35, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2', margin: 15 }}>Me</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 15 }}>Message</Text>
          <Text style={{ textAlign: 'left', fontSize: 12, color: 'black', paddingLeft: 15 }}>Traveller</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 15 }}>In hac habitasse platea dictumst.</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 15 }}>In hac habitasse platea dictumst.</Text>
          <Text style={{ textAlign: 'left', fontSize: 14, color: 'black', paddingLeft: 15 }}>In hac habitasse platea dictumst.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 15, marginTop: 15, borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth, borderTopWidth: StyleSheet.hairlineWidth }}>
              <TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#3897f0' }}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#3897f0' }}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#3897f0' }}>Direction</Text>
              </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15, paddingTop: 15, borderBottomColor: '#bbb', borderBottomWidth: StyleSheet.hairlineWidth }}>
              <TouchableOpacity onPress={this.Grid}>
                <Icon name='md-grid' size={25}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.List}>
                <Icon name='ios-list' size={25}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='md-clipboard' size={25}/>
              </TouchableOpacity>
          </View>
          <FlatList
            data={ this.state.dataSource }
            renderItem={ ({item}) =>
              <View style={{ flex: 1, flexWrap: 'wrap' }}>
                <TouchableOpacity onPress={() => { Alert.alert(item.url) }}>
                  <Image style={{ height: this.state.height, width: this.state.width, margin: 1 }} source = {{ uri: item.url }} />
                </TouchableOpacity>
              </View>
            }
            numColumns = { this.state.Columns }
            key = {( this.state.Columns ) }
            keyExtractor={ (item, index) => index }
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
})