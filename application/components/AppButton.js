import React, {Component} from 'react';
//Importando el elemento Button de la libreria react-native-elements
import {Button} from 'react-native-elements';
//Importando el elemento Dimensions de recat-native para obtener las dimensiones de la 
//pantalla del dispositivo
import {Dimensions} from 'react-native';
//importando componente para hacer uso de iconos
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AppButton extends Component{
    
    render(){
        // var title = "Click Aqui";
        // var title = this.props.title;
        //obteniendo las variables a través de props 
        //(del elemento que invoque nuestro componente)
        const {title, iconName, iconColor, bgColor, action, iconSize, setWidth} = this.props;
        //obteniendo el ancho de la pantalla
        const {width} = setWidth ? Dimensions.get('window') : {};
        return (
            <Button onPress={action}
                buttonStyle={{
                    backgroundColor: bgColor,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 5,
                    marginBottom:5,
                    width: width
                }}
                title={title}
                icon={
                    <Icon name={iconName} size={iconSize} color={iconColor} />
                }
                text={title}
                iconRight={true}>

            </Button>
            
        );
    }
}
