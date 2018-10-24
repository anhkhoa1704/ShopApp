import React from 'react';
import { SafeAreaView, TextInput, TouchableWithoutFeedback, Text, View, Image, AsyncStorage, Alert } from 'react-native';
import firebaseApp from '../../config-firebase'

export default class SignInScreen extends React.Component {

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      id: '',
      password: '',
    }
  }

  checkExist() {
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      var isShow = true
      childSnapshot.forEach((child) => {
        if (this.state.id === child.toJSON().id && this.state.password === child.toJSON().password)
        {
          this.setUser()
          isShow = false
          Alert.alert(
            'Sign In is successful',
            '',
            [
              {text: 'OK', onPress: () => {this.props.navigation.navigate('Main')}},
            ],
            { cancelable: false }
          )
        }
      });
      if (isShow)
      {
        Alert.alert(
          'Failed to Sign In',
          'Apple ID or password is incorrect',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      }
    });
  }

  _onPressSignIn = () => 
  {
    if (this.state.id === '')
    {
      alert('Please enter Apple ID')
      this._id.focus()
    }
    else if (this.state.password === '')
    {
      alert('Please enter password')
      this._password.focus()
    }
    else if (this.state.id.includes(' '))
    {
      alert('Please enter Apple ID without space')
      this._id.focus()
    }
    else if (this.state.password.includes(' '))
    {
      alert('Please enter password without space')
      this._password.focus()
    }
    else
    {
      this.checkExist()
    }
  }

  async setUser() {
    try {
      await AsyncStorage.setItem('@user:key', this.state.id);
    } catch (error) {
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
        <View>
          <Image
              style={{width: 100, height: 100, marginBottom: 40}}
              source={require('../../assets/icon-apple.png')}></Image>
        </View>
        <Text
          style={{marginBottom: 20, fontFamily: 'System', fontSize: 40, width: '100%', paddingLeft: 37.5, color: '#333'}}>Please sign in.</Text>
        <TextInput
          ref={(c) => this._id = c}
          onChangeText={(text) => {
            this.setState({
              id: text
            })
          }}
          style={{marginBottom: 20, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          placeholder='Apple ID'></TextInput>
        <TextInput
          ref={(c) => this._password = c}
          onChangeText={(text) => {
            this.setState({
              password: text
            })
          }}
          style={{marginBottom: 20, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          secureTextEntry
          placeholder='Password'></TextInput>
        <TouchableWithoutFeedback
          onPress={this._onPressSignIn}>
          <View
            style={{marginBottom: 20, backgroundColor: '#0066ff', alignItems: 'center', justifyContent: 'center', width: 300, height: 48, borderWidth: 1, borderRadius: 4, borderColor: '#1482d0'}}>
            <Text
              style={{fontFamily: 'System', fontSize: 18, color: 'white'}}>Sign In</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('Register')
          }}>
          <View>
            <Text
              style={{fontFamily: 'System', fontSize: 16, color: '#0066ff', textDecorationLine: 'underline'}}>Don't have an Apple ID? Create one now.</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}