import React from 'react'
import { View, ScrollView, Text, SafeAreaView, StyleSheet, Image } from 'react-native'

export default class AppleTV4KTechSpecs extends React.Component {

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
        style={{flex: 4, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Size and Weight</Text>
                <View
                    style={{ width: 316, height: 410}}>
                    <Image
                        style={styles.imageContainer}
                        source={require('./AppleTVTechSpecs/tv4k-techspecs-1.jpg')}>
                    </Image>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Height:</Text>
                    <Text style={styles.rowContent}>1.4 inches (35 mm)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Width:</Text>
                    <Text style={styles.rowContent}>3.9 inches (98 mm)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Depth:</Text>
                    <Text style={styles.rowContent}>3.9 inches (98 mm)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Weight:</Text>
                    <Text style={styles.rowContent}>15 ounces (425 g)</Text>
                </View>
                <View
                    style={{ width: 321, height: 482}}>
                    <Image
                        style={styles.imageContainer}
                        source={require('./AppleTVTechSpecs/tv4k-techspecs-2.jpg')}>
                    </Image>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Height:</Text>
                    <Text style={styles.rowContent}>4.88 inches (124 mm)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Width:</Text>
                    <Text style={styles.rowContent}>1.5 inches (38 mm)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Depth:</Text>
                    <Text style={styles.rowContent}>0.25 inches (6.3 mm)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Weight:</Text>
                    <Text style={styles.rowContent}>1.66 ounces (45 g)</Text>
                </View>
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Capacity and Price</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>32GB</Text>
                    <Text style={styles.rowContent}>$179.00</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>64GB</Text>
                    <Text style={styles.rowContent}>$199.00</Text>
                </View>
            </View>
            <View style={styles.line}></View>
           
            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Siri Remote</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Bluetooth 4.0 wireless technology</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>IR transmitter</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Accelerometer and three-axis gyro</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Lightning connector for charging</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Rechargeable battery providing months of battery life on a single charge (with typical daily usage)</Text>
                </View>
                <View
                    style={{ width: 369, height: 550}}>
                    <Image
                        style={styles.imageContainer}
                        source={require('./AppleTVTechSpecs/tv4k-techspecs-3.jpg')}>
                    </Image>
                </View>
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Ports and Interfaces</Text>
                <View
                    style={{ width: 327, height: 218}}>
                    <Image
                        style={styles.imageContainer}
                        source={require('./AppleTVTechSpecs/tv4k-techspecs-4.jpg')}>
                    </Image>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>HDMI 2.0a</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>802.11ac Wi-Fi with MIMO; simultaneous dual band (2.4GHz and 5GHz)</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Gigabit Ethernet</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Bluetooth 5.0 wireless technology</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>IR receiver</Text>
                </View>        
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Built-in power supply</Text>
                </View>       
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>System Requirements</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>iTunes purchasing and renting and Home Sharing require iTunes Store account</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Requires 802.11 wireless, Ethernet network, or Broadband Internet access</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Requires 4K and HDR TV for 4K and HDR streaming</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Requires acceptance of the software license terms</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Requires HDMI cable (sold separately)</Text>
                </View>        
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Video Formats</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>H.264/HEVC SDR video up to 2160p, 60 fps, Main/Main 10 profile</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>HEVC Dolby Vision (Profile 5)/HDR10 (Main 10 profile) up to 2160p</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>H.264 Baseline Profile level 3.0 or lower with AAC-LC audio up to 160 Kbps per channel, 48kHz, stereo audio in .m4v, .mp4, and .mov file formats</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>MPEG-4 video up to 2.5 Mbps, 640 by 480 pixels, 30 fps, Simple profile with AAC-LC audio up to 160 Kbps, 48kHZ, stereo audio in .m4v, .mp4, and .mov file formats</Text>
                </View>       
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Audio Formats</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>HE-AAC (V1), AAC (up to 320 Kbps), protected AAC (from iTunes Store), MP3 (up to 320 Kbps), MP3 VBR, Apple Lossless, FLAC, AIFF, and WAV; AC-3 (Dolby Digital 5.1) and E-AC-3 (Dolby Digital Plus 7.1)</Text>
                </View>    
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Photo Formats</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>HEIF, JPEG, GIF, TIFF</Text>
                </View>    
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Compatibility</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Apple TV is compatible with HD and UHD TVs with HDMI</Text>
                </View>    
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Apple TV is compatible with Bluetooth keyboards</Text>
                </View>    
            </View>
            <View style={styles.line}></View>

            <View style={styles.sectionContainer}>
                <Text style={styles.title}>Accessbility</Text>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Accessibility features help people with disabilities get the most out of their Apple TV. With built-in support for vision, hearing, physical and motor skills, and learning and literacy, you can easily find and enjoy your favorite entertainment.</Text>
                </View>     
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Features include:</Text>
                </View>   
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>VoiceOver</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Zoom</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Increase Contrast</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Reduce Motion</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Closed Captions and SDH Support</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Audio Descriptions</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Siri and Dictation</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Switch Control</Text>
                </View>
            </View>         
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.sectionContainer}>
                <View style={styles.rowDetail}>
                    <Text style={styles.footerTitle}>Apple TV and the Environment</Text>
                </View> 
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Apple takes a completet product life cycle approach to determining our environmental impact.</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowContent}>Apple TV 4K and the Siri Remote are designed with the following features to reduce their environmetal impact:</Text>
                </View>  
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Apple TV 4K</Text>
                </View>   
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>BFR-free</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>PVC-free</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Meets ENERGY STAR 5.0 requirements</Text>
                </View>
                <View style={styles.rowDetail}>
                    <Text style={styles.rowTitle}>Siri Remote</Text>
                </View>   
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Arsenic-free glass</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>BFR-free</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>PVC-free</Text>
                </View>
                <View style={styles.rowDetail}>
                    <View style={styles.listDot}></View>
                    <Text style={styles.listContent}>Recyclable aluminum enclosure</Text>
                </View>
            </View>    
          </View>
        </ScrollView>
      </SafeAreaView>  
    )
  }
}

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        backgroundColor: 'white',
        marginTop: 20
    },
    sectionContainer: {
        display: 'flex',
        marginVertical: 10,
        marginHorizontal: 20
    },
    line: {
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
        color: 'black',
        marginBottom: 10,
    },
    rowDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        fontSize: 16,
    },
    imageContainer:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain', 
    },
    rowTitle: {
        fontWeight: 'bold',
        color: 'black',
    },
    rowContent: {
        color: 'black',
        fontSize: 16
    },
    listDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'black',
    },
    listContent: {
        color: 'black',
        fontSize: 16,
        marginLeft: 10,
    },
    footerContainer: {
        display: 'flex',
        backgroundColor: '#ccffc2',
    },
    footerTitle: {
        color: '#4e8f42',   
        fontSize: 18, 
    },
})