import React from 'react';
import { StyleSheet, Text, View, Image,Alert } from 'react-native';
// Importando el boton creado
import AppButton from './application/components/AppButton';
// Importando el BackgroundImage creado
import BackgroundImage from './application/components/BackgroundImage';
//Importando el PreLoader creado
import PreLoader from './application/components/PreLoader';
//Importando el componente Start
import Start from './application/screens/Start';
//Importand el componente Login
import Login from './application/screens/Login';
//Importando nuestro archivo de navegacion
import GuestNavigator from './application/navigations/guest';
//Importando nuestro archivo de navegacion para usuarios loggeados
import LoggedNavigator from './application/navigations/logged';
//Importando y configurando la conexión con Firebase
import * as firebase from 'firebase';
import firebaseConfig from './application/utils/firebase';
firebase.initializeApp(firebaseConfig);

// import Toast from 'react-native-simple-toast';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(){
    super();
    //borrando o cerrando la sesión iniciada previamente en el dispositivo
    console.log("constructor");
    //firebase.auth().signOut();
    this.state = {
      isLogged: false,
      loaded: false,
    }
  }

  componentWillMount(){
    console.log("componentWillMount");
  }

  async componentDidMount(){
    console.log("componentDidMount");
    await firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          isLogged:false,
          loaded: true
        })
      }else{
        this.setState({
          isLogged:true,
          loaded: true
        })
      }
    });
  }

  render() {
    console.log("render");
    const {isLogged, loaded} = this.state;

    if(!loaded){
      console.log("esta cargando...");
      return(<PreLoader></PreLoader>);
    }
    if(isLogged){
      console.log("habia una sesión abierta previamente");
      return(<LoggedNavigator/>);
    }else{
      console.log("no habia nadie loggeado");
      Alert.alert("Ups!","No había nadie loggeado");
      return(<GuestNavigator/>);
    }    
  }
}
