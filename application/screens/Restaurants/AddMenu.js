import React, {Component} from 'react';
import {options, Menu} from '../../forms/menu';
import {StyleSheet, View, Alert} from 'react-native';
import AppButton from '../../components/AppButton';
import BackgroundImage from '../../components/BackgroundImage';
import {Card} from "react-native-elements";
import t from 'tcomb-form-native';
const Form = t.form.Form;
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker'


export default class AddMenu extends Component{
    constructor(){
        super();
        this.state = {
            menu:{
                name:'',
                capacity:0,
                precio:0,
                datetime1:'',
                datetime2:''
            }
        };
    }

    onChange(evento){
        let miMenu = {
            name:evento.name,
            capacity:evento.capacity,
            precio:evento.precio
        }
        this.setState({menu:miMenu});
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

            }).then(()=>{
                Alert.alert("Exito!","El restaurante se ha creado con exito");
                this.props.navigation.navigate('RestaurantsScreen');
            }).catch((error)=>{
                Alert.alert("Error","Ha ocurrido un error garrafal");
            })

        }
    }

    render(){
        const {menu} = this.state;
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                <View style={styles.container}>
                    <Card title="Formulario de Menú">
                        <View>
                            <Form
                                ref="form"
                                type={Menu}
                                options={options}
                                value={menu}
                                onChange={(evento)=>{this.onChange(evento)}}
                            /> 
                            <DatePicker
                                style={{width: 280}}
                                date={this.state.datetime1}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                placeholder="seleccione Fecha de Inicio"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                    },
                                    dateInput: {
                                    marginLeft: 36,
                                    marginBottom:10,
                                    marginTop:15,
                                    borderRadius:3,
                                    padding:5,
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(datetimeInicio) => {this.setState({datetime1: datetimeInicio});}}
                            />
                            <DatePicker
                                style={{width: 280}}
                                date={this.state.datetime2}
                                mode="datetime"
                                format="YYYY-MM-DD HH:mm"
                                placeholder="seleccione Fecha de Fin"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                    marginTop:10
                                    },
                                    dateInput: {
                                    marginLeft: 36,
                                    marginTop:20,
                                    borderRadius:3,
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(datetimeFin) => {this.setState({datetime2: datetimeFin});}}
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