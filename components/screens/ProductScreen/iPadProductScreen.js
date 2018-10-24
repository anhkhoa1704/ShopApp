import React, { Component } from 'react'
import { Animated, View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native'
import firebaseApp from '../../../config-firebase';

const listProduct = [
  {
    "name": 'iPad Pro',
    "image": require('./iPadScreens/iPadIcon/iPadPro-icon.jpg'),
    "screen": 'iPadProScreen',
  },
  {
    "name": 'iPad',
    "image": require('./iPadScreens/iPadIcon/iPad-icon.jpg'),
    "screen": 'iPadScreen',
  },
  {
    "name": 'iPad mini 4',
    "image": require('./iPadScreens/iPadIcon/iPadmini4-icon.jpg'),
    "screen": 'iPadmini4Screen',
  },
]

const dvWidth = Dimensions.get('window').width
const barWidth = dvWidth - 40

export default class iPadProductScreen extends React.Component {
  
  scrollAnim = new Animated.Value(0)

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
      listiPad: []
    }
  }

  componentDidMount()
  {
    this.readData()
  }

  readData()
  {
    var listiPad = [];
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        listiPad.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        });
        this.setState({
          listiPad: listiPad,
        });
      });
    });
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPad%2FiPad-icon.jpg?alt=media&token=3702a4d6-3bf7-46b8-930f-53d09faf7739')
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad Pro/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPad%2FiPadPro-icon.jpg?alt=media&token=cac8d69e-cd2b-4a96-bd4e-1d6440b920e7')
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad mini 4/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPad%2FiPadmini4-icon.jpg?alt=media&token=5b613dc2-30d8-4dce-80b9-8c8c427d4851')
  }

  _onPressItem(item)
  {
    this.props.navigation.navigate(item.screen)
  }

  render() {
    const interpolateAnim = this.scrollAnim.interpolate({
      inputRange: [0, dvWidth * (2 - 1)],
      outputRange: [0, barWidth - barWidth/2]
    })

    return(
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View>
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              onScroll={
                Animated.event(
                [{ nativeEvent: { contentOffset: { x: this.scrollAnim } } }]
              )}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('iPadScreen')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                      iPad
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      Like a computer.
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      Unlike any computer.
                    </Text>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: dvWidth, height: 280}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./iPadScreens/iPadIcon/iPad-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('iPadProScreen')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center',backgroundColor: '#fff'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                      iPad Pro
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      Anything you can do,
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      you can do better.
                    </Text>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: dvWidth, height: 280}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./iPadScreens/iPadIcon/iPadPro-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
              <View
                style={{position: 'absolute', bottom: 20, width: barWidth, height: 2, backgroundColor: '#999', marginHorizontal: 20, overflow: 'hidden'}}>
                <Animated.View
                  style={{width: dvWidth / 2, height: 2, backgroundColor: '#333',
                  transform: [
                    { translateX: interpolateAnim },
                  ]}}>
                </Animated.View>
              </View>
          </View>
          <View
            style={{backgroundColor: '#fff', marginTop: 20}}>
            <FlatList
              data={this.state.listiPad}
              renderItem={({item, index}) => {
                return(
                  <View>
                    <TouchableWithoutFeedback
                      onPress={this._onPressItem.bind(this, item)}>
                      <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View
                            style={{width: 48, height: 48}}>
                            <Image
                              style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                              source={{uri: item.image}}>
                            </Image>
                          </View>
                          <Text style={{marginLeft: 10, fontSize: 14, fontFamily: 'System'}}>{item.name}</Text>
                        </View>
                        <Image
                          style={{width: 16, height: 16}}
                          source={require('../../../assets/icon-right.png')}>
                        </Image>
                      </View>
                    </TouchableWithoutFeedback>
                    {
                      index === this.state.listiPad.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
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
