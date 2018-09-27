import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {

  state = { email: '', password: '', fullname: '', username: '', errorMessage: null }
  handleSignUp = () => {
    firebase
    .auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(error => this.setState({ errorMessage: error.message }))
    console.log('handleSignUp')
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 50 }} style={styles.ScrollView}>
        <View style={styles.View}>
          <View style={styles.ViewLogo}>
            <Image style={styles.Logo} source={require('../assets/signup/instagram.png')}/>
          </View>
          <View style={styles.ViewTextAndButton}>
            <View style={styles.ViewText}>
              <Text style={styles.TextSignUp}>Sign up see photos and videos from your friends</Text>
            </View>
            <View style={styles.ViewSignInFacebook}>
              <TouchableOpacity style={styles.ButtonSignInFacebook}>
                <Text style={styles.TextSignUpFacebook}>Sign up with Facebook</Text>
              </TouchableOpacity>
            </View>
            {this.state.errorMessage && <Text style={styles.Error}> {this.state.errorMessage}</Text>}
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
              <View style={{ backgroundColor: 'black', height: 2, flex: 0.5, alignSelf: 'center', marginLeft: '10%' }}/>
              <Text style={{ fontSize: 18, color: 'black', paddingHorizontal: 10 }}>OR</Text>
              <View style={{ backgroundColor: 'black', height: 2, flex: 0.5, alignSelf: 'center', marginRight: '10%' }}/>
            </View>
            <View style={styles.ViewTextInput}>
              <View style={styles.ViewUsername}>
                <TextInput
                  style={styles.TextUsername}
                  underlineColorAndroid='transparent'
                  placeholder="Email Address"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </View>
              <View style={styles.ViewUsername}>
                <TextInput
                  style={styles.TextUsername}
                  underlineColorAndroid='transparent'
                  placeholder="Full Name"
                  onChangeText={fullname => this.setState({ fullname })}
                  value={this.state.fullname}
                />
              </View>
              <View style={styles.ViewUsername}>
                <TextInput
                  style={styles.TextUsername}
                  underlineColorAndroid='transparent'
                  placeholder="Username"
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                />
              </View>
              <View style={styles.ViewPassword}>
                <TextInput
                  style={styles.TextPassword}
                  underlineColorAndroid='transparent'
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                <TouchableOpacity style={{ backgroundColor: '#3897f0', margin: 10, width: '80%', height: 50, borderRadius: 5 }} onPress={this.handleSignUp}>
                  <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', margin: 10 }}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.ViewText}>
              <Text style={styles.TextSignUp}>By signing up, you agree to our Terms & Privacy policy</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                  <Text style={{ fontSize: 18, color: 'black' }}>Have an account ? Log in</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white'
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
  TextSignUp: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 25,
    paddingRight: 25,
    textAlign: 'center',
  },
  ViewTextInput: {
    flex: 9
  },
  Error: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center'
  },
  ViewUsername: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextUsername: {
    margin: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10,
    backgroundColor: '#f2f3f4'
  },
  TextPassword: {
    margin: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: 'white',
    paddingLeft: 10,
    backgroundColor: '#f2f3f4'
  },
  ViewPassword: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ViewSignInFacebook: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  ButtonSignInFacebook: {
    backgroundColor: '#3897f0',
    margin: 10,
    width: '80%',
    height: 35,
    borderRadius: 5
  },
  TextSignUpFacebook: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 3
  },
})