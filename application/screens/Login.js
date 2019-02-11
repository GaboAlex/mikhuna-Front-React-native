import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import {Card} from 'react-native-elements';
import FormValidation from '../utils/validation';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';
const Form = t.form.Form;

export default class Login extends Component{
    login(){
        //validate obtiene el formulario como un getElementById
        //mediante el atributo "ref" del formulario
        //si los campos no han sido validados correctamente, validate tiene valor null
        //si los campos han sido validades correctamente, validate tiene un JSON...
        //con los campos del formulario
        const validate = this.refs.form.getValue();
        if(validate !== null){
            firebase.auth()
                        .signInWithEmailAndPassword(validate.email,validate.password)
                        .then(()=>{
                            // Toast.showWithGravity("Bienvenido",Toast.LONG,Toast.BOTTOM);
                            console.log("Bienvenido");
                        })
                        .catch((error)=>{
                            // Toast.showWithGravity("ERROR " + error.message,Toast.LONG,Toast.BOTTOM);
                            console.log("ERROR " + error.message)
                        });
        }else{
            // Toast.showWithGravity("Los campos son inválidos",Toast.LONG,Toast.BOTTOM);
            console.log("Los campos son inválidos");
        }

        
    }

    render(){
        //creando el modelo user
        this.user = t.struct({
            email: FormValidation.email,
            password: FormValidation.password,
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
                }
            }
        };

        return(
            <BackgroundImage source={require('../../assets/images/fondo.jpg')}>
                <View>
                    <Card wrapperStyle={{paddingLeft:10}} title="Iniciar Sesión">
                        <Form   ref="form"
                                type={this.user}
                                options={this.options}
                                />
                        <AppButton  bgColor="rgba(111,38,74,0.7)"
                                    title="Login"
                                    action={this.login.bind(this)}
                                    iconName="sign-in"
                                    iconSize={30}
                                    iconColor="#fff"
                                    setWidth={false}/>
                    </Card>
                </View>
            </BackgroundImage>
        )
    }
}