import React from 'react'
import { View, Image, Text, SafeAreaView, TouchableWithoutFeedback, FlatList, AsyncStorage, Dimensions, Alert } from 'react-native'
import firebaseApp from '../../config-firebase'
import Swipeout from 'react-native-swipeout'

const dvWidth = Dimensions.get('window').width

export default class MyOrdersScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      tabBarVisible: false,
      headerTitle: 'My Orders',
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => {
            Alert.alert(
              'Are you sure you want to remove all orders?',
              '',
              [
                {text: 'Remove All', onPress: navigation.getParam('removeAllOrders'), style: 'destructive'},
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

  _removeAllOrders = async () => {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'list_order').remove()
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
      order: [],
      activeRow: null,
      load: true
    }
  }

  componentDidMount()
  {
    this.props.navigation.setParams({ removeAllOrders: this._removeAllOrders })
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
    var order = []
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/').once('value', (childSnapshotOrder) => {
            childSnapshotOrder.forEach((childOrder) => {
              order.push({
                order_number: childOrder.key,
                date: childOrder.toJSON().date,
                order_state: childOrder.toJSON().orderstate
              });
            })
          }).then(() => {
            if (order.length == 0)
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
              order: order,
            });
          })
        }
      })
    })      
  }

  _onPressItem(item)
  {
    this.props.navigation.navigate('OrderDetail', {
      order_number: item.order_number
    })
  }

  async _OnPressDelete(item)
  {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + item.order_number).remove()
        }
      })
    }).then(() => {
      this._loadData()
    })
  }

  render() {
    return(
      <SafeAreaView style={{flex: 1}}>
        {
          this.state.load == true ? 
          <FlatList
            data={this.state.order}
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
                    style={{marginBottom: 20}}
                    right={
                      [
                        {
                          text: 'Delete',
                          backgroundColor: 'red',
                          onPress: () => {
                            Alert.alert(
                              'Are you sure you want to remove this order?',
                              '',
                              [
                                {text: 'Remove it', onPress: this._OnPressDelete.bind(this, item), style: 'destructive'},
                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              ],
                              { cancelable: false }
                            )
                          }  
                        }
                      ]
                    }>
                    <TouchableWithoutFeedback
                      onPress={this._onPressItem.bind(this, item)}>
                      <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white'}}>
                        <View style={{flexDirection: 'column'}}>
                          <View
                            style={{flexDirection: 'row', paddingVertical: 4}}>
                            <Text
                              style={{fontFamily: 'System', fontSize: 16, width: 120}}>Order number: </Text>
                            <Text
                              style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold'}}>{item.order_number}</Text>
                          </View>
                          <View
                            style={{flexDirection: 'row', paddingVertical: 4}}>
                            <Text
                              style={{fontFamily: 'System', fontSize: 16, width: 120}}>Order date: </Text>
                            <Text
                              style={{fontFamily: 'System', fontSize: 16, color: 'green'}}>{item.date}</Text>
                          </View>
                          <View
                            style={{flexDirection: 'row', paddingVertical: 4}}>
                            <Text
                              style={{fontFamily: 'System', fontSize: 16, width: 120}}>Order state: </Text>
                            <Text
                              style={{fontFamily: 'System', fontSize: 16, color: 'green'}}>{item.order_state}</Text>
                          </View>
                        </View>
                        <Image
                          style={{width: 16, height: 16}}
                          source={require('../../assets/icon-right.png')}>
                        </Image>
                      </View>
                    </TouchableWithoutFeedback>
                  </Swipeout>
                  {
                    index === this.state.order.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
                  }
                </View> 
              )
            }}>
          </FlatList> : 
           <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Text
              style={{fontFamily: 'System', fontSize: 28, fontWeight: '300', opacity: 0.7}}>You don't have any orders!</Text>
          </View>
        }
        
      </SafeAreaView>
    )
  }
}
