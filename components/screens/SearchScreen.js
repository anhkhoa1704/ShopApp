import React from 'react';
import { Text, View, Image, Dimensions, SafeAreaView, Alert, ScrollView, TouchableWithoutFeedback, FlatList, Keyboard, TouchableHighlight, AsyncStorage } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements'
import firebaseApp from '../../config-firebase'

let dvWidth = Dimensions.get('window').width;

export default class SearchScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Search',
      header: null,
    }
  };

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      showSuggestedSearch: false,
      showSearchResult: false,
      listProduct: [],
      listSearch: [],
      listFilter: [],
      searchText: ''
    }
  }

  componentWillMount()
  {
    this._loadlistSearch()
    this._getlistProduct()
  }

  _getlistProduct()
  {
    var listProduct = []
    firebaseApp.database().ref('shopapp/list_ProductType/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        firebaseApp.database().ref('shopapp/list_ProductType/' + child.key + '/product/').once('value', (cocSnapshot) => {
          cocSnapshot.forEach((coc) => {
            listProduct.push({
              name: coc.toJSON().name,
              screen: coc.toJSON().screen,
              image: coc.toJSON().image,
              price: coc.toJSON().price
            });
          })
        })
      })
      this.setState({
        listProduct: listProduct
      })
      console.log(listProduct)
    })
  }

  async _loadlistSearch()
  {
    var listSearch = [];
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'list_search/').once('value', (childSnapshotSearch) => {
            childSnapshotSearch.forEach((childSearch) => {
              listSearch.push({
                text: childSearch.toJSON().text
              });
              this.setState({
                listSearch: listSearch,
              });
            });
          })
        }
      })
    })
  }

  async onPressClearAllSearches()
  {
    const user = await AsyncStorage.getItem('@user:key')
    firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
      childSnapshot.forEach((child) => {
        if (user === child.toJSON().id)
        {
          var keyUser = child.key
          firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'list_search/').set(null)
          this.setState({
            listSearch: []
          })
        }
      })
    })
  }

  _onPressClear()
  {
    Alert.alert(
      'Are you sure you want to clear your recent searches?',
      '',
      [
        {text: 'Clear All Searches', onPress: this.onPressClearAllSearches.bind(this), style: 'destructive'},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  _searchBarChangeText = (text) => 
  {
    this.setState({
      searchText: text
    })

    if(text != '')
    {
      if (text.length > 1)
      {
        var listFilter = this.state.listProduct.filter(function(item){
          return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        })
  
        this.setState({
          listFilter: listFilter
        })
      }
      else
      {
        this.setState({
          listFilter: []
        })
      }
      this.setState({
        showSuggestedSearch: true,
      })
    }
    else
    {
      this.setState({
        showSuggestedSearch: false,
        showSearchResult: false
      })
    }
  }

  async _addSearchText()
  {
    if (this.state.searchText != '')
    {
      const user = await AsyncStorage.getItem('@user:key')
      firebaseApp.database().ref('shopapp/list_User/').once('value', (childSnapshot) => {
        childSnapshot.forEach((child) => {
          if (user === child.toJSON().id)
          {
            var keyUser = child.key
            firebaseApp.database().ref('shopapp/list_User/' + keyUser + '/' + 'list_search/' + this.state.searchText + '/text').set(this.state.searchText)
          }
        })
      })
      this._loadlistSearch()
    }
  }

  _onSubmitSearchText()
  {
    if (this.state.searchText != '')
    {
      this.setState({
        showSearchResult: true,
        showSuggestedSearch: false
      })
      this._changelistFilter(this.state.searchText)
      this._addSearchText()
    }
  }

  _changelistFilter(text)
  {
    var listFilter = this.state.listProduct.filter(function(item){
      return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
    })

    this.setState({
      listFilter: listFilter
    })
  }

  _onPressSuggestedSearchItem(item)
  {
    this.setState({
      searchText: item.name,
      showSearchResult: true,
      showSuggestedSearch: false
    })

    this._changelistFilter(item.name)

    Keyboard.dismiss()
    this._addSearchText()
  }

  _onPresslistSearchItem(text)
  {
    this.setState({
      searchText: text,
      showSearchResult: true,
      showSuggestedSearch: false
    })

    this._changelistFilter(text)
    this._addSearchText()
  }

  _onPressResultItem(item)
  {
    this.props.navigation.navigate(item.screen)
  }

  _renderListSearch = () => {
    if (this.state.listSearch.length > 0 && !this.state.showSuggestedSearch && !this.state.showSearchResult)
    {
      return (
        <ScrollView
          style={{paddingVertical: 20, backgroundColor: '#fff'}}>
          <View
            style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 20}}>
              <Text
                style={{fontFamily: 'System', fontSize: 18, fontWeight: 'bold'}}>Recent Searches</Text>
              <TouchableWithoutFeedback
                onPress={this._onPressClear.bind(this)}>
                <View>
                  <Text
                    style={{fontFamily: 'System', fontSize: 14, color: 'blue'}}>Clear</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{width: '100%', height: 0.5, backgroundColor: '#999'}}></View>
            <FlatList
              style={{marginBottom: 68}}
              data={this.state.listSearch}
              renderItem={({item}) => {
                return(
                  <TouchableWithoutFeedback
                    onPress={this._onPresslistSearchItem.bind(this, item.text)}>
                    <View>
                      <View
                        style={{paddingVertical: 20, backgroundColor: '#fff'}}>
                        <View
                          style={{flexDirection: 'row', paddingLeft: 10}}>
                          <Image
                            style={{width: 16, height: 16, tintColor: '#000'}}
                            source={require('../../assets/icon-search-searchscreen.png')}></Image>
                          <Text
                            style={{marginLeft: 10, fontFamily: 'System', fontSize: 16, color: 'blue'}}>{item.text}</Text>
                        </View>
                      </View>
                      <View style={{width: '100%', height: 0.5, backgroundColor: '#999'}}></View>
                      </View>
                    </TouchableWithoutFeedback>
                  ) 
                }}>
              </FlatList>
          </View>
        </ScrollView>
      )
    } else { 
      return null 
    }
  }
  
  _renderSuggestedSearch = () => {
    if (this.state.showSuggestedSearch) {
      return (
        <ScrollView
          keyboardShouldPersistTaps='always'
          style={{paddingVertical: 20, backgroundColor: '#fff'}}>
          <View
            style={{flex: 1}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 20}}>
              <Text
                style={{fontFamily: 'System', fontSize: 16, color: '#333'}}>SUGGESTED SEARCHES</Text>
            </View>
            <View style={{width: '100%', height: 0.5, backgroundColor: '#999'}}></View>
            <FlatList
              style={{marginBottom: 68}}
              keyboardShouldPersistTaps='handled'
              data={this.state.listFilter}
              renderItem={({item}) => {
                return(
                  <TouchableWithoutFeedback
                    onPress={this._onPressSuggestedSearchItem.bind(this, item)}>
                    <View>
                      <View
                        style={{paddingVertical: 20, backgroundColor: '#fff'}}>
                        <View
                          style={{flexDirection: 'row', paddingLeft: 10}}>
                          <Image
                            style={{width: 16, height: 16, tintColor: '#000'}}
                            source={require('../../assets/icon-search-searchscreen.png')}></Image>
                          <Text
                            style={{marginLeft: 10, fontFamily: 'System', fontSize: 16, color: '#333'}}>{item.name}</Text>
                        </View>
                      </View>
                      <View style={{width: '100%', height: 0.5, backgroundColor: '#999'}}></View>
                      </View>
                    </TouchableWithoutFeedback>
                  ) 
                }}>
              </FlatList>
          </View>
        </ScrollView>
      );
    } else {
      return null;
    }
  }

  _renderSearchResult = () => {
    if (this.state.showSearchResult) {
      return (
        <FlatList
          style={{marginBottom: 48}}
          data={this.state.listFilter}
          renderItem={({item, index}) => {
            return(
              <View>
                <TouchableWithoutFeedback
                  onPress={this._onPressResultItem.bind(this, item)}>
                  <View style={{width: dvWidth, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image 
                        style={{width: 80, height: 80, resizeMode: 'contain', marginLeft: 10}}
                        source={{uri: item.image}}>
                      </Image>
                      <View style={{flexDirection: 'column', width: 200, marginLeft: 20,}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', fontFamily: 'System', marginBottom: 8}}>{item.name}</Text>
                        {item.price ?  <Text style={{ fontSize: 14, fontFamily: 'System'}}>From ${item.price}</Text> : null}
                      </View>
                    </View>
                    <Image
                      style={{width: 16, height: 16, color: '#eee'}}
                      source={require('../../assets/icon-right.png')}>
                    </Image>
                  </View>
                </TouchableWithoutFeedback>
                {
                  index === this.state.listFilter.length - 1 ? null : <View style={{marginLeft: 20, width: dvWidth - 20, height: 0.5, backgroundColor: '#999'}}></View>
                }
              </View> 
            )
          }}>
      </FlatList>
      )
    } else {
      return null;
    }
    
  }

  _searchFocus()
  {
    if (this.state.searchText != '')
    {
      this.setState({
        showSearchResult: false,
        showSuggestedSearch: true
      })
    }
  }

  render() {
    return (
      <SafeAreaView 
        style={{flex: 1}}>
          <View
            style={{flex: 1, backgroundColor: '#fff'}}>
            <SearchBar
              ref={(searchInput) => { this.searchInput = searchInput }}
              lightTheme
              returnKeyType='search'
              onSubmitEditing={this._onSubmitSearchText.bind(this)}
              showLoading
              placeholder='Search' 
              onFocus={this._searchFocus.bind(this)}
              onChangeText={(text) => this._searchBarChangeText(text)}
              value={this.state.searchText}/>
              <View>
                {
                  this._renderListSearch()
                }
                {
                  this._renderSuggestedSearch()
                }
                {
                  this._renderSearchResult()
                }
            </View>
          </View>
      </SafeAreaView>
    );
  }
}