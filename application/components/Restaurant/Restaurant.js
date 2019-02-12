import React, {Component} from 'react';
import AppButton from '../AppButton';
import {Card, Text} from 'react-native-elements';
import RestaurantRating from './RestaurantRating';

export default class Restaurant extends Component{
    
    render(){
        const {restaurant} = this.props;
        
        return(
            <Card   title={restaurant.name}
                    image={require('../../../assets/images/restaurant.png')}>
                
                <RestaurantRating  restaurantId={restaurant.id}/>

                <Text style={{marginBottom:10, marginTop:10}}>
                    {restaurant.description}
                </Text>
                
                <AppButton
                        bgColor="rgba(255,38,74,0.8)"
                        title="Editar Menú"
                        action={()=>{}}
                        iconName="pencil"
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