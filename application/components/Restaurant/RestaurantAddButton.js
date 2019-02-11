import React, {Component} from 'react';
import AppButton from '../AppButton';
import {StyleSheet, View} from 'react-native';

export default class RestaurantAddButton extends Component{
    render(){
        const {addRestaurant} = this.props;
        return(
            <View style={styles.buttonContainer}>
            
                <AppButton bgColor="rgba(191,17,40,0.28)"
                            title="Añadir un Menu"
                            action={addRestaurant}
                            iconName="plus"
                            iconSize={30}
                            iconColor="#fff"
                            setWidth={true}>
                </AppButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer:{
        position:'absolute',
        alignSelf:'flex-end',
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.5)'
    }
});