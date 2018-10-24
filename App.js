import React from 'react'
import { View, Image, ActivityIndicator, AsyncStorage, StatusBar, Animated, Easing } from 'react-native'
import SignInScreen from './components/screens/SignInScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import DiscoverScreen from './components/screens/DiscoverScreen'
import AccountScreen from './components/screens/AccountScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import MyFavoritesScreen from './components/screens/MyFavoritesScreen'
import MyOrdersScreen from './components/screens/MyOrdersScreen'
import OrderDetailScreen from './components/screens/OrderDetailScreen'
import ShopScreen from './components/screens/ShopScreen'
import SearchScreen from './components/screens/SearchScreen'
import BagScreen from './components/screens/BagScreen'
import CheckOutScreen from './components/screens/CheckOutScreen'
import MacProductScreen from './components/screens/ProductScreen/MacProductScreen'
import iPhoneProductScreen from './components/screens/ProductScreen/iPhoneProductScreen'
import iPhoneXScreen from './components/screens/ProductScreen/iPhoneScreens/iPhoneXScreen'
import iPhoneXGallery from './components/screens/ProductScreen/iPhoneScreens/iPhoneXGallery'
import iPhoneXBox from './components/screens/ProductScreen/iPhoneScreens/iPhoneXBox'
import iPhone8Screen from './components/screens/ProductScreen/iPhoneScreens/iPhone8Screen'
import iPhone8Gallery from './components/screens/ProductScreen/iPhoneScreens/iPhone8Gallery'
import iPhone8Box from './components/screens/ProductScreen/iPhoneScreens/iPhone8Box'
import iPhone7Screen from './components/screens/ProductScreen/iPhoneScreens/iPhone7Screen'
import iPhone7Gallery from './components/screens/ProductScreen/iPhoneScreens/iPhone7Gallery'
import iPhone7Box from './components/screens/ProductScreen/iPhoneScreens/iPhone7Box'
import iPhone6sScreen from './components/screens/ProductScreen/iPhoneScreens/iPhone6sScreen'
import iPhone6sGallery from './components/screens/ProductScreen/iPhoneScreens/iPhone6sGallery'
import iPhone6sBox from './components/screens/ProductScreen/iPhoneScreens/iPhone6sBox'
import iPhoneSEScreen from './components/screens/ProductScreen/iPhoneScreens/iPhoneSEScreen'
import iPhoneSEGallery from './components/screens/ProductScreen/iPhoneScreens/iPhoneSEGallery'
import iPhoneSEBox from './components/screens/ProductScreen/iPhoneScreens/iPhoneSEBox'
import iPadProductScreen from './components/screens/ProductScreen/iPadProductScreen'
import iPadProScreen from './components/screens/ProductScreen/iPadScreens/iPadProScreen'
import iPadProGallery from './components/screens/ProductScreen/iPadScreens/iPadProGallery'
import iPadProBox from './components/screens/ProductScreen/iPadScreens/iPadProBox'
import iPadScreen from './components/screens/ProductScreen/iPadScreens/iPadScreen'
import iPadGallery from './components/screens/ProductScreen/iPadScreens/iPadGallery'
import iPadBox from './components/screens/ProductScreen/iPadScreens/iPadBox'
import iPadmini4Screen from './components/screens/ProductScreen/iPadScreens/iPadmini4Screen'
import iPadmini4Gallery from './components/screens/ProductScreen/iPadScreens/iPadmini4Gallery'
import iPadmini4Box from './components/screens/ProductScreen/iPadScreens/iPadmini4Box'
import iPodTouchProductScreen from './components/screens/ProductScreen/iPodTouchProductScreen'
import iPodTouchScreen from './components/screens/ProductScreen/iPodTouchScreens/iPodTouchScreen'
import iPodTouchGallery from './components/screens/ProductScreen/iPodTouchScreens/iPodTouchGallery'
import iPodTouchBox from './components/screens/ProductScreen/iPodTouchScreens/iPodTouchBox'
import AppleTVProductScreen from './components/screens/ProductScreen/AppleTVProductScreen'
import AppleTV4KScreen from './components/screens/ProductScreen/AppleTVScreens/AppleTV4KScreen'
import AppleTV4KGallery from './components/screens/ProductScreen/AppleTVScreens/AppleTV4KGallery'
import AppleTV4KBox from './components/screens/ProductScreen/AppleTVScreens/AppleTV4KBox'
import AppleTV4KTechSpecs from './components/screens/ProductScreen/AppleTVScreens/AppleTV4KTechSpecs'
import AppleTVScreen from './components/screens/ProductScreen/AppleTVScreens/AppleTVScreen'
import AppleTVGallery from './components/screens/ProductScreen/AppleTVScreens/AppleTVGallery'
import AppleTVBox from './components/screens/ProductScreen/AppleTVScreens/AppleTVBox'
import AppleTVTechSpecs from './components/screens/ProductScreen/AppleTVScreens/AppleTVTechSpecs'
import AppleWatchProductScreen from './components/screens/ProductScreen/AppleWatchProductScreen'
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation'

