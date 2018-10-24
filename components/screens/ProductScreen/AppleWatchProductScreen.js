import React from 'react'
import { Animated, View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, FlatList } from 'react-native'
import firebaseApp from '../../../config-firebase'

const dvWidth = Dimensions.get('window').width
const barWidth = dvWidth - 40

export default class AppleWatchProductScreen extends React.Component {
  
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
      listAppleWatch: []
    }
  }

  componentDidMount()
  {
    this.readData()
  }

  readData()
  {
    var listAppleWatch = [];
    firebaseApp.database().ref('shopapp/list_ProductType/Apple Watch/product/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        listAppleWatch.push({
          name: child.toJSON().name,
          image: child.toJSON().image,
          screen: child.toJSON().screen,
        });
        this.setState({
          listAppleWatch: listAppleWatch,
        });
      });
    });
  }

  writeData() {
    firebaseApp.database().ref('shopapp/list_ProductType/Apple Watch/product/Apple Watch Edition/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/AppleWatch%2FAppleWatchEdition-icon.jpg?alt=media&token=ccbc051c-16a8-4749-a4eb-78b7c9df93df')
    firebaseApp.database().ref('shopapp/list_ProductType/Apple Watch/product/Apple Watch Nike +/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/AppleWatch%2FAppleWatchNike%2B-icon.jpg?alt=media&token=c02994dd-0cff-4ce0-91b3-c99f0404aed2')
    firebaseApp.database().ref('shopapp/list_ProductType/Apple Watch/product/Apple Watch Series 1/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/AppleWatch%2FAppleWatchSeries1-icon.jpg?alt=media&token=c69c8f5b-4915-437e-a510-7fe24c82be96')
    firebaseApp.database().ref('shopapp/list_ProductType/Apple Watch/product/Apple Watch Series 3/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/AppleWatch%2FAppleWatchSeries3-icon.jpg?alt=media&token=c895ba35-4755-4e16-8335-708174fc8c31')
  }
  
  render() {
    const interpolateAnim = this.scrollAnim.interpolate({
      inputRange: [0, dvWidth * (3 - 1)],
      outputRange: [0, barWidth - barWidth/3]
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
                  alert('Apple Watch Series 3')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#eee'}}>
                  <View
                    style={{width: 157, height: 58, marginTop: 30}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./AppleWatchScreens/AppleWatchIcon/AppleWatchSeries3-logo.png')}>
                    </Image>
                  </View>
                  <Text
                    style={{fontSize: 16, marginTop: 10, fontFamily: 'System', color: 'blue'}}>Buy</Text>
                  <View
                    style={{width: dvWidth, height: 320}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./AppleWatchScreens/AppleWatchIcon/AppleWatchSeries3-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  alert('Apple Watch Series 1')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                  <View
                    style={{width: 104, height: 37, marginTop: 30}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./AppleWatchScreens/AppleWatchIcon/AppleWatchSeries1-logo.png')}>
                    </Image>
                  </View>
                  <Text
                    style={{fontSize: 16, marginTop: 10, fontFamily: 'System', color: 'blue'}}>Buy</Text>
                  <View
                    style={{width: dvWidth, height: 320}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./AppleWatchScreens/AppleWatchIcon/AppleWatchSeries1-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => {
                  alert('Apple Watch Nike+')
                }}>
                <View
                  style={{width: dvWidth, height: dvWidth * 8 / 7, flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff'}}>
                  <View
                    style={{width: 207, height: 43, marginTop: 30}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./AppleWatchScreens/AppleWatchIcon/AppleWatchNike+-logo.png')}>
                    </Image>
                  </View>
                  <Text
                    style={{fontSize: 16, marginTop: 10, fontFamily: 'System', color: 'blue'}}>Buy</Text>
                  <View
                    style={{width: dvWidth, height: 320, marginTop: 20}}>
                    <Image
                      style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }}
                      source={require('./AppleWatchScreens/AppleWatchIcon/AppleWatchNike+-carousel.jpg')}>
                    </Image>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
              <View
                style={{position: 'absolute', bottom: 20, width: barWidth, height: 2, backgroundColor: '#999', marginHorizontal: 20, overflow: 'hidden'}}>
                <Animated.View
                  style={{width: dvWidth / 3, height: 2, backgroundColor: '#333',
                  transform: [
                    { translateX: interpolateAnim },
                  ]}}>
                </Animated.View>
              </View>
          </View>
          <View
            style={{backgroundColor: '#fff', marginTop: 20}}>
            <FlatList
              data={this.state.listAppleWatch}
              renderItem={({item, index}) => {
                return(
                  <View>
                    <TouchableWithoutFeedback>
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
                      index === this.state.listAppleWatch.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
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
