import React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import * as firebase from 'firebase';
import Preloader from '../../components/PreLoader';
import {FlatList, StyleSheet} from 'react-native';
import RestaurantAddButton from '../../components/Restaurant/RestaurantAddButton';
import AppButton from '../../components/AppButton';
import RestaurantEmpty from '../../components/Restaurant/RestaurantEmpty';
import {ListItem} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

export default class Restaurantes extends Component{
    constructor(){
        super();
        this.state = {
            restaurants:[],
            loaded:false,
            restaurant_logo: require('../../../assets/images/restaurant.png')
        };

        this.refRestaurants = firebase.database().ref().child('restaurants');
    }
    //Cuando el componente ya ha cargado sus gatos
    //esta funcion se ejectura despues del metodo render()
    componentDidMount(){
        console.log("componentDidMount");
        this.refRestaurants.on('value',(snapshot)=>{
            let restaurants = [];
            console.log(snapshot);
            snapshot.forEach((row)=>{
                restaurants.push(
                    {
                        id:row.key,
                        name:row.val().name,
                        address:row.val().address,
                        capacity:row.val().capacity,
                        description:row.val().description,
                    }
                );
            });
            console.log(restaurants);
            this.setState({
                restaurants:restaurants,
                loaded:true,
            })
        });
        console.log("fincomponentDidMount")
    }


    restaurantDetail(restaurant){
        const navigateAction = NavigationActions.navigate({
            routeName:'DetailRestaurant',
            params:{restaurant:restaurant}
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderRestaurant(restaurant){
        return (
            <ListItem containerStyle={styles.item}
                        titleStyle={styles.title}
                        roundAvatar
                        title={`${restaurant.name} (Capacidad: ${restaurant.capacity})`}
                        leftAvatar={{source: this.state.restaurant_logo}}
                        onPress={()=>this.restaurantDetail(restaurant)}>
                        {/* rightIcon={{name:'arrow-right',type:'font-awesome',style:styles.listIconStyle}}> */}
            </ListItem>
        )
    }

    addRestaurant(){
        const navigateAction = NavigationActions.navigate({
            routeName:'AddRestaurant'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render(){
        const {loaded, restaurants} = this.state;
        if(loaded===false){
            return (<Preloader></Preloader>);
        }
        if(restaurants.length == 0){
            return(
                <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                    <RestaurantEmpty text="No hay restaurants disponibles"></RestaurantEmpty>
                    <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)}></RestaurantAddButton>
                </BackgroundImage>
            )
        }
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                <FlatList   data={restaurants}
                            renderItem={(data)=>{
                                                    return this.renderRestaurant(data.item)
                                                }
                                        }
                            keyExtractor={(data)=>{return data.id}}>
                    
                </FlatList>
                <RestaurantAddButton addRestaurant={this.addRestaurant.bind(this)}></RestaurantAddButton>
                
            </BackgroundImage>
        )

    }
}


const styles = StyleSheet.create({
    title:{
        color:'#fff'
    },
    listIconStyle:{
        marginRight:10,
        fontSize:15,
        color:'rgba(255,38,74,0.6)'
    },
    item:{
        padding:0,
        backgroundColor:'rgba(131,123,123,0.95)',
    }
})