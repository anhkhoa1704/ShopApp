import React, { Component } from 'react';
import { Text, View, SafeAreaView, FlatList, Image, Dimensions, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import firebaseApp from '../../config-firebase';

let widthDV = Dimensions.get('window').width;

export default class ProductTypeScreen extends React.Component {

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      list_ProductType: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Shop',
      headerRight: (
        <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Account")
              }}>
              <Image
                style={{ width: 25, height: 25,  marginRight: 10, tintColor: 'blue' }}
                borderRadius={12}
                source={require('../../assets/icon-profile.png')}>
              </Image>
        </TouchableWithoutFeedback>
      )
    }
  };

  componentDidMount(){
    this.readData();
  }

  readData()
  {
    var list_ProductType = []
    firebaseApp.database().ref('shopapp/list_ProductType/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        list_ProductType.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        })
        this.setState({
          list_ProductType: list_ProductType,
        })
      })
    })
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/Apple TV/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/ProductType%2FAppleTV.png?alt=media&token=8e576bd5-125c-4af2-bbff-e89c81847449')
    firebaseApp.database().ref('shopapp/list_ProductType/Apple Watch/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/ProductType%2FAppleWatch.png?alt=media&token=96cc0e8d-3fa6-4851-b8ad-1ac3f3a029fb')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/ProductType%2FMac.png?alt=media&token=b6a33d5f-3988-4018-b043-dbc0165aff88')
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/ProductType%2FiPad.png?alt=media&token=9200e39d-f87f-4e78-920b-16c761179bee')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/ProductType%2FiPhone.png?alt=media&token=172711a1-26cf-4006-9150-a4720cd8b14c')
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/ProductType%2FiPodTouch.png?alt=media&token=4d4e3c28-aa60-42c2-a41f-eddffa9483d9')
  }

  _onItemPress(item)
  {
    this.props.navigation.navigate(item.screen, {
      title: item.name,
    });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={this.state.list_ProductType}
          renderItem={({item, index}) => {
            return(
              <TouchableHighlight
                key={item.name}
                underlayColor={'lightgrey'}
                onPress={this._onItemPress.bind(this, item)}
                style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View style={{ width: widthDV, height: 170, flexDirection: 'row', alignItems: 'center' , margin: 20}}>
                    <View style={{width: 180, height: 180, marginRight: 20}}>
                      <Image
                        style={{flex: 1, width: null, height: null}}
                        source={{uri: item.image}}>
                      </Image>
                    </View>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>{item.name}</Text>
                  </View>
                  {
                    index === this.state.list_ProductType.length - 1 ? null : <View style={{width: '100%', height: 0.5, backgroundColor: '#999', marginLeft: 15}}></View>
                  }
                </View>
              </TouchableHighlight>
            );
          }}>
        </FlatList>
      </SafeAreaView>
    );
  }
}