import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import {Card} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

export default class TipoUsuario extends Component{
    
    openComensalDrawer(){
        const navigateAction = NavigationActions.navigate({
			routeName: 'ComensalDrawer',
		});
		this.props.navigation.dispatch(navigateAction);
    };
    openChefDrawer(){
        const navigateAction = NavigationActions.navigate({
			routeName: 'ChefDrawer',
		});
		this.props.navigation.dispatch(navigateAction);
    };

    render(){

        return (
            <BackgroundImage source={require('../../assets/images/fondo.jpg')}> 
                <View>
                    <Card wrapperStyle={{paddingLeft:10}} title="¿Que deseas hacer hoy?">
                       
                        <AppButton  bgColor="rgba(111,38,74,0.7)"
                                    title="Publicar Menu"
                                    action={this.openChefDrawer.bind(this)}
                                    iconName="male"
                                    iconSize={30}
                                    iconColor="#fff"
                                    setWidth={false}/>

                        <AppButton  bgColor="rgba(111,38,74,0.7)"
                                    title="Buscar Menu"
                                    action={this.openComensalDrawer.bind(this)}
                                    iconName="spoon"
                                    iconSize={30}
                                    iconColor="#fff"
                                    setWidth={false}/>
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}