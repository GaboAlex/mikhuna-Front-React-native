import React, {Component} from 'react';
import AppButton from '../AppButton';
import {Card, Text} from 'react-native-elements';
import RestaurantRating from './RestaurantRating';

export default class Restaurant extends Component{
    
    render(){
        const {restaurant} = this.props;
        
        return(
            <Card   
                    image={require('../../../assets/images/user.png')}>
                
                

                <Text style={{marginBottom:10, marginTop:10}}>
                    Gabriel te esta haciendo un pedido !!!
                </Text>
                
                <AppButton
                        bgColor="rgba(61,245,24,0.8)"
                        title="Aceptar"
                        action={()=>{}}
                        
                        iconSize={30}
                        iconColor="#ffffff"/>
                <AppButton
                        bgColor="rgba(244,70,35,0.8)"
                        title="Declinar"
                        action={()=>{}}
                        
                        iconSize={30}
                        iconColor="#ffffff"/>
                <AppButton
                        bgColor="rgba(28,25,21,0.8)"
                        title="Volver"
                        action={()=>{}}
                        iconName="arrow-left"
                        iconSize={30}
                        iconColor="#ffffff"/>                    
            </Card>
        )
    }
}