import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StartScreen from '../screens/Start';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

const AppNavigator = createStackNavigator(
    {
        Start:{
            screen:StartScreen
        },
        Login:{
            screen:LoginScreen
        },
        Register:{
            screen:RegisterScreen
        }
    },
    {
        initialRouteName: 'Start',
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor: 'rgba(17,54,31,0.9)',
            },
            headerTitleStyle:{
                textAlign:'center',
                alignSelf:'center',
                fontSize:20,
                color:'#fff',
                fontWeight:'bold',
                flex:1
            }
        }
    }
);

export default createAppContainer(AppNavigator);