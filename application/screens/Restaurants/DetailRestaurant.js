import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Restaurant from '../../components/Restaurant/Restaurant';
import BackgroundImage from '../../components/BackgroundImage';

export default class DetailRestaurant extends Component{
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
                    <Restaurant restaurant={restaurant}/>
                </ScrollView>
            </BackgroundImage>
        )
    }
}