class InitScreen extends React.Component {

  constructor(props) {
    super(props)
    console.disableYellowBox = true
    // this._clearAsync()
    this._navigateWithAsync()
  }

  _navigateWithAsync = async () => {
    const user = await AsyncStorage.getItem('@user:key') ? 'Main' : 'SignIn'
    this.props.navigation.navigate(user)
  }

  _clearAsync = async () => {
    await AsyncStorage.clear()
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{marginBottom: 40, width: 75, height: 75, tintColor: '#666'}}
          source={require('./assets/icon-apple.png')}></Image>
        <ActivityIndicator size="large" color="#333" />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

let DiscoverStackRouteConfigs = {
  DiscoverHome: {
    screen: DiscoverScreen,
  },
  Account: {
    screen: AccountScreen,
  },
  Profile: {
    screen: ProfileScreen
  },
  MyFavorites: {
    screen: MyFavoritesScreen,
  },
  MyOrders: {
    screen: MyOrdersScreen,
  },
  OrderDetail: {
    screen: OrderDetailScreen,
  },
  MacProduct: {
    screen: MacProductScreen,
  },
  iPhoneProduct: {
    screen: iPhoneProductScreen,
  },
  iPadProduct: {
    screen: iPadProductScreen,
  },
  iPadProScreen: {
    screen: iPadProScreen,
  },
  iPadProGallery: {
    screen: iPadProGallery,
  },
  iPadProBox: {
    screen: iPadProBox,
  },
  iPadScreen: {
    screen: iPadScreen,
  },
  iPadGallery: {
    screen: iPadGallery,
  },
  iPadBox: {
    screen: iPadBox,
  },
  iPadmini4Screen: {
    screen: iPadmini4Screen,
  },
  iPadmini4Gallery: {
    screen: iPadmini4Gallery,
  },
  iPadmini4Box: {
    screen: iPadmini4Box,
  },
  AppleWatchProduct: {
    screen: AppleWatchProductScreen,
  },
  AppleTVProduct: {
    screen: AppleTVProductScreen,
  },
  AppleTV4KScreen: {
    screen: AppleTV4KScreen,
  },
  AppleTV4KGallery: {
    screen: AppleTV4KGallery,
  },
  AppleTV4KBox: {
    screen: AppleTV4KBox,
  },
  AppleTV4KTechSpecs: {
    screen: AppleTV4KTechSpecs,
  },
  AppleTVScreen: {
    screen: AppleTVScreen,
  },
  AppleTVGallery: {
    screen: AppleTVGallery,
  },
  AppleTVBox: {
    screen: AppleTVBox,
  },
  AppleTVTechSpecs: {
    screen: AppleTVTechSpecs,
  },
  iPodTouchProduct: {
    screen: iPodTouchProductScreen,
  },
  iPodTouchScreen: {
    screen: iPodTouchScreen,
  },
  iPodTouchGallery: {
    screen: iPodTouchGallery,
  },
  iPodTouchBox: {
    screen: iPodTouchBox,
  },
  iPhoneXScreen: {
    screen: iPhoneXScreen,
  },
  iPhoneXGallery: {
    screen: iPhoneXGallery,
  },
  iPhoneXBox: {
    screen: iPhoneXBox,
  },
  iPhone8Screen: {
    screen: iPhone8Screen,
  },
  iPhone8Gallery: {
    screen: iPhone8Gallery,
  },
  iPhone8Box: {
    screen: iPhone8Box,
  },
  iPhone7Screen: {
    screen: iPhone7Screen,
  },
  iPhone7Gallery: {
    screen: iPhone7Gallery,
  },
  iPhone7Box: {
    screen: iPhone7Box,
  },
  iPhone6sScreen: {
    screen: iPhone6sScreen,
  },
  iPhone6sGallery: {
    screen: iPhone6sGallery,
  },
  iPhone6sBox: {
    screen: iPhone6sBox,
  },
  iPhoneSEScreen: {
    screen: iPhoneSEScreen,
  },
  iPhoneSEGallery: {
    screen: iPhoneSEGallery,
  },
  iPhoneSEBox: {
    screen: iPhoneSEBox,
  },
}

let DiscoverStackStyleConfigs = {
  initialRouteName: 'DiscoverHome',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('./assets/icon-discover.png')}
        style={{width: 25, height: 25, tintColor: tintColor}}>
      </Image>
    },
  },
}

