import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Alert} from 'react-native';

export default class Logout extends Component{
    //función que se ejecuta DESPUÉS del método render()
    componentDidMount(){
        firebase.auth().signOut().then(()=>{
            Alert.alert("Cierre de Sesión", "Has cerrado sesión correctamente");
        }).catch((error)=>{
            Alert.alert("Ups!", "Hubo un error al cerrar sesión :(");
        });
    }

    render(){
        return null;
    }
}