import React from 'react'
import { View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, AsyncStorage, FlatList } from 'react-native'
import firebaseApp from '../../../../config-firebase'

const dvWidth = Dimensions.get('window').width

export default class iPadScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: params ? params.title : null,
      headerRight: (
      <TouchableWithoutFeedback
        onPress={navigation.getParam('setFavorite')}>
        <Image
          style={{ width: 25, height: 25,  marginRight: 10, tintColor: 'blue' }}
          borderRadius={12}
          source={ params.favorite ? require('../../../../assets/icon-favorite-filled.png') : require('../../../../assets/icon-favorite.png')}>
        </Image>
      </TouchableWithoutFeedback>
    )}
  };

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      list_Finish: [],
      list_Storage: [],
      list_Connectivity: [],
      colour: '',
      storage: '',
      connectivity: '',
      image: '',
      fromprice: 0,
      storageprice: 0,
      connectivityprice: 0,
      totalprice: 0,
      name: '',
      favorite: false,
      product_name: '',
      product_price: 0,
      product_screen: '',
      product_image: ''
    }
  }

  componentDidMount()
  {
    this.props.navigation.setParams({ setFavorite: this._setFavorite })
    this._loadData()
    this._isFavorite()
  }
  
  async _isFavorite()
  {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'favorite/').once('value', (childSnapshotFavoriteDetail) => {
            childSnapshotFavoriteDetail.forEach((detail) => {
              if (detail.key == this.state.product_name)
              {
                this.setState({
                  favorite: true,
                })
                this.props.navigation.setParams({
                  favorite: true
                })
              }
            })
          })
        }
      })
    })
  }

  _setFavorite = async () =>  {
    this.props.navigation.setParams({
      favorite: !this.state.favorite
    })
    
    if (this.state.favorite)
    {
      const user = await AsyncStorage.getItem('@user:key')
      firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
        childSnapshot.forEach((child) => {
          if (user === child.toJSON().id)
          {
            var keyUser = child.key
            firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/favorite/' + this.state.product_name).remove()
          }
        })
      })
    }
    else
    {
      const user = await AsyncStorage.getItem('@user:key')
      firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
        childSnapshot.forEach((child) => {
          if (user === child.toJSON().id)
          {
            var keyUser = child.key
            firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/favorite/' + this.state.product_name).set({
              price: this.state.product_price,
              screen: this.state.product_screen,
              image: this.state.product_image
            })
          }
        })
      })
    }

    this.setState({
      favorite: !this.state.favorite
    })
  }

  _loadData()
  {
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/').once('value', (product) => {
      console.log(product)
      this.setState({
        product_name: product.key,
        product_price: product.toJSON().price,
        product_screen: product.toJSON().screen,
        product_image: product.toJSON().image
      })
    })

    var list_Finish = []
    var list_Storage = []
    var list_Connectivity = []

    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/price/').once('value', (price) => {
      this.setState({
        fromprice: parseInt(price.val()),
        storageprice: parseInt(price.val())
      })
    }).then(() => {
      firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/model/list_Finish/').once('value', (childColourSnapshot) => {
        childColourSnapshot.forEach((childColour) => {
          list_Finish.push({
            name: childColour.toJSON().name,
            colour: childColour.toJSON().colour,
            image: childColour.toJSON().image,
          })
          this.setState({
            list_Finish: list_Finish,
          })
        })
      }).then(() => {
        var colour = list_Finish[0].colour
        this.setState({
          colour: colour,
          image: list_Finish.find(i => i.colour === list_Finish[0].colour).image,
        })
      })
      
      firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/model/list_Storage/').once('value', (childStorageSnapshot) => {
        childStorageSnapshot.forEach((childStorage) => {
          list_Storage.push(
            {
              bonus: parseInt(childStorage.toJSON().bonus),
              storage: childStorage.toJSON().storage,
            }
          )
          this.setState({
            list_Storage: list_Storage,
          })
        })
      }).then(() => {
        var storage = list_Storage[0].storage
        this.setState({
          storage: storage,
          connectivityprice: this.state.storageprice + this.state.list_Storage.find(sto => sto.storage === storage).bonus,
        })
      })

      firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/model/list_Connectivity/').once('value', (childConnectivitySnapshot) => {
        childConnectivitySnapshot.forEach((childConnectivity) => {
          list_Connectivity.push(
            {
              bonus: parseInt(childConnectivity.toJSON().bonus),
              connectivity: childConnectivity.toJSON().connectivity,
            }
          )
          this.setState({
            list_Connectivity: list_Connectivity,
          })
        })
      }).then(() => {
        var connectivity = list_Connectivity[0].connectivity
        this.setState({
          connectivity: connectivity,
          totalprice: this.state.connectivityprice
        })
        this.setState({
          name: 'iPad ' + this.state.connectivity + ' ' + this.state.storage + ' - ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
        })
      })
    })    
  }

  _writeData()
  {
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/model/list_Finish/gold/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPad%2FiPad-gold.png?alt=media&token=a8958f41-adac-467b-8a64-e62be2c89dee')
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/model/list_Finish/grey/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPad%2FiPad-spacegray.png?alt=media&token=ca9a8533-301e-4ad1-bbf1-60ea8a42be61')
    firebaseApp.database().ref('shopapp/list_ProductType/iPad/product/iPad/model/list_Finish/silver/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPad%2FiPad-silver.png?alt=media&token=37971866-58a5-4738-8452-f4081465ab17')
  }

  async _addToBag()
  {
    var name = 'iPad ' + this.state.connectivity + ' ' + this.state.storage + ' - ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').once('value', (childSnapshotBag) => {
            var addNew = true;
            childSnapshotBag.forEach((childBag) => {
              if (childBag.toJSON().name === name)
              {
                var quantity = parseInt(childBag.toJSON().quantity) + 1
                var price = this.state.totalprice * quantity
                firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/' + childBag.key).set({
                  name: name,
                  quantity: quantity,
                  price: price,
                  image: this.state.image,
                  singleprice: this.state.totalprice
                })
                addNew = false;
              }
            })
            if (addNew)
            {
              var price = this.state.totalprice
              firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/').push().set({
                name: name,
                quantity: 1,
                image: this.state.image,
                price: price,
                singleprice: price,
              })
            }
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
    alert('Product added to Bag')
  }

  _onPress_FinishItem(colour)
  {
    this.setState({
      colour: colour,
      image: this.state.list_Finish.find(i => i.colour === colour).image,
      name: 'iPad ' + this.state.connectivity + ' ' + this.state.storage + ' - ' + this.state.list_Finish.find(i => i.colour === colour).name
    })
  }

  _onPress_StorageItem(item)
  {
    this.setState({
      storage: item.storage,
      connectivityprice: this.state.storageprice + item.bonus,
      totalprice: this.state.storageprice + item.bonus + this.state.list_Connectivity.find(con => con.connectivity === this.state.connectivity).bonus,
      name: 'iPad ' + this.state.connectivity + ' ' + item.storage + ' - ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
    })
  }

  _onPress_ConnectivityItem(item)
  {
    this.setState({
      connectivity: item.connectivity,
      totalprice: this.state.connectivityprice + item.bonus,
      name: 'iPad ' + item.connectivity + ' ' + this.state.storage + ' - ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
    })
  }

  _onPress_Gallery()
  {
    this.props.navigation.navigate("iPadGallery", {
      title: "Gallery"
    })
  }

  _onPress_Box()
  {
    this.props.navigation.navigate("iPadBox")
  }

  render(){
    return(
      <SafeAreaView
        style={{flex: 1, backgroundColor: 'lightgrey'}}>
        <ScrollView
          style={{flex: 1}}>
          <View
            style={{backgroundColor: '#fff', alignItems: 'center'}}>
            <Text
              style={{paddingTop: 20, paddingBottom: 10, fontFamily: 'System', fontSize: 32, marginTop: 20}}>Buy iPad</Text>
            <Text
              style={{fontFamily: 'System', fontSize: 20, opacity: 0.7}}>${this.state.totalprice}.00</Text>
              <TouchableWithoutFeedback
                onPress={this._onPress_Gallery.bind(this)}>
                <View
                  style={{width: dvWidth, height: 180, marginVertical: 20}}>
                  <Image
                    style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                    source={{uri: this.state.image}}>
                  </Image>
                </View>
              </TouchableWithoutFeedback>
              <View
                style={{width: dvWidth, height: 50, borderTopWidth: 0.5, borderTopColor: '#999'}}>
                <TouchableWithoutFeedback
                  onPress={this._onPress_Gallery.bind(this)}>
                  <View
                    style={{width: '100%', height: 50, alignItems: 'center', justifyContent: 'center'}}>
                    <Text
                      style={{fontFamily: 'System', fontSize: 16, color: 'blue'}}>Gallery</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
          </View>
          <View
            style={{paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#fff', marginTop: 10}}>
            <Text
              style={{marginBottom: 20, fontFamily: 'System', fontSize: 18}}>Finish</Text>
            <FlatList
              data={this.state.list_Finish}
              numColumns={2}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{height: 10, width: dvWidth - 50, paddingHorizontal: 10}}
                  />
                );
              }}
              renderItem={({item}) => {
                return(
                  <TouchableWithoutFeedback
                    onPress={this._onPress_FinishItem.bind(this, item.colour)}>
                    <View
                      style={{width: (dvWidth - 50) / 2, height: 80, borderRadius: 4, borderColor: item.colour === this.state.colour ? 'blue' : '#666', borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginRight: 10}}>
                      <View
                        style={{width: 20, height: 20, borderRadius: 10, backgroundColor: item.colour, marginVertical: 4}}></View>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, padding: 4}}>{item.name}</Text>
                    </View>
                  </TouchableWithoutFeedback> 
                )
              }}>
            </FlatList>
          </View>
          <View
            style={{paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#fff', marginTop: 10}}>
            <Text
              style={{marginBottom: 20, fontFamily: 'System', fontSize: 18}}>Storage</Text>
            <FlatList
              data={this.state.list_Storage}
              numColumns={2}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{height: 10, width: dvWidth - 50, paddingHorizontal: 10}}
                  />
                );
              }}
              renderItem={({item}) => {
                return(
                  <TouchableWithoutFeedback
                    onPress={this._onPress_StorageItem.bind(this, item)}>
                    <View
                      style={{width: (dvWidth - 50) / 2, height: 80, borderRadius: 4, borderColor: item.storage === this.state.storage ? 'blue' : '#666', borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginRight: 10}}>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, padding: 4}}>{item.storage}</Text>
                      <Text
                        style={{fontFamily: 'System', fontSize: 12, padding: 4, opacity: 0.7}}>From ${this.state.storageprice + item.bonus}</Text>
                    </View>
                  </TouchableWithoutFeedback> 
                )
              }}>
            </FlatList>
          </View>
          <View
            style={{paddingHorizontal: 20, paddingVertical: 20, backgroundColor: '#fff', marginTop: 10}}>
            <Text
              style={{marginBottom: 20, fontFamily: 'System', fontSize: 18}}>Connectivity</Text>
            <FlatList
              data={this.state.list_Connectivity}
              numColumns={2}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{height: 10, width: dvWidth - 50, paddingHorizontal: 10}}
                  />
                );
              }}
              renderItem={({item}) => {
                return(
                  <TouchableWithoutFeedback
                    onPress={this._onPress_ConnectivityItem.bind(this, item)}>
                    <View
                      style={{width: (dvWidth - 50) / 2, height: 80, borderRadius: 4, borderColor: item.connectivity === this.state.connectivity ? 'blue' : '#666', borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginRight: 10}}>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, padding: 4}}>{item.connectivity}</Text>
                      <Text
                        style={{fontFamily: 'System', fontSize: 12, padding: 4, opacity: 0.7}}>${this.state.connectivityprice + item.bonus}</Text>
                    </View>
                  </TouchableWithoutFeedback> 
                )
              }}>
            </FlatList>
          </View>
          <View
            style={{paddingVertical: 20, width: dvWidth, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginTop: 10}}>
            <View
              style={{width: 100, height: 100, marginHorizontal: 20}}>
              <Image
                style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
                source={{uri: this.state.image}}>
              </Image>
            </View>
            <View
              style={{flexDirection: 'column', marginRight: 10}}>
              <Text
                style={{fontFamily: 'System', fontSize: 18, padding: 4, width: dvWidth - 150}}>{this.state.name}</Text>
              <Text
                style={{fontFamily: 'System', fontSize: 14, padding: 4}}>${this.state.totalprice}.00</Text>
            </View>
          </View>
          <View
            style={{backgroundColor: '#fff', marginTop: 10, marginBottom: 70}}>
            <TouchableWithoutFeedback
              onPress={() => {alert("Pressed")}}>
              <View style={{ width: dvWidth, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: 'System', fontSize: 18, fontWeight: 'bold'}}>Tech Specs</Text>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../../../assets/icon-right.png')}>
                </Image>
              </View>
            </TouchableWithoutFeedback>
            <View style={{marginLeft: 20, width: dvWidth-20, height: 0.5, backgroundColor: '#999'}}></View>
            <TouchableWithoutFeedback
              onPress={this._onPress_Box.bind(this)}>
              <View style={{ width: dvWidth, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff'}}>
                <Text style={{fontFamily: 'System', fontSize: 18, fontWeight: 'bold'}}>What's in the Box</Text>
                <Image
                  style={{width: 16, height: 16}}
                  source={require('../../../../assets/icon-right.png')}>
                </Image>
              </View>
            </TouchableWithoutFeedback>
          </View> 
        </ScrollView>
        <View
          style={{position: 'absolute', bottom: 0, backgroundColor: '#eee', paddingVertical: 8, paddingHorizontal: 20, width: dvWidth}}>
          <TouchableWithoutFeedback
            onPress={this._addToBag.bind(this)}>
            <View
              style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'blue', width: '100%', borderRadius: 4}}>
              <Text
                style={{fontFamily: 'System', fontSize: 16, color: '#fff', fontWeight: 'bold', padding: 10}}>Add to bag</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    )
  }
}