const DiscoverStackNavigation = StackNavigator(DiscoverStackRouteConfigs, DiscoverStackStyleConfigs)

let ShopStackRouteConfigs = {
  ShopHome: {
    screen: ShopScreen,
  },
  Account: {
    screen: AccountScreen,
  },
  Profile: {
    screen: ProfileScreen
  },
  MyFavorites: {
    screen: MyFavoritesScreen,
  },
  MyOrders: {
    screen: MyOrdersScreen,
  },
  OrderDetail: {
    screen: OrderDetailScreen,
  },
  MacProduct: {
    screen: MacProductScreen,
  },
  iPhoneProduct: {
    screen: iPhoneProductScreen,
  },
  iPadProduct: {
    screen: iPadProductScreen,
  },
  iPadProScreen: {
    screen: iPadProScreen,
  },
  iPadProGallery: {
    screen: iPadProGallery,
  },
  iPadProBox: {
    screen: iPadProBox,
  },
  iPadScreen: {
    screen: iPadScreen,
  },
  iPadGallery: {
    screen: iPadGallery,
  },
  iPadBox: {
    screen: iPadBox,
  },
  iPadmini4Screen: {
    screen: iPadmini4Screen,
  },
  iPadmini4Gallery: {
    screen: iPadmini4Gallery,
  },
  iPadmini4Box: {
    screen: iPadmini4Box,
  },
  AppleWatchProduct: {
    screen: AppleWatchProductScreen,
  },
  AppleTVProduct: {
    screen: AppleTVProductScreen,
  },
  AppleTV4KScreen: {
    screen: AppleTV4KScreen,
  },
  AppleTV4KGallery: {
    screen: AppleTV4KGallery,
  },
  AppleTV4KBox: {
    screen: AppleTV4KBox,
  },
  AppleTV4KTechSpecs: {
    screen: AppleTV4KTechSpecs,
  },
  AppleTVScreen: {
    screen: AppleTVScreen,
  },
  AppleTVGallery: {
    screen: AppleTVGallery,
  },
  AppleTVBox: {
    screen: AppleTVBox,
  },
  AppleTVTechSpecs: {
    screen: AppleTVTechSpecs,
  },
  iPodTouchProduct: {
    screen: iPodTouchProductScreen,
  },
  iPodTouchScreen: {
    screen: iPodTouchScreen,
  },
  iPodTouchGallery: {
    screen: iPodTouchGallery,
  },
  iPodTouchBox: {
    screen: iPodTouchBox,
  },
  iPhoneXScreen: {
    screen: iPhoneXScreen,
  },
  iPhoneXGallery: {
    screen: iPhoneXGallery,
  },
  iPhoneXBox: {
    screen: iPhoneXBox,
  },
  iPhone8Screen: {
    screen: iPhone8Screen,
  },
  iPhone8Gallery: {
    screen: iPhone8Gallery,
  },
  iPhone8Box: {
    screen: iPhone8Box,
  },
  iPhone7Screen: {
    screen: iPhone7Screen,
  },
  iPhone7Gallery: {
    screen: iPhone7Gallery,
  },
  iPhone7Box: {
    screen: iPhone7Box,
  },
  iPhone6sScreen: {
    screen: iPhone6sScreen,
  },
  iPhone6sGallery: {
    screen: iPhone6sGallery,
  },
  iPhone6sBox: {
    screen: iPhone6sBox,
  },
  iPhoneSEScreen: {
    screen: iPhoneSEScreen,
  },
  iPhoneSEGallery: {
    screen: iPhoneSEGallery,
  },
  iPhoneSEBox: {
    screen: iPhoneSEBox,
  },
}

let ShopStackStyleConfigs = {
  initialRouteName: 'ShopHome',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('./assets/icon-shop.png')}
        style={{width: 25, height: 25, tintColor: tintColor, resizeMode: 'contain'}}>
      </Image>
    },
  },
}

const ShopStackNavigation = StackNavigator(ShopStackRouteConfigs, ShopStackStyleConfigs)

