import React from 'react'
import { View, Dimensions, ScrollView, Text, SafeAreaView, Image} from 'react-native'

const dvWidth = Dimensions.get('window').width

export default class AppleTV4KBox extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: params ? params.title : null,
    }
  };

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
  }

  render(){
    return(
      <SafeAreaView
        style={{flex: 4}}>
        <ScrollView
          style={{ width: dvWidth, backgroundColor: '#fff'}}>
          <View
            style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 20 }}>
            <Text
              style={{ fontFamily: 'System', fontSize: 28, marginTop: 40 }}>What's in the Box</Text>
            <View
              style={{ marginTop: 40, marginHorizontal: 20, paddingHorizontal: 40, alignItems: 'center', backgroundColor: '#F9FAFB'}}>
              <Image
                style={{ width: 225, height: 280, resizeMode: 'contain' }}
                source={require('./AppleTV4K/AppleTV4K-box-appletv4k.jpeg')}>
              </Image>
            </View>
            <Text
              style={{ fontFamily: 'System', fontSize: 16, marginTop: 40 }}>Apple TV 4K</Text>
            <View
              style={{ marginTop: 40, marginHorizontal: 20, paddingHorizontal: 40, alignItems: 'center', backgroundColor: '#F9FAFB'}}>
              <Image
                style={{ width: 225, height: 280, resizeMode: 'contain' }}
                source={require('./AppleTV4K/AppleTV4K-box-remote.jpeg')}>
              </Image>
            </View>
            <Text
              style={{ fontFamily: 'System', fontSize: 16, marginTop: 40 }}>Siri Remote</Text>
            <View
              style={{ marginTop: 40, marginHorizontal: 20, paddingHorizontal: 40, alignItems: 'center', backgroundColor: '#F9FAFB' }}>
              <Image
                style={{ width: 225, height: 280, resizeMode: 'contain' }}
                source={require('./AppleTV4K/AppleTV4K-box-power.jpeg')}>
              </Image>
            </View>
            <Text
              style={{ fontFamily: 'System', fontSize: 16, marginTop: 40 }}>Power Cord</Text>
            <View
              style={{ marginTop: 40, marginHorizontal: 20, paddingHorizontal: 40, alignItems: 'center', backgroundColor: '#F9FAFB' }}>
              <Image
                style={{ width: 225, height: 280, resizeMode: 'contain' }}
                source={require('./AppleTV4K/AppleTV4K-box-lightning.jpeg')}>
              </Image>
            </View>
            <Text
              style={{ fontFamily: 'System', fontSize: 16, marginTop: 40 }}>Lightning to USB Cable</Text>
          </View>
        </ScrollView>
      </SafeAreaView>  
    )
  }
}
