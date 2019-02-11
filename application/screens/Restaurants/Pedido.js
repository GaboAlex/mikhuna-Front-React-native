import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import RestaurantComensal from '../../components/Restaurant/RestaurantComensal';
import BackgroundImage from '../../components/BackgroundImage';

export default class Hacerpedidos extends Component{
    constructor(props){
        super(props);
        const {params} = props.navigation.state;
        this.state = {
            restaurant:params.restaurant,
        }
    }
    render(){
        const {restaurant} = this.state;
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                <ScrollView>
                    <RestaurantComensal restaurant={restaurant}/>
                </ScrollView>
            </BackgroundImage>
        )
    }
}

