import React from 'react'
import { Animated, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native'

const dvWidth = Dimensions.get('window').width
const dvHeight = Dimensions.get('window').height
const barWidth = dvWidth - 20

const listGallery = [
    require('./iPhoneSE/iPhoneSE-gallery1.jpg'),
    require('./iPhoneSE/iPhoneSE-gallery2.jpg'),
    require('./iPhoneSE/iPhoneSE-gallery3.jpg'),
    require('./iPhoneSE/iPhoneSE-gallery4.jpg'),
    require('./iPhoneSE/iPhoneSE-gallery5.jpg'),
]

export default class iPhoneSEGallery extends React.Component {

  scrollAnim = new Animated.Value(0)
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
    const interpolateAnim = this.scrollAnim.interpolate({
        inputRange: [0, dvWidth * (listGallery.length - 1)],
        outputRange: [0, barWidth - barWidth/listGallery.length]
      })
    return(
      <SafeAreaView
        style={{flex: 1}}>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          onScroll={
            Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollAnim } } }]
          )}>
          {
            listGallery.map((image) => (
              <View
                style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#fff'}}>
                <Image
                  style={{ width: dvWidth, height: dvHeight, resizeMode: 'contain'}}
                  source={image}>
                </Image>
              </View>
            ))
          }
        </ScrollView>
        <View
          style={{position: 'absolute', bottom: 20, width: barWidth, height: 2, backgroundColor: '#999', marginLeft: 20, overflow: 'hidden'}}>
          <Animated.View
            style={{width: dvWidth / listGallery.length, height: 2, backgroundColor: '#333',
            transform: [
              { translateX: interpolateAnim },
            ]}}>
          </Animated.View>
        </View>
      </SafeAreaView>  
    )
  }
}
