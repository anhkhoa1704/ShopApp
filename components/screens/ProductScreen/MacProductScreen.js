import React from 'react'
import { Animated, View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native'
import firebaseApp from '../../../config-firebase';

const listProduct = [
  {
    "name": 'MacBook',
    "image": require('./MacScreens/MacIcon/Macbook-icon.png'),
    "screen": 'MacbookScreen',
  },
  {
    "name": 'MacBook Air',
    "image": require('./MacScreens/MacIcon/MacbookAir-icon.png'),
    "screen": 'MacbookAirScreen',
  },
  {
    "name": 'MacBook Pro',
    "image": require('./MacScreens/MacIcon/MacbookPro-icon.png'),
    "screen": 'MacbookProScreen',
  },
  {
    "name": 'iMac',
    "image": require('./MacScreens/MacIcon/iMac-icon.png'),
    "screen": 'iMacscreen',
  },
  {
    "name": 'iMac Pro',
    "image": require('./MacScreens/MacIcon/iMacPro-icon.png'),
    "screen": 'iMacProScreen',
  },
  {
    "name": 'Mac Pro',
    "image": require('./MacScreens/MacIcon/MacPro-icon.png'),
    "screen": 'MacProScreen',
  },
  {
    "name": 'Mac mini',
    "image": require('./MacScreens/MacIcon/Macmini-icon.png'),
    "screen": 'MacminiScreen',
  },
]

const dvWidth = Dimensions.get('window').width
const barWidth = dvWidth - 40

export default class MacProductScreen extends React.Component {
  
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
      listMac: []
    }
  }

  componentDidMount()
  {
    this.readData()
  }

  readData()
  {
    var listMac = [];
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        listMac.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        });
        this.setState({
          listMac: listMac,
        });
      });
    });
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/Mac Pro/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FMacPro-icon.png?alt=media&token=6bc70c2f-e0f6-4625-b104-c9b5e6358241')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/Mac mini/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FMacmini-icon.png?alt=media&token=9d813972-fc4e-4052-adf0-189d09eeaae7')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/MacBook/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FMacbook-icon.png?alt=media&token=399960be-7240-4406-901e-1673271d30a5')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/MacBook Air/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FMacbookAir-icon.png?alt=media&token=8a210dcb-394f-4012-91b3-c840b7979a4b')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/MacBook Pro/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FMacbookPro-icon.png?alt=media&token=bf5b6f54-22ee-471c-9255-df70d4017bf5')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/iMac/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FiMac-icon.png?alt=media&token=2d5b84bb-43da-4a9f-a577-7e939fc83808')
    firebaseApp.database().ref('shopapp/list_ProductType/Mac/product/iMac Pro/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/Mac%2FiMacPro-icon.png?alt=media&token=3888ca10-c713-42bc-b21b-3811d56810f2')
  }

  render() {
    const interpolateAnim = this.scrollAnim.interpolate({
      inputRange: [0, dvWidth * 3],
      outputRange: [0, barWidth - barWidth/4]
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
                  alert('iMac Pro')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#1a1a1a'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontFamily: 'System', color: '#fff', fontWeight: 'bold'}}>
                      iMac Pro
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#fff'}}>
                      Power to the pro.
                    </Text>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: 280, height: 240}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./MacScreens/MacIcon/iMacPro-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  alert('iMac')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fafafa'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                      iMac
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      The vision is brighter than ever.
                    </Text>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: 280, height: 240}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./MacScreens/MacIcon/iMac-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  alert('Macbook Pro')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fafafa'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                      MacBook Pro
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      A touch of genius.
                    </Text>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: 375, height: 280}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./MacScreens/MacIcon/MacbookPro-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  alert('Macbook')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fafafa'}}>
                  <View
                    style={{ flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text
                      style={{fontSize: 28, fontFamily: 'System', color: '#000', fontWeight: 'bold'}}>
                      MacBook
                    </Text>
                    <Text
                      style={{fontSize: 24, fontFamily: 'System', color: '#000'}}>
                      Light. Years ahead.
                    </Text>
                    <Text
                      style={{fontSize: 20, fontFamily: 'System', color: 'blue', marginTop: 10}}>Buy</Text>
                  </View>
                  <View
                    style={{width: 375, height: 280}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./MacScreens/MacIcon/Macbook-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
              <View
                style={{position: 'absolute', bottom: 20, width: barWidth, height: 2, backgroundColor: '#999', marginHorizontal: 20, overflow: 'hidden'}}>
                <Animated.View
                  style={{width: dvWidth / 4, height: 2, backgroundColor: '#333',
                  transform: [
                    { translateX: interpolateAnim },
                  ]}}>
                </Animated.View>
              </View>
          </View>
          <View
            style={{backgroundColor: '#fff', marginTop: 20}}>
            <FlatList
              data={this.state.listMac}
              renderItem={({item, index}) => {
                return(
                  <View>
                    <TouchableWithoutFeedback>
                      <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image 
                            style={{width: 64, height: 50, resizeMode: 'contain'}}
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
                      index === this.state.listMac.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
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
