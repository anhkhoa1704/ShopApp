import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Dimensions, FlatList, ScrollView, TouchableWithoutFeedback } from 'react-native';
import firebaseApp from '../../config-firebase';
import getDirections from 'react-native-google-maps-directions'

let dvWidth = Dimensions.get('window').width;

export default class StoreDetailScreen extends Component {

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      image: '',
      name: '',
      list_time: [],
      phone: '',
      address: '',
      destination_coordinate: {latitude: 0, longitude: 0},
      source_coordinate: {latitude: 0, longitude: 0}
    }
  }

  static navigationOptions = () => {
    return{
      title: 'Direction',
    }
  };

  componentDidMount(){
    this.readData()
  }

  readData()
  {
    const { navigation } = this.props;
    const detail = navigation.getParam('detail', null);
    const key_city = navigation.getParam('key_city', '');
    const key_store = navigation.getParam('key_store', '');
    this.setState({
      image: detail.image,
      name: navigation.getParam('name', ''),
      phone: detail.phone,
      address: detail.location.address,
      destination_coordinate: detail.location.coordinate,
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords)
        this.setState({
          source_coordinate: position.coords
        })
      },
      (error) => console.log(error),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

    var list_time = []
    firebaseApp.database().ref('shopapp/list_Store/' + key_city + '/store/' + key_store + '/detail/time/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        list_time.push({
          date: child.key,
          time: child.val()
        })
        this.setState({
          list_time: list_time
        })
      })
    })
  }

  onPressAddress()
  {
    var address = escape(this.state.address).split('%20').join('+');
    console.log(address)
    const data = {
      source: this.state.source_coordinate,
      destination: this.state.destination_coordinate,
      params: [
       {
         key: "travelmode",
         value: "driving"        // may be "walking", "bicycling" or "transit" as well
       },
       {
         key: "dir_action",
         value: "navigate"       // this instantly initializes navigation using the given travel mode 
       }
     ]
    }

    getDirections(data)
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <ScrollView>
          <Image
            style={{width: dvWidth, height: dvWidth * 1 / 2, resizeMode: 'cover'}}
            source={{uri: this.state.image}}>
          </Image>
          <View
            style={{paddingHorizontal: 20,  backgroundColor: '#fff'}}>
            <View
              style={{paddingVertical: 40}}>
              <Text
                style={{fontFamily: 'System', fontSize: 40, fontWeight: 'bold'}}>{this.state.name}</Text>
            </View>
            <View style={{width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
            <View
              style={{paddingVertical: 30}}>
              <FlatList
                scrollEnabled={false}
                data={this.state.list_time}
                renderItem={({item}) => {
                  return(
                    <View
                      style={{flexDirection: 'row'}}>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, minWidth: 100, paddingVertical: 2}}>{item.date}</Text>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, paddingVertical: 2}}>{item.time}</Text>
                    </View>
                  );
                }}>
              </FlatList>
            </View>
            <View style={{width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
            <View
              style={{paddingVertical: 30}}>
              <TouchableWithoutFeedback
                onPress={this.onPressAddress.bind(this)}>
                <View
                  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text
                    style={{fontFamily: 'System', fontSize: 16, maxWidth: 200}}>{this.state.address}</Text>
                  <Image
                    style={{width: 16, height: 16}}
                    source={require('../../assets/icon-right.png')}>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
            <View
              style={{paddingVertical: 30}}>
              <Text
                style={{fontFamily: 'System', fontSize: 16, color: 'blue'}}>{this.state.phone}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}