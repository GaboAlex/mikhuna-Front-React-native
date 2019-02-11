import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import {Card} from 'react-native-elements';
import FormValidation from '../utils/validation';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';
const Form = t.form.Form;


export default class Register extends Component{
    constructor(){
        super();

        this.state = {
            user:{
                email:'',
                password:'',
            }
        };

        this.samePassword = {
            mismoPassword: t.refinement(t.String,(s)=>{
                if(s === this.state.user.password){
                    return true;
                }else{
                    return false;
                }
                //mismo comportamiento
                //return s === this.state.user.password;
            })
        }

        //creando el modelo user
        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password,
            password_confirmation: this.samePassword.mismoPassword
        });

        this.options = {
            fields:{
                email:{
                    help:'Introduce tu email',
                    error:'Email Incorrecto',
                    autoCapitalize:'none'
                },
                password:{
                    help:'Introduce tu password',
                    error:'Password Incorrecto',
                    password:true,
                    secureTextEntry:true,
                },
                password_confirmation:{
                    help:'Repite tu password',
                    error:'Los passwords no coinciden',
                    password:true,
                    secureTextEntry:true
                }
            }
        };

        this.validate = null;
    }


    register(){
        this.validate = this.refs.form.getValue();
        if(this.validate !== null){//thisculpen
            firebase.auth().createUserWithEmailAndPassword(
                                    this.validate.email,
                                    this.validate.password)
                                    .then(()=>{
                                        //Toast.showWithGravity("usuario creado, bienvenido",Toast.LONG,Toast.BOTTOM);
                                        console.log("Usuario Creado, Bienvenido");
                                    })
                                    .catch((error)=>{
                                        //Toast.showWithGravity("Error" + error.message,Toast.LONG,Toast.BOTTOM);
                                        console.log("Error" + error.message);
                                    });
        }
    }

    onChange(evento){
        this.setState({
            user:evento
        });
    }

    render(){

        return (
            <BackgroundImage source={require('../../assets/images/fondo.jpg')}> 
                <View>
                    <Card wrapperStyle={{paddingLeft:10}} title="Registrarme">
                        <Form   ref="form"
                                type={this.user}
                                options={this.options}
                                onChange={(evento)=>{
                                    this.onChange(evento);
                                }}
                                value={this.state.user}
                        />
                        <AppButton  bgColor="rgba(111,38,74,0.7)"
                                    title="Registrar"
                                    action={this.register.bind(this)}
                                    iconName="user-plus"
                                    iconSize={30}
                                    iconColor="#fff"
                                    setWidth={false}/>
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}