import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {

  static navigationOptions = {
    header: null,
  }

  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const { email, password } = this.state
    firebase
    .auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleLogin')
  }

  render() {
    return(
      <ImageBackground style={styles.ImageBackground} resizeMode='cover' source={require('../assets/login/background.png')}>
        <ScrollView contentContainerStyle={{ paddingVertical: 50 }}>
        <View style={styles.View}>
          <View style={styles.ViewLogo}>
            <Image style={styles.Logo} source={require('../assets/login/instagram.png')}/>
          </View>
          <View style={styles.ViewTextAndButton}>
            <View style={styles.ViewText}>
              <Text style={styles.TextSign}>Sign in and use more features</Text>
            </View>
            <View style={styles.ViewTextInput}>
              {this.state.errorMessage && <Text style={styles.Error}> {this.state.errorMessage}</Text>}
              <View style={styles.ViewUsername}>
                <TextInput style={styles.TextUsername} underlineColorAndroid='transparent' placeholder="Email or Username" onChangeText={email => this.setState({ email })} value={this.state.email} textContentType="emailAddress"/>
              </View>
              <View style={styles.ViewPassword}>
                <TextInput style={{ margin: 10, width: '80%', borderRadius: 5, backgroundColor: 'white', paddingLeft: 10 }} underlineColorAndroid='transparent' placeholder="Password" secureTextEntry={true} onChangeText={password => this.setState({ password })} value={this.state.password} textContentType="password"/>
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                <TouchableOpacity style={{ backgroundColor: '#3897f0', margin: 10, width: '80%', height: 50, borderRadius: 5 }} onPress={this.handleLogin}>
                  <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', margin: 10 }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 14, color: 'white' }}>Forgot your login details ?   </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={{ fontSize: 14, color: 'white' }}>Get help signing in</Text>
                </TouchableOpacity>
              </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
              <View style={{ backgroundColor: 'white', height: 2, flex: 0.5, alignSelf: 'center', marginLeft: 60 }}/>
              <Text style={{ fontSize: 14, color: 'white', paddingHorizontal: 10 }}>OR</Text>
              <View style={{ backgroundColor: 'white', height: 2, flex: 0.5, alignSelf: 'center', marginRight: 60 }}/>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                <TouchableOpacity>
                  <Text style={{ fontSize: 14, color: 'white' }}>Continue with Facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={{ fontSize: 14, color: 'white' }}>Don’t have an account? Sing up</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1
  },
  View: {
    flex: 1
  },
  ViewLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  Logo: {
    width: 260,
    height: 75
  },
  ViewTextAndButton: {
    flex: 2
  },
  ViewText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  TextSign: {
    color: '#f9f9f9',
    fontSize: 18
  },
  ViewTextInput: {
    flex: 9
  },
  Error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center'
  },
  ViewUsername: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextUsername: {
    margin: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10
  },
  ViewPassword: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
})