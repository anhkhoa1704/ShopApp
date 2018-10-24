import React from 'react';
import { View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, TouchableWithoutFeedback, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import firebaseApp from '../../config-firebase'

const dvWidth = Dimensions.get('window').width;

export default class DiscoverScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      gesturesEnabled: false,
      title: 'Discover',
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => {navigation.navigate("Account")}}>
          <Image
            style={{ width: 25, height: 25,  marginRight: 10, tintColor: 'blue' }}
            borderRadius={12}
            source={require('../../assets/icon-profile.png')}>
          </Image>
        </TouchableWithoutFeedback>
      )
    }
  };

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      offset: 0,
      currentIndex: 0,
      item_name: '',
      favorite: []
    }
  }

  componentWillMount()
  {
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this._loadData() },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  async _loadData()
  {
    var favorite = []
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'favorite/').once('value', (childSnapshotFavoriteDetail) => {
            childSnapshotFavoriteDetail.forEach((detail) => {
              favorite.push({
                name: detail.key,
                image: detail.toJSON().image,
                price: detail.toJSON().price,
                screen: detail.toJSON().screen
              })
            })
          }).then(() => {
            this.setState({
              favorite: favorite
            })
          })
        }
      })
    })
  }

  async _notFavorite(item)
  {
    this.setState({
      item_name: item.name
    })
    
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          this.state.favorite.splice(this.state.favorite.indexOf(item.name), 1);
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/favorite/' + item.name).remove()
        }
      })
    })
    this._loadData()
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate('iPhoneXScreen')
            }}>
            <View
              style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#FEFFFF'}}>
              <View
                style={{marginVertical: 40, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 32, fontWeight: 'bold', fontFamily: 'System', textAlign: 'center', padding: 5, color: '#000'}}>
                  iPhone X
                </Text>
                <Text
                  style={{padding: 10, fontSize: 16, fontFamily: 'System', color: 'blue'}}>Buy</Text>
              </View>
              <View
                style={{width: dvWidth, height: dvWidth * (2 / 3)}}>
                <Image
                  style={{flex: 1, width: null, height: null}}
                  source={require('../../assets/discover-iPhoneX.jpg')}>
                </Image>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate('iPhone8Screen')
            }}>
            <View
              style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#AD0008'}}>
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
                  style={{padding: 10, fontSize: 16, fontFamily: 'System', color: '#fff'}}>Buy</Text>
              </View>
              <Image
                source={require('../../assets/discover-iPhone8.jpg')}>
              </Image>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{paddingVertical: 20, flexDirection: 'row', backgroundColor: '#fff'}}>
            <Image
              style={{width: 50, height: 50, marginHorizontal: 20}}
              source={require('../../assets/delivery.png')}>
            </Image>
            <View
              style={{flexDirection: 'column'}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'System', paddingVertical: 4}}>Free delivery</Text>
              <Text
                style={{fontSize: 14, fontFamily: 'System'}}>Get free delivery direct to your door.</Text>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.navigate('iPadScreen')
            }}>
            <View
              style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5'}}>
              <View
                style={{marginTop: 40, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  <Text
                    style={{fontSize: 32, fontWeight: 'bold', fontFamily: 'System', textAlign: 'center', padding: 5, color: '#000'}}>
                    iPad
                  </Text>
                  <Text
                    style={{fontSize: 28, fontWeight: '400', fontFamily: 'System', textAlign: 'center', color: '#000'}}>
                    Like a computer.
                  </Text>
                  <Text
                    style={{fontSize: 28, fontWeight: '400', fontFamily: 'System', textAlign: 'center', color: '#000'}}>
                    Unlike any
                  </Text>
                  <Text
                    style={{fontSize: 28, fontWeight: '400', fontFamily: 'System', textAlign: 'center', color: '#000'}}>
                    computer.
                  </Text>
                <Text
                  style={{padding: 10, fontSize: 16, fontFamily: 'System', color: 'blue'}}>Buy</Text>
              </View>
              <View
                style={{width: dvWidth, height: dvWidth/1.5, marginTop: 20}}>
                <Image
                  style={{flex: 1, width: null, height: null}}
                  source={require('../../assets/discover-iPad.jpg')}>
                </Image>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {alert("Apple Watch Series 3")}}>
            <View
              style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#EEE'}}>
              <View 
                style={{marginTop: 40, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <View
                  style={{flexDirection: 'row'}}>
                    <Icon
                      name='apple'
                      type='font-awesome'
                      size={32}></Icon>
                    <Text
                      style={{marginLeft: 4,fontSize: 32, fontWeight: 'bold', fontFamily: 'System', textAlign: 'center', color: '#000'}}>
                      Watch
                    </Text>
                </View>
              </View>
              <Text
                  style={{color: 'red', fontFamily: 'System', fontSize: 14}}>SERIES 3</Text>
              <Text
                  style={{fontFamily: 'System', fontSize: 32, paddingVertical: 4}}>The freedom of cellular.</Text>
              <Text
                  style={{padding: 6, fontSize: 16, fontFamily: 'System', color: 'blue'}}>Buy</Text>
              <View
                style={{width: dvWidth, height: dvWidth, marginTop: 20}}>
                <Image
                  style={{flex: 1, width: null, height: null}}
                  source={require('../../assets/discover-Watch.jpg')}>
                </Image>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{paddingVertical: 20, flexDirection: 'row', backgroundColor: '#fff'}}>
            <Image
              style={{width: 50, height: 50, marginHorizontal: 20}}
              source={require('../../assets/return.png')}>
            </Image>
            <View
              style={{flexDirection: 'column'}}>
              <Text
                style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'System', paddingVertical: 4}}>Free and easy returns</Text>
              <Text
                style={{fontSize: 14, fontFamily: 'System'}}>Return orders for free from your Account.</Text>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {alert("Macbook Pro")}}>
            <View
              style={{flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#FAFAFA'}}>
              <View
                style={{marginTop: 20, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 32, fontWeight: 'bold', fontFamily: 'System', textAlign: 'center', padding: 5, color: '#000'}}>
                  Macbook Pro
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'System', textAlign: 'center', padding: 5, color: '#000'}}>
                  A touch of genius.
                </Text>
                <Text
                  style={{padding: 10, fontSize: 16, fontFamily: 'System', color: 'blue'}}>Buy</Text>
              </View>
              <View
                style={{width: dvWidth, height: dvWidth}}>
                <Image
                  style={{flex: 1, width: null, height: null}}
                  source={require('../../assets/discover-MacbookPro.jpg')}>
                </Image>
              </View>
            </View>
          </TouchableWithoutFeedback>
          {
            this.state.favorite.length > 0 ? 
            <View
              style={{paddingTop: 20}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginLeft: 20, marginRight: 20}}>
                <Text
                  style={{width: 220, fontFamily: 'System', fontSize: 28, fontWeight: 'bold'}}>Give your Favorite another look.</Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log("See all")
                    this.props.navigation.navigate('MyFavorites')
                  }}>
                  <View>
                    <Text
                      style={{fontFamily: 'System', fontSize: 16, color: 'blue', fontWeight: '200'}}>See All</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={{marginVertical: 20}}
                data={this.state.favorite}
                contentContainerStyle={{paddingHorizontal: 20}}
                horizontal
                ref={(list) => this.list_Favorite = list}
                onScrollBeginDrag={(event) => {
                  this.setState({
                    offset: event.nativeEvent.contentOffset.x
                  })
                }} 
                onScrollEndDrag={(event) => {
                  var currentOffset = event.nativeEvent.contentOffset.x            
                  if (currentOffset > this.state.offset)
                  {
                    var currentIndex = this.state.currentIndex + 1
                    if (currentIndex < this.state.favorite.length)
                    {
                      this.list_Favorite.scrollToOffset({
                        offset: currentIndex * (dvWidth - 30),
                        animated: true
                      })
                      this.setState({
                        currentIndex: currentIndex
                      })
                    }
                    else{
                      this.list_Favorite.scrollToOffset({
                        offset: (currentIndex - 1) * (dvWidth - 30),
                        animated: true
                      })
                    }            
                  }
                  else if (currentOffset < this.state.offset)
                  {
                    var currentIndex = this.state.currentIndex - 1
                    if (currentIndex >= 0)
                    {
                      this.list_Favorite.scrollToOffset({
                        offset: currentIndex * (dvWidth - 30),
                        animated: true
                      })
                      this.setState({
                        currentIndex: currentIndex
                      })
                    }
                    else{
                      this.list_Favorite.scrollToOffset({
                        offset: 0,
                        animated: true
                      })
                    }
                  }
                }}
                renderItem={({item}) => {
                  return(
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.props.navigation.navigate(item.screen)
                      }}>
                      <View
                        style={{ width: dvWidth - 40, marginRight: 10, height: 500, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 10}}>
                        <TouchableWithoutFeedback
                          onPress={this._notFavorite.bind(this, item)}>
                          <View
                            style={{width: 25, height: 25, top: 20, right: 20, position: 'absolute'}}
                            borderRadius={12}>
                            <Image
                              style={{ flex: 1, width: null, height: null, resizeMode: 'contain', tintColor: 'blue'}}
                              source={ item.name == this.state.item_name ? require('../../assets/icon-favorite.png') : require('../../assets/icon-favorite-filled.png')}>
                            </Image>
                          </View>
                        </TouchableWithoutFeedback>
                        <View
                          style={{width: 200, height: 200}}>
                          <Image
                            style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                            source={{uri: item.image}}></Image>
                        </View>
                        <View
                          style={{marginTop: 60, alignItems: 'center'}}>
                          <Text
                            style={{fontFamily: 'System', fontSize: 16, fontWeight: '400'}}>{item.name}</Text>
                          <Text
                            style={{fontFamily: 'System', fontSize: 14, fontWeight: '400', marginTop: 8}}>From ${item.price}.00</Text>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  )
                }}
              /> 
            </View> : null
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}