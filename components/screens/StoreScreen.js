import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Dimensions, TouchableHighlight, SectionList } from 'react-native';
import { SearchBar } from 'react-native-elements'
import firebaseApp from '../../config-firebase';

let dvWidth = Dimensions.get('window').width;

export default class StoreScreen extends Component {

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      list_Store: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      title: 'Viet Nam Store',
      tabBarLabel: 'Store'
    }
  };

  componentDidMount(){
    this.readData();
  }

  _onPressItem(item, section)
  {
    this.props.navigation.navigate("StoreDetail", {
      key_city: section.key,
      key_store: item.key,
      name: item.name,
      detail: item.detail
    });
  }

  readData()
  {
    var list_Store = []
    var list_temp = []
    firebaseApp.database().ref('shopapp/list_Store/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        var city_name = ""
        city_name = child.toJSON().name
        var key = ""
        key = child.key
        firebaseApp.database().ref('shopapp/list_Store/' + child.key + '/store/').once('value', (storeSnapshot) =>{
            storeSnapshot.forEach((childstore) => {
              list_temp.push({
                name: childstore.toJSON().name,
                location: childstore.toJSON().location,
                time: childstore.toJSON().time,
                detail: childstore.toJSON().detail,
                key: childstore.key
              })
            })
            list_Store.push({
              key: key,
              name: city_name,
              data: list_temp
            })
            list_temp = []
            this.setState({
              list_Store: list_Store,
          })
        })
      })
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <SectionList
          renderItem={({item, index, section}) => 
          <View
            style={{backgroundColor: '#fff'}}>
            <TouchableHighlight
              underlayColor="lightgray"
              onPress={this._onPressItem.bind(this, item, section)}>
              <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{width: 120, height: 100}}>
                    <Image
                      style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                      source={{uri: item.detail.image}}>
                    </Image>
                  </View>
                  <View
                    style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text style={{fontSize: 16, fontFamily: 'System', marginBottom: 10, maxWidth: 150}}>{item.name}</Text>
                    <Text style={{fontSize: 14, fontFamily: 'System', marginBottom: 4}}>{item.location}</Text>
                    <Text style={{fontSize: 14, fontFamily: 'System'}}>{item.time}</Text>
                  </View>
                </View>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../assets/icon-right.png')}>
                </Image>
              </View>
            </TouchableHighlight>
            {
              index === section.data.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
            }
          </View>
          }
          renderSectionHeader={({section: {name}}) => (
            <View
              style={{paddingTop: 20, paddingLeft: 20, width: dvWidth}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', fontFamily: 'System', paddingVertical: 8}}>{name.toUpperCase()}</Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          sections={this.state.list_Store}
          SectionSeparatorComponent={() => 
            <View style={{width: dvWidth, height: 0.5, backgroundColor: '#999'}}></View>
          }
          keyExtractor={(item, index) => item + index}
        />
      </SafeAreaView>
    );
  }
}