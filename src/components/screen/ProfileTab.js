import React from 'react';
import { StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert, Dimensions } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class Main extends React.Component {

  constructor()
  {
    super();
    this.state = {
      currentUser: null,
      Columns: '',
      orientation: '',
      height: '',
      width: '',
    }
  }

  getOrientation = () => {
    if( this.refs.rootView ) {
        if( Dimensions.get('window').width < Dimensions.get('window').height ) {
          this.setState({ orientation: 'portrait' });
          this.setState({ Columns: 3 });
          this.setState({ height: Dimensions.get('window').width / 3 });
          this.setState({ width: Dimensions.get('window').width / 3 });
        } else {
          this.setState({ orientation: 'landscape' });
          this.setState({ Columns: 1 });
          this.setState({ height: Dimensions.get('window').width });
          this.setState({ width: Dimensions.get('window').width });
        }
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    this.getOrientation();
    Dimensions.addEventListener( 'change', () => { this.getOrientation(); });
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

  gridView =()=> {
    this.setState({ Columns: 3 });
    this.setState({ height: Dimensions.get('window').width / 3 });
    this.setState({ width: Dimensions.get('window').width / 3 });
  }

  listView =()=> {
    this.setState({ Columns: 1 });
    this.setState({ height: Dimensions.get('window').width });
    this.setState({ width: Dimensions.get('window').width });
  }


  GetGridViewItem(item){
    Alert.alert(item)
  }

  render() {
    const { currentUser } = this.state
    return (
      <ScrollView >
        <View style={{ backgroundColor: '#fafafa' }}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
            <Image source={{uri: 'https://www.joomlack.fr/images/stories/images/on-top-of-earth.jpg'}} style={{ width: 90, height: 90, borderRadius: 50 }} />
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>2213</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>posts</Text>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#3897f0', height: 30, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2', margin: 20 }}>Message</Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>2213</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>posts</Text>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#3897f0', height: 30, borderRadius: 5 }}>
                <Text style={{ textAlign: 'center', fontSize: 14, color: '#e3e9f2', margin: 15 }}>Me</Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', padding: 10 }}>
              <Text style={{ textAlign: 'center', fontSize: 14, color: 'black' }}>2213</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: 'black' }}>posts</Text>
              <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#3897f0', height: 30, borderRadius: 5 }}>
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
              <TouchableOpacity onPress={this.gridView}>
                <Icon name='md-grid' size={25}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.listView}>
                <Icon name='ios-list' size={25}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name='md-clipboard' size={25}/>
              </TouchableOpacity>
          </View>
          <FlatList
            ref = "rootView"
            style={{ flex: 1 }}
            data={ this.state.dataSource }
            renderItem={ ({item}) =>
              <View>
                <TouchableOpacity onPress={() => { Alert.alert(item.url) }}>
                  <Image style={{ height: this.state.height, width: this.state.width, margin: 1 }} source = {{ uri: item.url }} />
                </TouchableOpacity>
              </View>
            }
            numColumns = { this.state.Columns }
            key = {( this.state.Columns ) }
            keyExtractor={item => item.url}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
})