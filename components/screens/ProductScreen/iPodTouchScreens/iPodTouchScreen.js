import React from 'react'
import { View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, AsyncStorage, FlatList } from 'react-native'
import firebaseApp from '../../../../config-firebase'

const dvWidth = Dimensions.get('window').width

export default class iPodTouchScreen extends React.Component {

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
      list_Colour: [],
      list_Storage: [],
      colour: '',
      storage: '',
      image: '',
      fromprice: 0,
      storageprice: 0,
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
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/').once('value', (product) => {
      console.log(product)
      this.setState({
        product_name: product.key,
        product_price: product.toJSON().price,
        product_screen: product.toJSON().screen,
        product_image: product.toJSON().image
      })
    })

    var list_Colour = []
    var list_Storage = []

    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/price/').once('value', (price) => {
      this.setState({
        fromprice: parseInt(price.val()),
        storageprice: parseInt(price.val())
      })
    }).then(() => {
      firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/').once('value', (childColourSnapshot) => {
        childColourSnapshot.forEach((childColour) => {
          list_Colour.push({
            name: childColour.toJSON().name,
            colour: childColour.toJSON().colour,
            image: childColour.toJSON().image,
          })
          this.setState({
            list_Colour: list_Colour,
          })
        })
      }).then(() => {
        var colour = list_Colour[0].colour
        this.setState({
          colour: colour,
          image: list_Colour.find(i => i.colour === colour).image,
        })
      })
      
      firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Storage/').once('value', (childStorageSnapshot) => {
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
          totalprice: this.state.storageprice + this.state.list_Storage.find(sto => sto.storage === storage).bonus
        })
        this.setState({
          name: 'iPod Touch' + ' ' + this.state.storage + ' ' + this.state.list_Colour.find(i => i.colour === this.state.colour).name
        })
      })
    })    
  }

  _writeData()
  {
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/blue/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-blue.png?alt=media&token=76f960bc-9c8a-4860-a193-db22b7fe22ac')
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/gold/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-gold.png?alt=media&token=4a342ee0-4bb5-48d6-8618-0edfa76a6f58')
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/grey/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-spacegrey.png?alt=media&token=6ca7c7e6-b174-4173-9756-959c70a326ad')
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/pink/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-pink.png?alt=media&token=6c1a9cc8-5d3d-492e-ae53-a20134a7dace')
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/red/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-red.png?alt=media&token=38b860e4-d493-47c5-b593-df7c0ec8879a')
    firebaseApp.database().ref('shopapp/list_ProductType/iPod Touch/product/iPod Touch/model/list_Colour/silver/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPodTouch%2FiPodTouch-silver.png?alt=media&token=8d41fa78-e8b9-458c-92cb-03d4a4231ee0')
  }

  async _addToBag()
  {
    var name = 'iPod Touch' + ' ' + this.state.storage + ' ' + this.state.list_Colour.find(i => i.colour === this.state.colour).name
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
                var singleprice = this.state.totalprice
                var price = singleprice * quantity
                firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'bag/bag_detail/' + childBag.key).set({
                  name: name,
                  quantity: quantity,
                  price: price,
                  image: this.state.image,
                  singleprice: singleprice
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

  _onPress_ColourItem(colour)
  {
    this.setState({
      colour: colour,
      image: this.state.list_Colour.find(i => i.colour === colour).image,
      name: 'iPod Touch' + ' ' + this.state.storage + ' ' + this.state.list_Colour.find(i => i.colour === colour).name
    })
  }

  _onPress_StorageItem(item)
  {
    this.setState({
      storage: item.storage,
      totalprice: this.state.storageprice + item.bonus,
      name: 'iPod Touch' + ' ' + item.storage + ' ' + this.state.list_Colour.find(i => i.colour === this.state.colour).name
    })
  }

  _onPress_Gallery()
  {
    this.props.navigation.navigate("iPodTouchGallery", {
      title: "Gallery"
    })
  }

  _onPress_Box()
  {
    this.props.navigation.navigate("iPodTouchBox")
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
              style={{paddingTop: 20, paddingBottom: 10, fontFamily: 'System', fontSize: 32, marginTop: 20}}>Choose your iPod touch</Text>
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
              data={this.state.list_Colour}
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
                    onPress={this._onPress_ColourItem.bind(this, item.colour)}>
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
                        style={{fontFamily: 'System', fontSize: 12, padding: 4, opacity: 0.7}}>${this.state.storageprice + item.bonus}</Text>
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
