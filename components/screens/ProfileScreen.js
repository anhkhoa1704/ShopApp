import React from 'react';
import { SafeAreaView, TextInput, TouchableWithoutFeedback, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import firebaseApp from '../../config-firebase'

export default class ProfileScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false,
      headerTitle: 'Profile',
    }
  }

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      oldpassword: '',
      confirm_oldpassword: '',
      newpassword: '',
      confirm_newpassword: '',
    }
  }

  componentDidMount()
  {
    this.loadData()
  }

  _onPressChange()
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
    else if (this.state.oldpassword.includes(' '))
    {
      alert('Please enter Old password without space.')
      this._oldpassword.focus()
    }
    else if (this.state.oldpassword !== this.state.confirm_oldpassword)
    {
      alert('Old password is incorrect.')
      this._oldpassword.focus()
    }
    else if (this.state.newpassword === '')
    {
      alert('Please enter New password.')
      this._newpassword.focus()
    }
    else if (this.state.newpassword.includes(' '))
    {
      alert('Please enter New password without space.')
      this._newpassword.focus()
    }
    else if (this.state.newpassword !== this.state.confirm_newpassword)
    {
      alert('Confirm new password is incorrect.')
      this._confirmnewpassword.focus()
    }
    else
    {
      this._Change()
    }
  }

  async loadData() {

    var user = await AsyncStorage.getItem('@user:key')

    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (child.val().id === user)
        {
          this.setState({
            id: child.toJSON().id,
            firstname: child.toJSON().firstname,
            lastname: child.toJSON().lastname,
            confirm_oldpassword: child.toJSON().password
          })
        }
      })
    })
  }

  async _Change()
  {
    var user = await AsyncStorage.getItem('@user:key')

    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (child.val().id === user)
        {
          firebaseApp.database().ref('shopapp/list_User/' + child.key + '/firstname/').set(this.state.firstname)
          firebaseApp.database().ref('shopapp/list_User/' + child.key + '/lastname/').set(this.state.lastname)
          firebaseApp.database().ref('shopapp/list_User/' + child.key + '/password/').set(this.state.newpassword)
        }
      })
    }).then(() => {
      this.setState({
        confirm_oldpassword: this.state.newpassword
      })
    })

    alert('Change info successfully')
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
        <ImageBackground
          style={{width: '100%', height: 120, marginBottom: 40, justifyContent: 'center', alignItems: 'center'}}
          source={require('../../assets/apple-background-create.jpg')}>
          <Text
            style={{fontFamily: 'System', fontSize: 32, color: '#fff'}}>Your Apple ID</Text>
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
            placeholder='First name'
            value={this.state.firstname}></TextInput>
          <TextInput
            onSubmitEditing={() => {this._oldpassword.focus()}}
            ref={(c) => this._lastname = c}
            onChangeText={(text) => {
              this.setState({
                lastname: text
              })
            }}
            style={{fontFamily: 'System', fontSize: 18, width: 148, height: '100%', borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
            placeholder='Last name'
            value={this.state.lastname}></TextInput>
        </View>
        <TextInput
          onSubmitEditing={() => {this._newpassword.focus()}}
          ref={(c) => this._oldpassword = c}
          onChangeText={(text) => {
            this.setState({
              oldpassword: text
            })
          }}
          style={{marginBottom: 10, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          secureTextEntry
          placeholder='Old password'></TextInput>
        <TextInput
          onSubmitEditing={() => {this._confirmnewpassword.focus()}}
          ref={(c) => this._newpassword = c}
          onChangeText={(text) => {
            this.setState({
              newpassword: text
            })
          }}
          style={{marginBottom: 10, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          secureTextEntry
          placeholder='New password'></TextInput>
        <TextInput
          ref={(c) => this._confirmnewpassword = c}
          onChangeText={(text) => {
            this.setState({
              confirm_newpassword: text
            })
          }}
          style={{marginBottom: 20, fontFamily: 'System', fontSize: 18, width: 300, height: 48, borderRadius: 4, borderWidth: 1, paddingLeft: 10}}
          secureTextEntry
          placeholder='Confirm password'></TextInput>
        <TouchableWithoutFeedback
          onPress={this._onPressChange.bind(this)}>
          <View
            style={{marginBottom: 20, backgroundColor: '#0066ff', alignItems: 'center', justifyContent: 'center', width: 300, height: 48, borderWidth: 1, borderRadius: 4, borderColor: '#1482d0'}}>
            <Text
              style={{fontFamily: 'System', fontSize: 18, color: 'white'}}>Change</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
  }
}