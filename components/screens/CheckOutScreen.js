import React from 'react';
import { Dimensions, Text, View, Image, SafeAreaView, FlatList, TouchableWithoutFeedback, TextInput, AsyncStorage, ScrollView } from 'react-native';
import firebaseApp from '../../config-firebase'
import { NavigationActions } from 'react-navigation'

const dvWidth = Dimensions.get('window').width;

export default class CheckOutScreen extends React.Component {
  
  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      list_Bag: [],
      subTotal: 0,
      firstname: '',
      lastname: '',
      stressaddress: '',
      towncity: '',
      phone: '',
      emailaddress: '',
      state: '',
      date: new Date().toLocaleDateString()
    }
  }

  static navigationOptions = ({ navigation }) => {
    return{
      headerTitle: 'Check Out',
      headerRight: (
        <TouchableWithoutFeedback
          onPress={navigation.getParam('placeOrder')}>
          <View
            style={{backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', borderRadius: 4, marginRight: 10}}>
            <Text
              style={{color: '#fff', padding: 4, fontFamily: 'System', fontSize: 16}}>Place Order</Text>
          </View>
        </TouchableWithoutFeedback>
      ),
    }
  };

  _placeOrder = async () => {
    const user = await AsyncStorage.getItem('@user:key')

    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'list_order/').push().set({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            stressaddress: this.state.stressaddress,
            towncity: this.state.towncity,
            state: this.state.state,
            phone: this.state.phone,
            emailaddress: this.state.emailaddress,
            ordertotal: this.state.subTotal,
            orderdetail: this.state.list_Order,
            date: this.state.date,
            orderstate: 'In stock'
          }).then(() => {
            firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/').remove()
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'BagHome'})
              ]
            })
            this.props.navigation.dispatch(resetAction)
            this.props.navigation.navigate('MyOrders')
          })
        }
      })
    })
    alert('Placed Order')
    this.props.navigation.navigate('Order')
  }
  
  componentDidMount()
  {
    this.props.navigation.setParams({ placeOrder: this._placeOrder })
    this._loadData()
  }

  _loadData()
  {
    const { params = {} } = this.props.navigation.state;
    this.setState({
      list_Order: params ? params.list_Bag : null,
      subTotal: params ? params.subTotal : 0
    })
  }

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#F4F4F4'}}>
        <ScrollView>
          <FlatList
            data={this.state.list_Order}
            renderItem={({item, index}) => {
              return(
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
                <View style={{width: '100%', height: 0.5, backgroundColor: index == this.state.list_Order.length - 1 ? 'white' : '#999', marginTop: 10}}></View>
              </View> 
            )}}>
          </FlatList>
          <View
            style={{marginTop: 4, backgroundColor: 'white', flexDirection: 'row', paddingVertical: 8, paddingLeft: 20}}>
            <Text
              style={{fontFamily: 'System', fontSize: 16, width: 100, color: '#333'}}>Summary</Text>
            <View
              style={{flexDirection: 'column', paddingRight: 10, width: dvWidth - 130}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16}}>Bag Subtotal</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, marginRight: 0}}>${this.state.subTotal}.00</Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 4}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, color: 'orange'}}>Free Shipping</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, color: 'orange'}}>$0.00</Text>
              </View>
              <View
                style={{width: dvWidth - 140, height: 0.5, backgroundColor: '#999', marginVertical: 8}}></View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16}}>Order Total</Text>
                <Text
                  style={{fontFamily: 'System', fontSize: 16}}>${this.state.subTotal}.00</Text>
              </View>
            </View>
          </View>
          <View
            style={{marginTop: 4, backgroundColor: 'white', marginBottom: 180}}>
            <Text
              style={{marginLeft: 20, fontFamily: 'System', fontSize: 16, color: 'blue', marginVertical: 10}}>Shipping Address</Text>
            <View
              style={{borderColor: '#999', borderTopWidth: 0.5, borderBottomWidth: 0.5, paddingLeft: 20}}>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>First Name</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      firstname: text
                    })
                  }}
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Last Name</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      lastname: text
                    })
                  }}
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Stress Address</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      stressaddress: text
                    })
                  }}
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Town/City</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      towncity: text
                    })
                  }}
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>State</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      state: text
                    })
                  }}
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Phone</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      phone: text
                    })
                  }}
                  keyboardType='phone-pad'
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
              <View
                style={{height: 0.5, width: dvWidth - 20, backgroundColor: '#999'}}></View>
              <View
                style={{paddingVertical: 8, flexDirection: 'row'}}>
                <Text
                  style={{fontFamily: 'System', fontSize: 16, width: 140}}>Email Address</Text>
                <TextInput
                  onChangeText={(text) => {
                    this.setState({
                      emailaddress: text
                    })
                  }}
                  keyboardType='email-address'
                  style={{fontFamily: 'System', fontSize: 16, width: 205, color: 'blue'}}
                  placeholder='Required'
                  placeholderTextColor='#999'>
                </TextInput>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}