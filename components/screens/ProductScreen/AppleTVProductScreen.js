import React, { Component } from 'react'
import { Animated, View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native'
import firebaseApp from '../../../config-firebase'

const listProduct = [
  {
    "name": 'Apple TV 4K',
    "image": require('./AppleTVScreens/AppleTVIcon/AppleTV4K-icon.jpg'),
    "screen": 'AppleTV4KScreen',
  },
  {
    "name": 'Apple TV (4th generation)',
    "image": require('./AppleTVScreens/AppleTVIcon/AppleTV-icon.jpg'),
    "screen": 'AppleTVScreen',
  },
]

const dvWidth = Dimensions.get('window').width
const barWidth = dvWidth - 40

export default class AppleTVProductScreen extends React.Component {
  
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
      listAppleTV: []
    }
  }

  componentDidMount()
  {
    this.readData()
  }

  readData()
  {
    var listAppleTV = [];
    firebaseApp.database().ref('shopapp/list_ProductType/Apple TV/product/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        listAppleTV.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        });
        this.setState({
          listAppleTV: listAppleTV,
        });
      });
    });
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/Apple TV/product/Apple TV (4th generation)/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/AppleTV%2FAppleTV-icon.jpg?alt=media&token=8109c19f-77b7-4880-b963-573c1e4b0ad8')
    firebaseApp.database().ref('shopapp/list_ProductType/Apple TV/product/Apple TV 4K/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/AppleTV%2FAppleTV4K-icon.jpg?alt=media&token=e968a8ce-535f-4248-a48c-0b19934e7059')
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
                  this.props.navigation.navigate('AppleTVScreen')
                }}>
                <View
                  style={{ width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                  <View
                    style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View
                      style={{ alignItems: 'center', marginTop: 30, flexDirection: 'row'}}>
                      <Image
                        style={{ width: 24, height: 24, tintColor: '#000'}}
                        source={require('../../../assets/icon-apple.png')}></Image>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                        tv
                      </Text>
                    </View>
                    <View
                      style={{ alignItems: 'center', flexDirection: 'column'}}>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                        Everything you watch.
                      </Text>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                        All in one place.
                      </Text>
                    </View>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: 280, height: 240}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }}
                      source={require('./AppleTVScreens/AppleTV/AppleTV.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate('AppleTV4KScreen')
                }}>
                <View
                  style={{ width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                  <View
                    style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View
                      style={{ alignItems: 'center', marginTop: 30, flexDirection: 'row'}}>
                      <Image
                        style={{ width: 24, height: 24, tintColor: '#000'}}
                        source={require('../../../assets/icon-apple.png')}></Image>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                        tv
                      </Text>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', fontWeight: '900', color: '#000', marginLeft: 2}}>
                        4K
                      </Text>
                    </View>
                    <View
                      style={{ alignItems: 'center', flexDirection: 'column'}}>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                        The 4K HDR era.
                      </Text>
                      <Text
                        style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                        Now playing.
                      </Text>
                    </View>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: 280, height: 240}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'stretch' }}
                      source={require('./AppleTVScreens/AppleTVIcon/AppleTV-icon.jpg')}>
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
              data={this.state.listAppleTV}
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
                      index === this.state.listAppleTV.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
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
