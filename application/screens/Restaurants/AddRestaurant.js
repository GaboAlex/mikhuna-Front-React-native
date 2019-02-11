import React, {Component} from 'react';
import {options, Restaurant} from '../../forms/restaurant';
import {StyleSheet, View, Alert} from 'react-native';
import AppButton from '../../components/AppButton';
import BackgroundImage from '../../components/BackgroundImage';
import {Card} from "react-native-elements";
import t from 'tcomb-form-native';
const Form = t.form.Form;
import * as firebase from 'firebase';

export default class AddReastuarant extends Component{
    constructor(){
        super();
        this.state = {
            restaurant:{
                name:'',
                address:'',
                capacity:0,
                description:''
            }
        };
    }

    onChange(evento){
        let miRestaurant = {
            name:evento.name,
            address:evento.address,
            capacity:evento.capacity,
            description:evento.description
        }
        this.setState({restaurant:miRestaurant});
    }

    save(){
        //si los campos no cumplen con las reglas del formulario,
        // la variable validate tiene como valor "null"
        //si cumple, tiene como valor el JSON con los atributos del fomrulario
        const validate= this.refs.form.getValue();
        if(validate){
            //en la variable key, se almaenará un ID único como cabecera del nuevo
            //registro (restaurante) y tendrá la forma [ASD3refsDF4sdf83]
            //hasta ahora, solo se obtiene ese ID, no se agrega nada a la BD aún
            const key = firebase.database().ref().child('restaurants').push().key;
            firebase.database().ref().child('restaurants').child(key).set({
                name:validate.name,
                capacity:validate.capacity,
                description:validate.description,
                address:validate.address,
            }).then(()=>{
                Alert.alert("Exito!","El restaurante se ha creado con exito");
                this.props.navigation.navigate('RestaurantsScreen');
            }).catch((error)=>{
                Alert.alert("Error","Ha ocurrido un error garrafal");
            })

        }
    }

    render(){
        const {restaurant} = this.state;
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                <View style={styles.container}>
                    <Card title="Formulario de Restaurants">
                        <View>
                            <Form
                                ref="form"
                                type={Restaurant}
                                options={options}
                                value={restaurant}
                                onChange={(evento)=>{this.onChange(evento)}}
                            />
                        </View>
                        <AppButton
                                bgColor="rgba(255,38,74,0.9)"
                                title="Agregar"
                                action={this.save.bind(this)}
                                iconName="plus"
                                iconSize={30}
                                iconColor="#ffffff"/>
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(231,228,224,0.8)',
        padding:10
    }
})