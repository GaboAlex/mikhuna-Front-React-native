import React, {Component} from 'react';
import {options, Plato} from '../../forms/plato';
import {StyleSheet, View, Alert,Text,Picker} from 'react-native';
import AppButton from '../../components/AppButton';
import {NavigationActions} from 'react-navigation';
import BackgroundImage from '../../components/BackgroundImage';
import {Card} from "react-native-elements";
import t from 'tcomb-form-native';
const Form = t.form.Form;
import * as firebase from 'firebase';
const Item = Picker.Item;

export default class AddPlato extends Component{
    constructor(){
        super();
        this.state = {
            plato:{
                name:'',
                
            }
        };
    }

    onChange(evento){
        let miPlato = {
            name:evento.name,
        }
        this.setState({plato:miPlato});
    }

    save(){
        //si los campos no cumplen con las reglas del formulario,
        // la variable validate tiene como valor "null"
        //si cumple, tiene como valor el JSON con los atributos del fomrulario
        const validate= this.refs.form.getValue();
        console.log(validate);

        var url = 'https://mikhuna-app.herokuapp.com/API/create-plato';
        var data = {nombre:validate.name, categoria_id: '1' };

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
    renderMenu(){
        const navigateAction = NavigationActions.navigate({
            routeName:'AddMenu',
            // params:{restaurant:restaurant}
        });
        this.props.navigation.dispatch(navigateAction);
    }
    mixFuncWithoutArrow(){
        this.save();
        this.renderMenu();
    }

    render(){
        const {plato} = this.state;
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                <View style={styles.container}>
                    <Card title="Formulario de Plato">
                        <View>
                            <Form
                                ref="form"
                                type={Plato}
                                options={options}
                                value={plato}
                                onChange={(evento)=>{this.onChange(evento)}}
                            />
                            <Text>Categorias</Text>
                            <Picker
                                selectedValue={this.state.presentationStyle}
                                onValueChange={presentationStyle => 
                                    this.setState({presentationStyle})
                                }
                                itemStyle={styles.pickerItem}
                            >
                                <Item label="Tipico" value="fullScreen"/>
                                <Item label="Vegetariana" value="pageSheet"/>
                                <Item label="Fritura" value="formSheet"/>
                            </Picker>
                        </View>
                        <AppButton
                                bgColor="rgba(255,38,74,0.9)"
                                title="Agregar"
                                action={this.mixFuncWithoutArrow.bind(this)}
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
    },
    pickerItem:{
        fontSize:16,
    }

})