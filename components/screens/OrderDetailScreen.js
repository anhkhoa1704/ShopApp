import React from 'react';
import { Dimensions, Text, View, Image, SafeAreaView, FlatList, AsyncStorage, ScrollView, Alert } from 'react-native';
import firebaseApp from '../../config-firebase'
import Swipeout from 'react-native-swipeout'
import { NavigationActions } from 'react-navigation'

const dvWidth = Dimensions.get('window').width;

export default class OrderDetailScreen extends React.Component {
  
  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      order_detail: [],
      total: 0,
      firstname: '',
      lastname: '',
      stressaddress: '',
      towncity: '',
      phone: '',
      emailaddress: '',
      state: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      headerTitle: 'Order Detail',
      tabBarVisible: false,
    }
  };
  
  componentDidMount()
  {
    this._loadData()
  }

  async _loadData()
  {
    const { params = {} } = this.props.navigation.state;
    var order_number = params ? params.order_number : ''
    var order_detail = []
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/firstname/').once('value', (firstname) => {
            this.setState({
              firstname: firstname.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/lastname/').once('value', (lastname) => {
            this.setState({
              lastname: lastname.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/stressaddress/').once('value', (stressaddress) => {
            this.setState({
              stressaddress: stressaddress.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/towncity/').once('value', (towncity) => {
            this.setState({
              towncity: towncity.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/phone/').once('value', (phone) => {
            this.setState({
              phone: phone.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/emailaddress/').once('value', (emailaddress) => {
            this.setState({
              emailaddress: emailaddress.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/state/').once('value', (state) => {
            this.setState({
              state: state.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/ordertotal/').once('value', (total) => {
            this.setState({
              total: total.val()
            })
          })
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/orderdetail/').once('value', (childSnapshotOrderDetail) => {
            childSnapshotOrderDetail.forEach((childOrderDetail) => {
              order_detail.push({
                key: childOrderDetail.key,
                image: childOrderDetail.toJSON().image,
                name: childOrderDetail.toJSON().name,
                price: childOrderDetail.toJSON().price,
                quantity: childOrderDetail.toJSON().quantity,
                singleprice: childOrderDetail.toJSON().singleprice
              });
            });
          }).then(() => {
            this.setState({
              order_detail: order_detail,
            });
          })
        }
      })
    }) 
  }

  async _OnPressDelete(item)
  {
    const { params = {} } = this.props.navigation.state;
    var order_number = params ? params.order_number : ''
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').on('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/orderdetail/' + item.key).remove()
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/orderdetail/').on('value', (childSnapshotForTotal) => {
            if (childSnapshotForTotal.val() != null)
            {
              var total = 0
              childSnapshotForTotal.forEach((childForTotal) => {
                total += parseInt(childForTotal.toJSON().price)
              })
              firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number + '/ordertotal').set(total)
            }
            else
            {
              firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/list_order/' + order_number).remove()
              this.props.navigation.goBack()
            }
          })
        }
      })
    })
    this._loadData()
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#F4F4F4'}}>
        <ScrollView>
          <FlatList
            data={this.state.order_detail}
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
                      onPress: () => {
                        Alert.alert(
                          'Are you sure you want to remove this item?',
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
                <View
                  style={{backgroundColor: '#fff', paddingTop: 10, paddingLeft: 20}}>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View
                      style={{flexDirection: 'row'}}>
                      <View
                        style={{width: 40, height: 40}}>
                        <Image
                          style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                          source={{uri: item.image}}>
                        </Image>
                      </View>
                      <View
                        style={{width: 140, marginLeft: 20}}>
                        <Text
                          style={{fontFamily: 'System', fontSize: 16, fontWeight: 'bold', color: '#000'}}>{item.name}</Text>
                      </View>
                    </View>
                    <Text
                        style={{fontFamily: 'System', fontSize: 16, color: '#000', marginRight: 20}}>${item.price}</Text>
                  </View>
                  <View
                    style={{marginLeft: 60, marginTop: 4, flexDirection: 'row'}}>
                    <Text
                      style={{fontFamily: 'System', fontSize: 14, color: '#000'}}>Quantity: {item.quantity} | </Text>
                    <Text
                      style={{fontFamily: 'System', fontSize: 14, color: '#000'}}>Item Price: ${item.singleprice}</Text>
                  </View>
                  <View style={{width: '100%', height: 0.5, backgroundColor: index == this.state.order_detail.length - 1 ? 'white' : '#999', marginTop: 10}}></View>
                </View>
              </Swipeout>
            )}}>
          </FlatList>
          <View
            style={{marginTop: 4, backgroundColor: 'white', flexDirection: 'row', paddingVertical: 8, paddingLeft: 20}}>
            <Text
              style={{fontFamily: 'System', fontSize: 16, width: 100, color: '#333'}}>Summary</Text>
            <View
              style={{flexDirection: 'column', paddingRight: 10, width: dvWidth - 130}}>
              <View
                style={{width: dvWidth - 140, height: 0.5, backgroundColor: '#999', marginVertical: 8}}></View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16}}>Order Total</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16}}>${this.state.total}.00</Text>
              </View>
            </View>
          </View>
          <View
            style={{marginTop: 4, backgroundColor: 'white'}}>
            <Text
              style={{marginLeft: 20, fontFamily: 'System', fontSize: 16, color: 'blue', marginVertical: 10}}>Shipping Address</Text>
            <View
              style={{borderColor: '#999', borderTopWidth: 0.5, borderBottomWidth: 0.5, paddingLeft: 20}}>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>First Name</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.firstname}</Text>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Last Name</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.lastname}</Text>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Stress Address</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.stressaddress}</Text>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Town/City</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.towncity}</Text>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>State</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.state}</Text>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Phone</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.phone}</Text>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Email Address</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}>{this.state.emailaddress}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}