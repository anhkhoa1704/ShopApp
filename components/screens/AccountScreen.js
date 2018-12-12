import React from 'react';
import { Platform, View, SafeAreaView, ScrollView, Image, Dimensions, TouchableWithoutFeedback, Text, Alert, AsyncStorage, ImagePickerIOS } from 'react-native';
import firebaseApp from '../../config-firebase'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const dvWidth = Dimensions.get('window').width;
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class AccountScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      tabBarVisible: false,
      headerTitle: 'Account',
      headerLeft: null,
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack()
          }}>
          <View>
              <Text
              style={{ fontFamily: 'System', fontSize: 16, fontWeight: 'bold', marginRight: 10, color: 'blue' }}>Done</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  }

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      name: null,
      id: null,
      shortname: null,
      image: '',
      isloading: false
    }
  }

  uploadImage(uri, mime = 'image/jpg') {
    console.log("asdasd")
    return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      console.log(uploadUri)
      let uploadBlob = null
      const imageRef = firebaseApp.storage().ref('Avatar').child(`${this.state.id}-avatar`)
      fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then(async (url) => {
          console.log(url)
          var user = await AsyncStorage.getItem('@user:key')
          firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
            childSnapshot.forEach((child) => {
              if (child.val().id === user)
              {
                firebaseApp.database().ref('shopapp/list_User/' + child.key + '/image/').set(url)
              }
          })
          })
          resolve(url)
        })
        .catch((error) => {
          reject(error)
      })
    })
  }

  async loadData() {

    var user = await AsyncStorage.getItem('@user:key')
    console.log(user)

    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (child.val().id === user)
        {
          this.setState({
            name: child.val().firstname + ' ' + child.val().lastname,
            id: child.val().id,
            image: child.val().image,
            shortname: child.val().firstname[0] + child.val().lastname[0],
            isloading: true
          })
        }
      })
    })
  }

  componentDidMount()
  {
    this.loadData()
  }

  _signOut = async() => {
    try {
      Alert.alert(
        'Are you sure to sign out?',
        '',
        [
          {text: 'Sign out', onPress: async() => {
            this.props.navigation.navigate('SignIn')
            await AsyncStorage.removeItem('@user:key');
          }, style: 'destructive'},
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View
            style={{flex: 1, backgroundColor: '#eee'}}>
            <View
              style={{flexDirection: 'column', paddingLeft: 20, backgroundColor: '#fff'}}>
              <View
                style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 20}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    ImagePicker.showImagePicker(options, async (response) => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                      } else {
                        this.uploadImage(response.uri)
                        this.setState({
                          image: response.uri
                        })
                      }
                    });
                  }}>
                  <Image
                    style={{width: 80, height: 80, borderRadius: 40}}
                    source={this.state.image != '' ? {uri: this.state.image} : require('../../assets/icon-apple.png')}>
                  </Image>
                </TouchableWithoutFeedback>
                <View
                  style={{marginLeft: 10, flexDirection: 'column'}}>
                  <Text
                    style={{fontFamily: 'System', fontSize: 18, paddingVertical: 4}}>{this.state.name}</Text>
                  <Text
                    style={{fontFamily: 'System', fontSize: 16, color: 'blue', paddingVertical: 4}}>{this.state.id}</Text>
                </View>
              </View>
              <View style={{width: '100%', height: 0.5, backgroundColor: '#999'}}></View>
              <TouchableWithoutFeedback
                onPress={this._signOut.bind(this)}>
                <View style={{ width: dvWidth - 20, paddingVertical: 20, paddingRight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'System', fontSize: 16, color: 'blue'}}>Sign out</Text>
                  <Image
                    style={{width: 16, height: 16}}
                    source={require('../../assets/icon-right.png')}>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
              <View style={{width: '100%', height: 0.5, backgroundColor: '#999'}}></View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('Profile')
                }}>
                <View style={{ width: dvWidth - 20, paddingVertical: 20, paddingRight: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'System', fontSize: 16, color: 'blue'}}>My Profile</Text>
                  <Image
                    style={{width: 16, height: 16}}
                    source={require('../../assets/icon-right.png')}>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View
              style={{backgroundColor: '#fff', marginTop: 10, marginBottom: 70}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('MyFavorites')
                }}>
                <View style={{ width: dvWidth, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Text style={{fontFamily: 'System', fontSize: 18, fontWeight: 'bold'}}>My Favorites</Text>
                  <Image
                    style={{width: 16, height: 16}}
                    source={require('../../assets/icon-right.png')}>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
              <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('MyOrders')
                }}>
                <View style={{ width: dvWidth, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff'}}>
                  <Text style={{fontFamily: 'System', fontSize: 18, fontWeight: 'bold'}}>My Orders</Text>
                  <Image
                    style={{width: 16, height: 16}}
                    source={require('../../assets/icon-right.png')}>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
            </View> 
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}