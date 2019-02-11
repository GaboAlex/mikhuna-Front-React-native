import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import Pedidos from '../../components/Restaurant/PedidosChef';
import BackgroundImage from '../../components/BackgroundImage';

export default class ConfirmPedChef extends Component{
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
                    <Pedidos restaurant={restaurant}/>
                </ScrollView>
            </BackgroundImage>
        )
    }
}