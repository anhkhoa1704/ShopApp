import React, { Component } from 'react'
import { View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native'
import firebaseApp from '../../../config-firebase'

const listProduct = [
  {
    "name": 'iPod Touch',
    "image": require('./iPodTouchScreens/iPodTouchIcon/iPodTouch-icon.png'),
    "screen": 'iPodTouchScreen'
  },
  {
    "name": 'iPod Touch',
    "image": require('./iPodTouchScreens/iPodTouchIcon/iPodTouch-icon.png'),
    "screen": 'iPodTouchScreen'
  },
  {
    "name": 'iPod Touch',
    "image": require('./iPodTouchScreens/iPodTouchIcon/iPodTouch-icon.png'),
    "screen": 'iPodTouchScreen'
  }
]

const dvWidth = Dimensions.get('window').width
const barWidth = dvWidth - 20

export default class iPodTouchProductScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: params ? params.title : null,
    }
  };

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      listiPodTouch: []
    }
  }

  componentDidMount()
  {
    this.readData()
  }

  readData()
  {
    var listiPodTouch = [];
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        listiPodTouch.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        });
        this.setState({
          listiPodTouch: listiPodTouch,
        });
      });
    });
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-icon.png?alt=media&token=a9c0f227-7f71-4fd4-8817-79f8fb41a64f');
  }

  _onPressItem(item)
  {
    this.props.navigation.navigate(item.screen)
  }

  render() {
    return(
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('iPodTouchScreen')
              }}>
              <View
                style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: 'white'}}>
                <View
                  style={{marginTop: 20, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    style={{fontWeight: '500', fontSize: 32, fontFamily: 'System', color: 'black'}}>
                    iPod touch</Text>
                    <View
                      style={{marginVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{fontSize: 16, fontFamily: 'System', color: 'black'}}>
                        A8 chip, 8MP iSight camera,</Text>
                      <Text
                        style={{fontSize: 16, fontFamily: 'System', color: 'black'}}>
                        5 stunning colors</Text>
                    </View>
                    <Text
                      style={{fontSize: 16, fontFamily: 'System', color: 'blue'}}>
                      From $199</Text>
                </View>
                <Image
                  style={{ width: dvWidth, height: 250}}
                  source={require('../ProductScreen/iPodTouchScreens/iPodTouchIcon/iPodTouch-carousel.png')}>
                </Image>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{backgroundColor: '#fff', marginTop: 20}}>
            <FlatList
              data={this.state.listiPodTouch}
              renderItem={({item, index}) => {
                return(
                  <View>
                    <TouchableWithoutFeedback
                      onPress={this._onPressItem.bind(this, item)}>
                      <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image 
                            style={{width: 48, height: 48, resizeMode: 'contain'}}
                            source={{uri: item.image}}>
                          </Image>
                          <Text style={{marginLeft: 10, fontSize: 14, fontFamily: 'System'}}>{item.name}</Text>
                        </View>
                        <Image
                          style={{width: 16, height: 16}}
                          source={require('../../../assets/icon-right.png')}>
                        </Image>
                      </View>
                    </TouchableWithoutFeedback>
                    {
                      index === this.state.listiPodTouch.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
                    }
                  </View> 
                )
              }}>
            </FlatList>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
