import React from 'react'
import { View, Image, Dimensions, ScrollView, Text, SafeAreaView, TouchableWithoutFeedback, AsyncStorage, FlatList } from 'react-native'
import firebaseApp from '../../../../config-firebase'

const dvWidth = Dimensions.get('window').width

export default class iPhone6sScreen extends React.Component {

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
      model: [],
      modelChooser: '',
      list_Finish: [],
      list_Storage: [],
      colour: '',
      storage: '',
      image: '',
      fromprice: 0,
      modelprice: 0,
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
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/').once('value', (product) => {
      console.log(product)
      this.setState({
        product_name: product.key,
        product_price: product.toJSON().price,
        product_screen: product.toJSON().screen,
        product_image: product.toJSON().image
      })
    })

    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/price/').once('value', (price) => {
      this.setState({
        fromprice: parseInt(price.val())
      })
    })
    var model = []
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/').once('value', (childModelSnapshot) => {
      childModelSnapshot.forEach((childModel) => {
        model.push({
          key: childModel.key,
          name: childModel.toJSON().name,
          display: childModel.toJSON().display,
          bonus: parseInt(childModel.toJSON().bonus)
        })
      })
      console.log(model)
      this.setState({
        model: model,
      })
    }).then(() => {
      this.setState({
        modelChooser: this.state.model[0].key,
        modelprice: this.state.fromprice,
      })
      firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/' + this.state.modelChooser + '/').once('value', (childmodelChooserSnapshot) => {
        console.log(childmodelChooserSnapshot)
        this.setState({
          list_Finish: Object.values(childmodelChooserSnapshot.val().list_Finish),
          colour: Object.values(childmodelChooserSnapshot.val().list_Finish)[0].colour,
          list_Storage: Object.values(childmodelChooserSnapshot.val().list_Storage),
          storage: Object.values(childmodelChooserSnapshot.val().list_Storage)[0].storage,
          storageprice: this.state.modelprice + this.state.model[0].bonus,
        }) 
      }).then(() => {
        this.setState({
          image: this.state.list_Finish.find(i => i.colour === this.state.colour).image,
          totalprice: this.state.storageprice + this.state.list_Storage.find(sto => sto.storage === this.state.storage).bonus
        })
        this.setState({
          name: this.state.model.find(model => model.key === this.state.modelChooser).name + ' ' + this.state.storage + ' ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
        })
      })   
    })
  }

  _writeData()
  {
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s/list_Finish/gold/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6s-gold.png?alt=media&token=cb766a01-ba5b-4dee-82ad-d56b1f6eac44')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s/list_Finish/rosegold/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6s-rosegold.png?alt=media&token=8e0924c6-d8c2-454e-9eff-54619cf8aed1')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s/list_Finish/grey/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6s-spacegray.png?alt=media&token=2a5e562e-57e6-4516-a125-71a15f9745cb')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s/list_Finish/silver/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6s-silver.png?alt=media&token=34fb2a26-00d1-4852-868a-8004c6049f5a')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s Plus/list_Finish/gold/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6sPlus-gold.png?alt=media&token=d66c0a03-793d-46c8-bbdc-4962d18d937a')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s Plus/list_Finish/rosegold/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6sPlus-rosegold.png?alt=media&token=b2363700-7d27-42ed-bd6c-f4ee318ffac0')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s Plus/list_Finish/grey/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6sPlus-spacegray.png?alt=media&token=32ad7ffb-f3dd-4bf4-bdf0-e9e93de0c3eb')
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/iPhone 6s Plus/list_Finish/silver/image').set('https://firebasestorage.googleapis.com/v0/b/shopapp-8541a.appspot.com/o/iPhone%2FiPhone6sPlus-silver.png?alt=media&token=d6349f19-fadd-47b4-bdc4-191479ea2ffb')
  }

  async _addToBag()
  {
    var name = this.state.model.find(model => model.key === this.state.modelChooser).name + ' ' + this.state.storage + ' ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
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

  _onPress_ModelItem(model)
  {
    firebaseApp.database().ref('shopapp/list_ProductType/iPhone/product/iPhone 6s/model/' + model.key + '/').once('value', (childmodelChooserSnapshot) => {
      this.setState({
        modelChooser: model.key,
        list_Finish: Object.values(childmodelChooserSnapshot.val().list_Finish),
        list_Storage: Object.values(childmodelChooserSnapshot.val().list_Storage),
      })
      if (this.state.list_Finish.find(i => i.colour === this.state.colour) == undefined)
      {
        this.setState({
          colour: this.state.list_Finish[0].colour,
        })
      }
      this.setState({
        image: this.state.list_Finish.find(i => i.colour === this.state.colour).image,
        storageprice: this.state.modelprice + model.bonus
      })
      if (this.state.list_Storage.find(sto => sto.storage === this.state.storage) == undefined)
      {
        this.setState({
          storage: this.state.list_Storage[0].storage,
          totalprice: this.state.storageprice + this.state.list_Storage[0].bonus
        })
      }
      else
      {
        this.setState({
          totalprice: this.state.storageprice + this.state.list_Storage.find(sto => sto.storage === this.state.storage).bonus
        })
      }
    }).then(() => {
      this.setState({
        name: this.state.model.find(model => model.key === this.state.modelChooser).name + ' ' + this.state.storage + ' ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
      }) 
    })
  }

  _onPress_FinishItem(colour)
  {
    this.setState({
      colour: colour,
      image: this.state.list_Finish.find(i => i.colour === colour).image,
      name: this.state.model.find(model => model.key === this.state.modelChooser).name + ' ' + this.state.storage + ' ' + this.state.list_Finish.find(i => i.colour === colour).name
    })
  }

  _onPress_StorageItem(item)
  {
    this.setState({
      storage: item.storage,
      totalprice: this.state.storageprice + item.bonus,
      name: this.state.model.find(model => model.key === this.state.modelChooser).name + ' ' + item.storage + ' ' + this.state.list_Finish.find(i => i.colour === this.state.colour).name
    })
  }

  _onPress_Gallery()
  {
    this.props.navigation.navigate("iPhone6sGallery", {
      title: "Gallery"
    })
  }

  _onPress_Box()
  {
    this.props.navigation.navigate("iPhone6sBox")
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
              style={{paddingTop: 20, paddingBottom: 10, fontFamily: 'System', fontSize: 32, marginTop: 20}}>Choose your iPhone 6s</Text>
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
              style={{marginBottom: 20, fontFamily: 'System', fontSize: 18}}>Model</Text>
            <FlatList
              data={this.state.model}
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
                    onPress={this._onPress_ModelItem.bind(this, item)}>
                    <View
                      style={{width: (dvWidth - 50) / 2, height: 80, borderRadius: 4, borderColor: item.key === this.state.modelChooser ? 'blue' : '#666', borderWidth: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginRight: 10}}>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, padding: 4}}>{item.name}</Text>
                      <Text
                        style={{fontFamily: 'System', fontSize: 16, padding: 4}}>{item.display} display</Text>
                      {/* <Text
                        style={{fontFamily: 'System', fontSize: 12, padding: 4, opacity: 0.7}}>From ${this.state.modelprice + item.bonus}</Text> */}
                    </View>
                  </TouchableWithoutFeedback> 
                )
              }}>
            </FlatList>
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
