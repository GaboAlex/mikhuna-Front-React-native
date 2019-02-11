import React, {Component} from 'react';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import {View, Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';
import facebook from '../utils/facebook';
import firebase from 'firebase';

export default class Start extends Component{
    
    static navigationOptions = {
        title:'MiKhuna'
    }

    login(){
        const navigateAction = NavigationActions.navigate({
            routeName:'Login'
        });

        this.props.navigation.dispatch(navigateAction);

    }

    async facebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            facebook.config.application_id,
            {
                permissions: facebook.config.permissions
            }
        )
        if(type === "success"){
            // const response = await fetch("https://graph.facebook.com/me?access_token="+token+"&fields=picture");
            // const info = await response.json();
            // console.log(info);
            // Alert.alert("Nombre del usuario","usuario:"+info.name);
            
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth().signInAndRetrieveDataWithCredential(credentials).catch((error)=>{
                console.log(error)
            });
        }else if(type === "cancel"){
            console.log("El usuario canceló la accion");
        }else{
            console.log("Error garrafall")
        }
    }

    register(){
        const navigateAction = NavigationActions.navigate({
            routeName:'Register'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render(){
        return(
            <BackgroundImage source={require('../../assets/images/terraza-hotel-noche.jpg')}
            style={{justifyContent:'center'}} >
                <View style={{justifyContent:'center',flex:1, backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <AppButton bgColor="rgba(116,83,13,0.9)"
                                title="Entrar"
                                action={this.login.bind(this)}
                                iconName="cutlery"
                                iconSize={30}
                                iconColor="#C0C0C0"
                                setWidth={true}/>
                    <AppButton bgColor="rgba(147,0,0,0.7)"
                                title="Registrarme"
                                action={this.register.bind(this)}
                                iconName="mobile"
                                iconSize={30}
                                iconColor="#FFFFFF"
                                setWidth={true}/>
                    <AppButton bgColor="rgba(67,67,146,0.7)"
                                title="Facebook"
                                action={this.facebook.bind(this)}
                                iconName="facebook"
                                iconSize={30}
                                iconColor="#fff"
                                setWidth={true}/>
                </View>
            </BackgroundImage>
        )
    }
}