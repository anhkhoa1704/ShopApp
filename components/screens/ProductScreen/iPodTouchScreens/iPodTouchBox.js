import React from 'react'
import { View, Dimensions, ScrollView, Text, SafeAreaView, } from 'react-native'

const dvWidth = Dimensions.get('window').width

export default class iPodTouchBox extends React.Component {

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
          style={{ width: dvWidth, backgroundColor: '#fff' }}>
          <View
            style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20}}>
            <View
              style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 8}}></View>
            <Text
              style={{fontFamily: 'System', fontSize: 16, color: '#000'}}>iPod touch</Text>
          </View>
          <View
            style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20}}>
            <View
              style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 8}}></View>
            <Text
              style={{fontFamily: 'System', fontSize: 16, color: '#000'}}>Apple EarPods</Text>
          </View>
          <View
            style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20}}>
            <View
              style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 8}}></View>
            <Text
              style={{fontFamily: 'System', fontSize: 16, color: '#000'}}>Lightning to USB Cable</Text>
          </View>
          <View
            style={{flexDirection: 'row', marginLeft: 20, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20}}>
            <View
              style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#000', marginRight: 8}}></View>
            <Text
              style={{fontFamily: 'System', fontSize: 16, color: '#000'}}>Quick Start guide</Text>
          </View>
        </ScrollView>
      </SafeAreaView>  
    )
  }
}
