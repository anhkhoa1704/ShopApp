import React from 'react';
import { Dimensions, Text, View, Image, SafeAreaView, FlatList, TouchableWithoutFeedback, TextInput, AsyncStorage } from 'react-native';
import Swipeout from 'react-native-swipeout'
import firebaseApp from '../../config-firebase'

const dvWidth = Dimensions.get('window').width;

export default class BagScreen extends React.Component {
  
  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      list_Bag: [],
      subTotal: 0,
      activeRow: null,
      quantity: 0,
    }
  }

  static navigationOptions = ({ navigation }) => {

    return{
      title: 'Bag',
      headerRight: (
        <TouchableWithoutFeedback
          onPress={navigation.getParam('navigateToCheckOut')}>
          <View
            style={{backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', borderRadius: 4, marginRight: 10}}>
            <Text
              style={{color: '#fff', padding: 4, fontFamily: 'System', fontSize: 16}}>Check Out</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    }
  };

  _navigateToCheckOut = () => {
    if (this.state.list_Bag.length > 0)
    {
      this.props.navigation.navigate('CheckOut', {
        list_Bag: this.state.list_Bag,
        subTotal: this.state.subTotal,
      })
    }
    else
    {
      alert('No items for check out')
      this.props.navigation.navigate('Shop')
    }
  }
  
  componentDidMount()
  {
    this.props.navigation.setParams({ navigateToCheckOut: this._navigateToCheckOut })
    this.didFocusListener = this.props.navigation.addListener(
      'didFocus',
      () => { this.readData() },
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  async readData()
  {
    var list_Bag = [];
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').once('value', (childSnapshotBagDetail) => {
            if(childSnapshotBagDetail.val() != null)
            {
              childSnapshotBagDetail.forEach((childBag) => {
                list_Bag.push({
                  name: childBag.toJSON().name,
                  image: childBag.toJSON().image,
                  quantity: childBag.toJSON().quantity,
                  price: childBag.toJSON().price,
                  singleprice: childBag.toJSON().singleprice
                });
                this.setState({
                  list_Bag: list_Bag,
                });
              });
            }
            else
            {
              this.setState({
                list_Bag: [],
              });
            }
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/').once('value', (snapShot) => {
            if (snapShot.val())
            {
              this.setState({
                subTotal: parseInt(snapShot.toJSON().subtotal)
              })
            }
          })
        }
      })
    })
  }

  async _onEndEditingItemQuantity(item)
  {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').once('value', (childSnapshotBagDetail) => {
            childSnapshotBagDetail.forEach((childBag) => {
              if (item.name === childBag.toJSON().name)
              {
                var keyProduct = childBag.key
                firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/' + keyProduct + '/quantity').set(this.state.quantity)
                firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/' + keyProduct + '/price').set(this.state.quantity * parseInt(item.singleprice))
                firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').on('value', (childSnapshotForSubtotal) => {
                  var subtotal = 0
                  childSnapshotForSubtotal.forEach((childForSubtotal) => {
                    subtotal += parseInt(childForSubtotal.toJSON().price)
                  })
                  firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/subtotal').set(subtotal)
                })
              }
            });
          })
        }
      })
    }).then(() => {
      this.readData()
    })
  }

  async _onPressItem(name)
  {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').on('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').once('value', (childSnapshotBagDetail) => {
            childSnapshotBagDetail.forEach((childBag) => {
              if (name === childBag.toJSON().name)
              {
                var keyProduct = childBag.key
                firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/' + keyProduct).remove()
              }
            });
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').on('value', (childSnapshotForSubtotal) => {
            var subtotal = 0
            childSnapshotForSubtotal.forEach((childForSubtotal) => {
              subtotal += parseInt(childForSubtotal.toJSON().price)
            })
            firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/subtotal').set(subtotal)
          })
        }
      })
    })
    this.readData()
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#F4F4F4'}}>
        <FlatList
          style={{marginBottom: 72}}
          data={this.state.list_Bag}
          renderItem={({item, index}) => {
            return(
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
                      onPress: this._onPressItem.bind(this, item.name)
                    }
                  ]
                }>
                <TouchableWithoutFeedback
                  onPressIn={() => {
                    this.setState({
                      activeRow: item.name
                    })
                    console.log(this.state.activeRow)
                  }}>
                  <View
                    style={{backgroundColor: '#fff', paddingVertical: 20, paddingLeft: 20}}>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                      <View
                        style={{flexDirection: 'row'}}>
                        <View
                          style={{width: 50, height: 50}}>
                          <Image
                            style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                            source={{uri: item.image}}>
                          </Image>
                        </View>
                        <View
                          style={{width: 150, marginLeft: 10}}>
                          <Text
                            style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold', color: '#000'}}>{item.name}</Text>
                        </View>
                      </View>
                      <View
                        style={{flexDirection: 'row'}}>
                        <TextInput
                          onChangeText={(text) => this.setState({quantity: parseInt(text)})}
                          onEndEditing={this._onEndEditingItemQuantity.bind(this, item)}
                          style={{fontFamily: 'System', fontSize: 16, color: '#000', textAlign: 'right', borderColor: '#ddd', borderRadius: 4, borderWidth: 0.5, marginRight: 10, height: 24, width: 48, padding: 4}}
                          value={item.quantity.toString()}
                          editable={true}
                          maxLength={3}
                          keyboardType='numeric'
                          returnKeyType='done'/>
                      <Text
                          style={{fontFamily: 'System', fontSize: 16, color: '#000', marginRight: 20}}>${item.price}</Text>
                      </View>
                    </View>
                    <View
                      style={{paddingLeft: 60, marginTop: 10}}>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, color: '#000', paddingVertical: 4}}>Item Price: ${item.singleprice}</Text>
                    </View>
                    <View
                      style={{ flexDirection: 'column', paddingLeft: 60, marginTop: 10}}>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, color: '#000', paddingVertical: 4}}>Delivery:</Text>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, color: '#999', paddingVertical: 4}}>In stock</Text>
                    </View>
                    <View style={{width: '100%', height: 0.5, backgroundColor: '#999', marginTop: 20}}></View>
                  </View>
                </TouchableWithoutFeedback>
              </Swipeout>      
            ) 
          }}>
        </FlatList>
        <View
          style={{position: 'absolute', bottom: 0, backgroundColor: '#F2EFF7', paddingVertical: 8, paddingHorizontal: 20, width: dvWidth, borderTopWidth: 0.5, borderTopColor: '#999'}}>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4}}>
            <Text
              style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold'}}>Subtotal</Text>
            <Text
              style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold'}}>${this.state.subTotal}</Text>
          </View>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4}}>
            <Text
              style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold'}}>Shipping</Text>
            <Text
              style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold'}}>FREE</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}