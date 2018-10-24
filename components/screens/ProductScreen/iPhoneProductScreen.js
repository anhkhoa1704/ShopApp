import React from 'react'
import { Animated, View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native'
import firebaseApp from '../../../config-firebase';

const listProduct = [
  {
    "name": 'iPhone X',
    "image": require('./iPhoneScreens/iPhoneIcon/iPhoneX-icon.jpg'),
    "screen": 'iPhoneXScreen',
  },
  {
    "name": 'iPhone 8',
    "image": require('./iPhoneScreens/iPhoneIcon/iPhone8-icon.jpg'),
    "screen": 'iPhone8Screen',
  },
  {
    "name": 'iPhone 7',
    "image": require('./iPhoneScreens/iPhoneIcon/iPhone7-icon.jpg'),
    "screen": 'iPhone7Screen',
  },
  {
    "name": 'iPhone 6s',
    "image": require('./iPhoneScreens/iPhoneIcon/iPhone6s-icon.jpg'),
    "screen": 'iPhone6sScreen',
  },
  {
    "name": 'iPhone SE',
    "image": require('./iPhoneScreens/iPhoneIcon/iPhoneSE-icon.jpg'),
    "screen": 'iPhoneSEScreen',
  },  
]

const dvWidth = Dimensions.get('window').width
const barWidth = dvWidth - 40

export default class iPhoneProductScreen extends React.Component {
  
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
      listiPhone: []
    }
  }

  componentDidMount()
  {
    this.readData()
  }

  readData()
  {
    var listiPhone = [];
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        listiPhone.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        });
        this.setState({
          listiPhone: listiPhone,
        });
      });
    });
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone X/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhoneX-icon.jpg?alt=media&token=575098b3-4c38-43c8-9701-3b765d3cbb15')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 8/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone8-icon.jpg?alt=media&token=2b188c84-3102-40df-b5a0-1bf8161c9dd4')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 7/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone7-icon.jpg?alt=media&token=94105cb1-19c3-4e0e-aa5e-6b059c1583b5')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6s-icon.jpg?alt=media&token=6f3ae56b-7693-42da-a145-116f0359c15a')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone SE/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhoneSE-icon.jpg?alt=media&token=fa072c6d-81e1-4c4e-a87e-e28aa23e8c3e')
  }

  _onPressItem(item)
  {
    this.props.navigation.navigate(item.screen, {
      title: item.name,
    });
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
                  this.props.navigation.navigate('iPhoneXScreen')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontWeight: 'bold', fontFamily: 'System', textAlign: 'center', color: '#000'}}>
                      iPhone X
                    </Text>
                    <Text
                      style={{fontSize: 16, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{ width: dvWidth, height: 320 }}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain'}}
                      source={require('./iPhoneScreens/iPhoneIcon/iPhoneX-carousel.png')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('iPhone8Screen')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#AD0008'}}>
                  <View
                    style={{marginTop: 20, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <View
                      style={{borderRadius: 4, borderWidth: 1, borderColor: '#fff', paddingHorizontal: 4, paddingVertical: 2}}>
                      <Text
                        style={{fontSize: 14, fontFamily: 'System', textAlign: 'center', color: '#fff'}}>
                        Special Edition
                      </Text>
                    </View>
                    <View 
                      style={{flexDirection: 'row'}}>
                      <Text
                        style={{fontSize: 28, fontWeight: '600', fontFamily: 'System', textAlign: 'center', paddingTop: 20, color: '#fff'}}>
                        iPhone 8 (PRODUCT)
                      </Text>
                      <Text
                        style={{fontSize: 14, fontWeight: '600', fontFamily: 'System', lineHeight: 14, textAlign: 'center', paddingTop: 20, color: '#fff', letterSpacing: -1}}>
                        RED™
                      </Text>
                    </View>
                    <Text
                      style={{fontSize: 16, fontFamily: 'System', color: '#fff', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{ width: dvWidth, height: 320 }}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain'}}
                      source={require('./iPhoneScreens/iPhoneIcon/iPhone8-carousel.png')}>
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
              data={this.state.listiPhone}
              renderItem={({item, index}) => {
                return(
                  <View>
                    <TouchableWithoutFeedback
                      onPress={this._onPressItem.bind(this, item)}>
                      <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image 
                            style={{width: 64, height: 52, resizeMode: 'contain'}}
                            source={{uri: item.image}}>
                          </Image>
                          <Text
                            style={{marginLeft: 10, fontSize: 14, fontFamily: 'System'}}>{item.name}</Text>
                        </View>
                          <Image
                            style={{width: 16, height: 16}}
                            source={require('../../../assets/icon-right.png')}>
                          </Image>
                      </View>
                    </TouchableWithoutFeedback>
                    {
                      index === this.state.listiPhone.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
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