let SearchStackRouteConfigs = {
  SearchHome: {
    screen: SearchScreen,
  },
  MacProduct: {
    screen: MacProductScreen,
  },
  iPhoneProduct: {
    screen: iPhoneProductScreen,
  },
  iPadProduct: {
    screen: iPadProductScreen,
  },
  iPadProScreen: {
    screen: iPadProScreen,
  },
  iPadProGallery: {
    screen: iPadProGallery,
  },
  iPadProBox: {
    screen: iPadProBox,
  },
  iPadScreen: {
    screen: iPadScreen,
  },
  iPadGallery: {
    screen: iPadGallery,
  },
  iPadBox: {
    screen: iPadBox,
  },
  iPadmini4Screen: {
    screen: iPadmini4Screen,
  },
  iPadmini4Gallery: {
    screen: iPadmini4Gallery,
  },
  iPadmini4Box: {
    screen: iPadmini4Box,
  },
  AppleWatchProduct: {
    screen: AppleWatchProductScreen,
  },
  AppleTVProduct: {
    screen: AppleTVProductScreen,
  },
  AppleTV4KScreen: {
    screen: AppleTV4KScreen,
  },
  AppleTV4KGallery: {
    screen: AppleTV4KGallery,
  },
  AppleTV4KBox: {
    screen: AppleTV4KBox,
  },
  AppleTV4KTechSpecs: {
    screen: AppleTV4KTechSpecs,
  },
  AppleTVScreen: {
    screen: AppleTVScreen,
  },
  AppleTVGallery: {
    screen: AppleTVGallery,
  },
  AppleTVBox: {
    screen: AppleTVBox,
  },
  AppleTVTechSpecs: {
    screen: AppleTVTechSpecs,
  },
  iPodTouchProduct: {
    screen: iPodTouchProductScreen,
  },
  iPodTouchScreen: {
    screen: iPodTouchScreen,
  },
  iPodTouchGallery: {
    screen: iPodTouchGallery,
  },
  iPodTouchBox: {
    screen: iPodTouchBox,
  },
  iPhoneXScreen: {
    screen: iPhoneXScreen,
  },
  iPhoneXGallery: {
    screen: iPhoneXGallery,
  },
  iPhoneXBox: {
    screen: iPhoneXBox,
  },
  iPhone8Screen: {
    screen: iPhone8Screen,
  },
  iPhone8Gallery: {
    screen: iPhone8Gallery,
  },
  iPhone8Box: {
    screen: iPhone8Box,
  },
  iPhone7Screen: {
    screen: iPhone7Screen,
  },
  iPhone7Gallery: {
    screen: iPhone7Gallery,
  },
  iPhone7Box: {
    screen: iPhone7Box,
  },
  iPhone6sScreen: {
    screen: iPhone6sScreen,
  },
  iPhone6sGallery: {
    screen: iPhone6sGallery,
  },
  iPhone6sBox: {
    screen: iPhone6sBox,
  },
  iPhoneSEScreen: {
    screen: iPhoneSEScreen,
  },
  iPhoneSEGallery: {
    screen: iPhoneSEGallery,
  },
  iPhoneSEBox: {
    screen: iPhoneSEBox,
  },
}

let SearchStackStyleConfigs = {
  initialRouteName: 'SearchHome',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('./assets/icon-search.png')}
        style={{width: 25, height: 25, tintColor: tintColor, resizeMode: 'contain'}}>
      </Image>
    },
  },
}

const SearchStackNavigation = StackNavigator(SearchStackRouteConfigs, SearchStackStyleConfigs)

let BagStackRouteConfigs = {
  BagHome: {
    screen: BagScreen,
  },
  CheckOut: {
    screen: CheckOutScreen,
  }
}

let BagStackStyleConfigs = {
  initialRouteName: 'BagHome',
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Image
        source={require('./assets/icon-bag.png')}
        style={{width: 25, height: 25, tintColor: tintColor}}>
      </Image>
    },
  },
}

const BagStackNavigation = StackNavigator(BagStackRouteConfigs, BagStackStyleConfigs)

let TabNavigationRouteConfigs = {
  Home: { 
    screen: DiscoverStackNavigation
  },
  Shop: { 
    screen: ShopStackNavigation
  },
  Search: { 
    screen: SearchStackNavigation 
  },
  Bag: { 
    screen: BagStackNavigation 
  },
}

let TabNavigatorStyleConfigs = {
  tabbarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    activetintColor: 'red',
    inactiveTintColor: '#333',
    style:{
      borderTopWidth: 1,
      borderTopColor: '#999',
    },
  },
}

const AppTabNavigator = TabNavigator(TabNavigationRouteConfigs, TabNavigatorStyleConfigs)

let MainNavigatorRouteConfigs = {
  InitScreen: {
    screen: InitScreen,
  },
  SignIn: { 
    screen: SignInScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  Main: {
    screen: AppTabNavigator,
  }
}

let MainNavigatorConfigs = {
  initialRouteName: 'InitScreen',
  headerMode: 'none',
  transitionConfig : () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
  }),
}

const MainNavigator = StackNavigator(MainNavigatorRouteConfigs, MainNavigatorConfigs)

export default MainNavigator



