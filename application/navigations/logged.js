import React from 'react';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';
import PedidosChefScreen from '../screens/Restaurants/PedidosChef';
import RestaurantsComensalScreen from '../screens/Restaurants/RestaurantsComensal';
import MapsScreen from '../screens/Maps/Maps';
import AddRestaurantScreen from '../screens/Restaurants/AddRestaurant';
import DetailRestaurantScreen from '../screens/Restaurants/DetailRestaurant';
import PedidoScreen from '../screens/Restaurants/Pedido';
import ConfirmPedChefScreen from '../screens/Restaurants/ConfirmPedChef';
import LogoutScreen from '../screens/Logout';
import TipoUsuarioScreen from '../screens/TipoUsuario';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const navigationOptions = {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: 'rgba(116,83,13,0.9)',
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

const mapsScreenStack = createStackNavigator(
    {
        MapsScreen:{
            screen: MapsScreen,
            navigationOptions: ({navigation})=>({
                title:'MiKhuna',
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>{navigation.openDrawer()}}/>
                ),
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.navigate("TipoUsuarioScreen")}/>
                )
            })
        },
    },
    navigationOptions
);

const restaurantsScreenStack = createStackNavigator(
    {
        
        RestaurantsScreen:{
            screen: RestaurantsScreen,
            navigationOptions: ({navigation})=>({
                title:'Menu',
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>{navigation.openDrawer()}}/>
                ),
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.navigate("TipoUsuarioScreen")}/>
                )
            })
        },
        AddRestaurant:{
            screen: AddRestaurantScreen,
            navigationOptions:({navigation})=>({
                title:'Añadir Restaurant',
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.navigate("RestaurantsScreen")}>
                    </Icon>
                ),
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.openDrawer()}>
                    </Icon>
                )
            })
        },
        DetailRestaurant:{
            screen: DetailRestaurantScreen,
            navigationOptions:({navigation})=>({
                title:'Detalle de Restaurante',
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.navigate("RestaurantsScreen")}>
                    </Icon>
                ),
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.openDrawer()}>
                    </Icon>
                )
            })
        }
    },
    navigationOptions
);
const pedidosChefScreenStack = createStackNavigator(
    {
        
        PedidosChefScreen:{
            screen: PedidosChefScreen,
            navigationOptions: ({navigation})=>({
                title:'Restaurantes',
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>{navigation.openDrawer()}}/>
                ),
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>{}}/>
                )
            })
        },
        ConfirmPedChef:{
            screen: ConfirmPedChefScreen,
            navigationOptions:({navigation})=>({
                title:'Pedidos Recibidos',
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.navigate("RestaurantsScreen")}>
                    </Icon>
                ),
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.openDrawer()}>
                    </Icon>
                )
            })
        }
    },    
    navigationOptions
);

const restaurantsComensalScreenStack = createStackNavigator(
    {
        
        RestaurantsComensalScreen:{
            screen: RestaurantsComensalScreen,
            navigationOptions: ({navigation})=>({
                title:'Restaurantes',
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>{navigation.openDrawer()}}/>
                ),
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>{}}/>
                )
            })
        },
        Hacerpedidos:{
            screen: PedidoScreen,
            navigationOptions:({navigation})=>({
                title:'Detalle de Restaurante',
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.navigate("RestaurantsScreen")}>
                    </Icon>
                ),
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>navigation.openDrawer()}>
                    </Icon>
                )
            })
        }
    },
    navigationOptions
);

const logoutScreenStack = createStackNavigator(
    {
        LogoutScreen:{
            screen: LogoutScreen,
            navigationOptions: ({navigation})=>({
                title:'Cerrar Sesión',
            })
        }
    },
    navigationOptions
);

const tipoUsuarioStack = createStackNavigator(
    {
        TUsuarioScreen:{
            screen: TipoUsuarioScreen,
            navigationOptions: ({navigation})=>({
                title:'Modo de Usuario',
                headerLeft:(
                    <Icon name="bars"
                            style={{marginLeft:20}}
                            size={20}
                            color="black"
                            onPress={()=>{navigation.openDrawer()}}/>
                ),
                headerRight:(
                    <Icon name="home"
                            style={{marginRight:20}}
                            size={20}
                            color="black"
                            onPress={()=>{}}/>
                )
            })
        }
    },
    navigationOptions,
    
);

const drawerComensal = createDrawerNavigator(
    {
        RestScreen: {
            screen: restaurantsComensalScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Menus",
                    drawerIcon: ({tintColor})=>(<Icon name="home" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },

        MapsScreen:{
            screen: mapsScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Abrir Mapa",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },

        TipoUsuarioScreen: {
            screen: tipoUsuarioStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Cambiar Modo",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },     

        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Cerrar Sesión",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },
    },
    {
        drawerBackgroundColor: 'rgba(116,83,13,0.9)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle:{
                marginVertical: 0
            }
        },
        defaultNavigationOptions: navigationOptions,
        initialRouteName:'MapsScreen'
    }
);

const drawerChef = createDrawerNavigator(
    {
        RestScreen: {
            screen: restaurantsScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Menu",
                    drawerIcon: ({tintColor})=>(<Icon name="home" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },

        TipoUsuarioScreen: {
            screen: tipoUsuarioStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Cambiar Modo",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },
        PedidosChefScreen: {
            screen: pedidosChefScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Pedidos",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },   

        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Cerrar Sesión",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },  
    },
    {
        drawerBackgroundColor: 'rgba(116,83,13,0.9)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle:{
                marginVertical: 0
            }
        },
        defaultNavigationOptions: navigationOptions,
        initialRouteName:'RestScreen'
    }
);

const miNavegacionPrincipal = createDrawerNavigator(
    {

        TipoUsuarioScreen: {
            screen: tipoUsuarioStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "MIKHUNA",
                    drawerIcon: ({tintColor})=>(<Icon name="home" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        }, 

        ComensalDrawer: {
            screen: drawerComensal,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: () => null
                }
            )
        },

        ChefDrawer: {
            screen: drawerChef,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: () => null
                }
            )
        },
         
        LogoutScreen: {
            screen: logoutScreenStack,
            navigationOptions:({navigation})=>(
                {
                    drawerLabel: "Cerrar Sesión",
                    drawerIcon: ({tintColor})=>(<Icon name="sign-out" 
                                                        size={24}
                                                        style={{color:tintColor}}>
                                                </Icon>)
                }
            )
        },
        
    },
    {
        drawerBackgroundColor: 'rgba(116,83,13,0.9)',
        contentOptions: {
            activeTintColor: 'white',
            activeBackgroundColor: 'transparent',
            inactiveTintColor: 'white',
            itemsContainerStyle:{
                marginVertical: 0
            }
        },
        defaultNavigationOptions: navigationOptions,
        initialRouteName:'TipoUsuarioScreen'
    }
);

export default createAppContainer(miNavegacionPrincipal);