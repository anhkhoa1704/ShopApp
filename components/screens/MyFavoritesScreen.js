import React from 'react';
import { View, SafeAreaView, Image, TouchableWithoutFeedback, Text, FlatList, AsyncStorage, Dimensions, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout'
import firebaseApp from '../../config-firebase'

const dvWidth = Dimensions.get('window').width

export default class MyFavoritesScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return{
      tabBarVisible: false,
      headerTitle: 'My Favorites',
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              'Are you sure you want to remove all items?',
              '',
              [
                {text: 'Remove All', onPress: navigation.getParam('removeAllItems'), style: 'destructive'},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              ],
              { cancelable: false }
            )
          }}>
          <View>
            <Text
              style={{ fontFamily: 'System', fontSize: 16, marginRight: 10, color: 'blue' }}>Remove All</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
  };

  _removeAllItems = async () => {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'favorite').remove()
        }
      })
    }).then(() => {
      this._loadData()
    })
  }

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      favorite: [],
      activeRow: null,
      load: true
    }
  }

  componentDidMount()
  {
    this.props.navigation.setParams({ removeAllItems: this._removeAllItems })
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
            if (favorite.length == 0)
            {
              this.setState({
                load: false
              })
            }
            else
            {
              this.setState({
                load: true
              })
            }
            this.setState({
              favorite: favorite,
            })
          })
        }
      })
    })
  }

  async _notFavorite(item)
  {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/favorite/' + item.name).remove()
        }
      })
    }).then(() => {
      this._loadData()
    })
  }

  _renderList()
  {
    
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        {
          this.state.load == true ? 
          <FlatList
            data={this.state.favorite}
            renderItem={({item, index}) => {
            return(
              <View>
                <Swipeout
                  autoClose={true}
                  close={item.name !== this.state.activeRow}
                  onClose={(direction) => {
                    if (item.name === this.state.activeRow && typeof direction !== 'undefined')
                    {
                      this.setState({ activeRow: null });
                    }
                  }}
                  rowId={index}
                  sectionId={1}
                  right={
                    [
                      {
                        text: 'Delete',
                        backgroundColor: 'red',
                        onPress: this._notFavorite.bind(this, item)
                      }
                    ]
                  }>
                  <TouchableWithoutFeedback
                    onPressIn={() => {
                      this.setState({
                        activeRow: item.name
                      })
                      console.log(this.state.activeRow)
                    }}
                    onPress={() => {
                      console.log('Press')
                      this.props.navigation.navigate(item.screen)
                    }}>
                    <View
                      style={{flex: 1, paddingVertical: 20, backgroundColor: '#fff', paddingLeft: 20}}>
                      <View
                        style={{flexDirection: 'row',  alignItems: 'center'}}>
                        <View
                          style={{ width: 80, height: 80}}>
                          <Image
                            style={{ flex: 1, width: null, height: null, resizeMode: 'contain'}}
                            source={{uri: item.image}}></Image>
                        </View>
                        <View
                          style={{flexDirection: 'column', marginLeft: 20, width: 240}}>
                          <Text
                            style={{fontFamily: 'System', fontSize: 16, fontWeight: '600'}}>{item.name}</Text>
                          <Text
                            style={{fontFamily: 'System', fontSize: 14, marginTop: 8}}>From ${item.price}.00</Text>
                        </View> 
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Swipeout>
                <View
                  style={{height: 1, width: dvWidth, backgroundColor: '#999'}}></View>
              </View>
            )
          }}>
        </FlatList> : 
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
          <Text
            style={{fontFamily: 'System', fontSize: 28, fontWeight: '300', opacity: 0.7}}>Your favorite is empty</Text>
        </View>
        }
      </SafeAreaView>
    )
  }
}