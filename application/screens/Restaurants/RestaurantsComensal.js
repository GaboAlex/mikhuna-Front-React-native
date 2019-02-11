import React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import * as firebase from 'firebase';
import Preloader from '../../components/PreLoader';
import {FlatList, StyleSheet} from 'react-native';
import ListaRestaurants from '../../components/Restaurant/RestaurantComensal'
import RestaurantAddButton from '../../components/Restaurant/RestaurantAddButton';
import AppButton from '../../components/AppButton';
import RestaurantEmpty from '../../components/Restaurant/RestaurantEmpty';
import {ListItem, SearchBar} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';


export default class Restaurantes extends Component{
    constructor(){
        super();
        this.state = {
            restaurants:[],
            loaded:false,
            restaurant_logo: require('../../../assets/images/restaurant.png'),
            search: ''
        };

        this.refRestaurants = firebase.database().ref().child('restaurants');
    }
    //Cuando el componente ya ha cargado sus gatos
    //esta funcion se ejectura despues del metodo render()
    componentDidMount(){
        console.log("componentDidMount");
        const {search} = this.state;
        if ( ! search) {
			this.refRestaurants = firebase.database().ref().child('restaurants');
		} else {
			this._filterRestaurants(search);
		}
        this._loadFirebaseRestaurants();
        console.log("fincomponentDidMount")
    }

    _loadFirebaseRestaurants () {
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
    }

    restaurantDetail(restaurant){
        const navigateAction = NavigationActions.navigate({
            routeName:'Hacerpedidos',
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

    searchRestaurants (search) {
		this.setState({
			search: search.charAt(0).toUpperCase() + search.slice(1)
		});
		
		if (search.length >= 3) {
			this._filterRestaurants(search);
			setTimeout(() => {
				this._loadFirebaseRestaurants();
			}, 1000);
		}
	}
	
	resetSearch () {
		this.setState({
			search: ''
		});
		this.refRestaurants = firebase.database().ref().child('restaurants');
		setTimeout(() => {
				this._loadFirebaseRestaurants();
			}, 1000);
	}
	
	_filterRestaurants (search) {
		this.refRestaurants = firebase.database().ref().child('restaurants')
				.orderByChild('name')
				.startAt(search)
				.endAt(`${search}\uf8ff`);
    }
    
    render(){
        const {loaded, restaurants} = this.state;
        if(loaded===false){
            return (<Preloader></Preloader>);
        }

        const searchBar = (
			<SearchBar
					platform="android"
					showLoading
					cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
					placeholder='Busca algún menu!' 
					onChangeText={(text) => this.searchRestaurants(text)}
					onClear={this.resetSearch.bind(this)}
					value={this.state.search}
				/>
        );
        
        if(restaurants.length == 0){
            return(
                <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                    {searchBar}
                    <RestaurantEmpty text="No hay restaurants disponibles"></RestaurantEmpty>
                </BackgroundImage>
            )
        }
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                {searchBar}
                <FlatList   data={restaurants}
                            renderItem={(data)=>{
                                                    return this.renderRestaurant(data.item)
                                                }
                                        }
                            keyExtractor={(data)=>{return data.id}}>
                    
                </FlatList>
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