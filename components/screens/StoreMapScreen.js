import React, { Component } from 'react';
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0922;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBk9MQ9IS1x_lWwnkGIMzPhXuhUjP44Q0g';

export default class StoreMapScreen extends Component {

  constructor(props)
  {
    super(props);
    console.disableYellowBox = true;
    this.state = {
      destination_name: '',
      coordinates: [],
      source_coordinate: {latitude: 0, longitude: 0},
      destination_coordinate: {latitude: 0, longitude: 0},
    }
  }

  static navigationOptions = () => {
    return{
      title: 'Direction',
    }
  };

  componentDidMount(){
    this.readData()
  }

  readData()
  {
    const { navigation } = this.props;
    const destination_name = navigation.getParam('name', '');
    const destination_coordinate = navigation.getParam('destination_coordinate', '');
    var coordinates = []
    coordinates.push(this.state.source_coordinate)
    coordinates.push(this.state.destination_coordinate)
    this.setState({
      coordinates: coordinates
    })
    console.log(destination_name)
    console.log(destination_coordinate)
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <MapView
          initialRegion={{
            latitude: this.state.source_coordinate.latitude,
            longitude: this.state.source_coordinate.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}>
          <MapView.Marker
            coordinate={this.state.source_coordinate}
            title="Your location"/>
          <MapView.Marker
            coordinate={this.state.destination_coordinate}
            title={this.state.destination_name}/>
          <MapViewDirections
            origin={this.state.source_coordinate}
            destination={this.state.destination_coordinate}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            mode='driving'/>
        </MapView>
      </SafeAreaView>
    );
  }
}