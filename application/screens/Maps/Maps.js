import React, {Component} from "react";
import { StyleSheet, View, Image , Modal, Text, TouchableHighlight, Alert} from 'react-native';
import { MapView, Marker } from "expo";
import PreLoader from "../../components/PreLoader";
export default class Maps extends Component {
  
  constructor(props){
    super(props);
    this.state={
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
      restaurants:[],
      modalVisible: false,
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  Modal(){
    return(
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    )
  }

  componentWillMount(){
    navigator.geolocation.getCurrentPosition((position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            
          });
          
          console.log(`Lat: ${this.state.latitude}`);
          console.log(`Lng: ${this.state.longitude}`);
          
        },

        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  
  componentDidMount() {
    this.traerRestaurants();
  }

  traerRestaurants(){
    fetch('https://mikhuna-app.herokuapp.com/API/ubicacion-restaurant')
      .then((response) => {return response.json()})
      .then((responseJson) => {
        console.log(responseJson);

        // restaurants = [];
        // responseJson.forEach((marker,i)=>{
        //   restaurants.push(
        //     <Marker
        //           key={i}
        //           coordinate={{latitude:marker.ubicacion_latitud,
        //                       longitude:marker.ubicacion_longitud}}
        //           title={'Mi titulo'}
        //           description={'Mi descripcion'}
        //     ></Marker>
        //   )
        // })     

        this.setState({ 
          isLoading: false,
          restaurants: responseJson 
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  
  render() {
    const {error,latitude,longitude} = this.state;

    if(!latitude){
      return <PreLoader></PreLoader>
    }
    return (
      <View style={styles.container}>
      
        <MapView  style={styles.container} initialRegion={{
                                  latitude: latitude,
                                  longitude: longitude,
                                  latitudeDelta: 0.0122,
                                  longitudeDelta: 0.0121
                                }}>
          {this.state.isLoading ? null : this.state.restaurants.map((marker, index) => {
            const coords = {
                latitude: parseFloat(marker.ubicacion_latitud),
                longitude: parseFloat(marker.ubicacion_longitud),
            };

            const metadata = `Menu: Lomo Saltado`;

            return (
                <MapView.Marker
                    key={index}
                    coordinate={coords}
                    title={marker.usuario_name}
                    description={metadata}
                    onPress={()=>this.Modal()}
                    image={require('../../../assets/images/chef.png')}
                />
            );
          })}
        {/* <Marker
          coordinate={coords}
          title="Familia Vilchez"
          description="Lomo Saltado">
          <View>
            <Image style={{width:50,height:50}} source={require('../../../assets/images/chef.png')}></Image>
          </View>
        </Marker> */}
        </MapView>
      </View> 
    );   
    
  }
}
const styles = StyleSheet.create(
  { 
    container: { 
                flex: 1
    }
  }
);