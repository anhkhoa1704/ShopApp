import React from 'react';
import { SafeAreaView, TextInput, TouchableWithoutFeedback, Text, View, ImageBackground, Alert, AsyncStorage } from 'react-native';
import firebaseApp from '../../config-firebase'

export default class RegisterScreen extends React.Component {

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      firstname: '',
      lastname: '',
      id: '',
      password: '',
      confirm_password: '',
    }
  }

  _onPressRegister()
  {
    if (this.state.firstname === '')
    {
      alert('Please enter First name.')
      this._firstname.focus()
    }
    else if (this.state.lastname === '')
    {
      alert('Please enter Last name.')
      this._lastname.focus()
    }
    else if (this.state.id === '')
    {
      alert('Please enter Apple ID.')
      this._id.focus()
    }
    else if (this.state.password === '')
    {
      alert('Please enter Password.')
      this._password.focus()
    }
    else if (this.state.id.includes(' '))
    {
      alert('Please enter Apple ID without space.')
      this._id.focus()
    }
    else if (this.state.password.includes(' '))
    {
      alert('Please enter password without space.')
      this._password.focus()
    }
    else if (this.state.password !== this.state.confirm_password)
    {
      alert('Confirm password is incorrect.')
      this._confirmpassword.focus()
    }
    else
    {
      var isRegister = true
      firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
        childSnapshot.forEach((child) => {
          if (this.state.id === child.toJSON().id)
          {
            isRegister = false
          }
        });
      });
      if (isRegister) 
      {
        this._Register()
      }
      else{
        Alert.alert(
          'Information',
          'This Apple ID already exists',
          [
            {text: 'OK', onPress: () => {this._id.focus()}},
          ],
          { cancelable: false }
        )
      }
    }
  }

  _Register()
  {
    firebaseApp.database().ref('shopapp/list_User/').push().set({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      id: this.state.id,
      password: this.state.password,
    });
    this.setUser()
    Alert.alert(
      'Register is successful',
      '',
      [
        {text: 'OK', onPress: () => {
          this.props.navigation.navigate('Main')}
        },
      ],
      { cancelable: false }
    )
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
        <ImageBackground
          style={{width: '100%', height: 120, marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}
          source={require('../../assets/apple-background-create.jpg')}>
          <Text
            style={{fontFamily: 'System', fontSize: 32, color: '#fff'}}>Create Your Apple ID</Text>
        </ImageBackground>
        <View
          style={{marginBottom: 10, flexDirection: 'row', width: 300, height: 48}}>
          <TextInput
            onSubmitEditing={() => {this._lastname.focus()}}
            ref={(c) => this._firstname = c}
            onChangeText={(text) => {
              this.setState({
                firstname: text
              })
            }}
            style={{fontFamily: 'System', fontSize: 18, width: 148, height: '100%', borderRadius: 4, borderWidth: 1, marginRight: 4, paddingLeft: 10}}
            placeholder='First name'></TextInput>
          <TextInput
            onSubmitEditing={() => {this._id.focus()}}
            ref={(c) => this._lastname = c}
            onChangeText={(text) => {
              this.setState({
                lastname: text
              })
            }}
            style={{fontFamily: 'System', fontSize: 18, width: 148, height: '100%', borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
            placeholder='Last name'></TextInput>
        </View>
        <TextInput
          onSubmitEditing={() => {this._password.focus()}}
          ref={(c) => this._id = c}
          onChangeText={(text) => {
            this.setState({
              id: text
            })
          }}
          style={{marginBottom: 10, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          placeholder='Apple ID'></TextInput>
        <TextInput
          onSubmitEditing={() => {this._confirmpassword.focus()}}
          ref={(c) => this._password = c}
          onChangeText={(text) => {
            this.setState({
              password: text
            })
          }}
          style={{marginBottom: 10, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          secureTextEntry
          placeholder='Password'></TextInput>
        <TextInput
          ref={(c) => this._confirmpassword = c}
          onChangeText={(text) => {
            this.setState({
              confirm_password: text
            })
          }}
          style={{marginBottom: 20, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          secureTextEntry
          placeholder='Confirm Password'></TextInput>
        <TouchableWithoutFeedback
          onPress={this._onPressRegister.bind(this)}>
          <View
            style={{marginBottom: 20, backgroundColor: '#0066ff', alignItems: 'center', justifyContent: 'center', width: 300, height: 48, borderWidth: 1, borderRadius: 4, borderColor: '#1482d0'}}>
            <Text
              style={{fontFamily: 'System', fontSize: 18, color: 'white'}}>Register</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.props.navigation.navigate('SignIn')
          }}>
          <View>
            <Text
              style={{fontFamily: 'System', fontSize: 16, color: '#0066ff', textDecorationLine: 'underline'}}>I have Apple ID. Sign in now.</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}