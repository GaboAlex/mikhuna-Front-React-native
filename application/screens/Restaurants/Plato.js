import React, {Component} from 'react';
import BackgroundImage from '../../components/BackgroundImage';
import * as firebase from 'firebase';
import Preloader from '../../components/PreLoader';
import {FlatList, StyleSheet} from 'react-native';
import PlatoAddButton from '../../components/Restaurant/PlatoAddButton';
import AppButton from '../../components/AppButton';
import RestaurantEmpty from '../../components/Restaurant/RestaurantEmpty';
import {ListItem, SearchBar} from 'react-native-elements';
import {NavigationActions} from 'react-navigation';

export default class Plato extends Component{
    constructor(){
        super();
        this.state = {
            platos:[],
            loaded:false,
            restaurant_logo: require('../../../assets/images/restaurant.png'),
            search: ''
        };
        this.platosTodos = [];
    }
    //Cuando el componente ya ha cargado sus datos
    //esta funcion se ejectura despues del metodo render()
    componentDidMount(){
        console.log("componentDidMount");
        const {search} = this.state;
        this.traerPlatosTodos();
        if ( ! search) {
		    this.traerPlatos();
		} else {
		    this._filterPlatos(search);
		}
        console.log("fincomponentDidMount")
    }
    traerPlatosTodos(){
        fetch('https://mikhuna-app.herokuapp.com/API/platos')
        .then((response) => {return response.json()})
        .then((responseJson) => {
            
                this.platosTodos = responseJson;
            
        })
        .catch((error) => {
            console.log(error);
        });
    }
    traerPlatos(){
        fetch('https://mikhuna-app.herokuapp.com/API/platos')
        .then((response) => {return response.json()})
        .then((responseJson) => {
            //console.log(responseJson);
            this.setState({ 
                platos: responseJson ,
                loaded:true
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    _filterPlatos(search){
        const platos = this.platosTodos;

        const coincidencias = platos.filter(plato => plato.plato_nombre.includes(search));
        this.setState({
            platos:coincidencias,
        }) 
    }
    
    // _loadFirebaseRestaurants () {
    //      this.refRestaurants.on('value',(snapshot)=>{
    //          let platos = [];
    //          console.log(snapshot);
    //          snapshot.forEach((row)=>{
    //              platos.push(
    //                  {
    //                      id:row.key,
    //                      plato_nombre:row.val().plato_nombre,
    //                     //  t_categoria_id:row.val().t_categoria_id
    //                  }
    //              );
    //          });
    //          console.log(platos);
    //          this.setState({
    //              platos:platos,
    //              loaded:true,
    //          })
    //      });
    //  }

    restaurantDetail(restaurant){
        const navigateAction = NavigationActions.navigate({
            routeName:'DetailRestaurant',
            params:{restaurant:restaurant}
        });
        this.props.navigation.dispatch(navigateAction);
    }

    renderRestaurant(plato){
        return (
            <ListItem containerStyle={styles.item}
                        titleStyle={styles.title}
                        roundAvatar
                        title={`${plato.plato_nombre}`}
                        leftAvatar={{source: this.state.restaurant_logo}}
                        onPress={()=>this.restaurantDetail(restaurant)}>
                        {/* rightIcon={{name:'arrow-right',type:'font-awesome',style:styles.listIconStyle}}> */}
            </ListItem>
        )
    }

    searchRestaurants (search) {
        if (search.length >= 3) {
	  		this._filterPlatos(search);
	  		// setTimeout(() => {
	  		// 	this._loadFirebaseRestaurants();
	  		// }, 1000);
	  	}
	  	this.setState({
	  		platos: this.platosTodos
	    });	
	}
	
	resetSearch () {
	  	this.setState({
	  		search: ''
	  	});
	  	// this.traerPlatosTodos();
	}
	
	// _filterRestaurants (search) {
	//  	this.refRestaurants = 'https://mikhuna-app.herokuapp.com/API/platos'
	// 			.orderByChild('plato_nombre')
	//  			.startAt(search)
	//  			.endAt(`${search}\uf8ff`);
    // }
    

    addRestaurant(){
        const navigateAction = NavigationActions.navigate({
            routeName:'AddRestaurant'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render(){
        const {loaded, platos} = this.state;
        if(loaded===false){
            return (<Preloader></Preloader>);
        }
        const searchBar = (
		  	<SearchBar
		  			platform="android"
		  			showLoading
		  			cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
		  			placeholder='Busca algún plato!' 
		  			//onChangeText={(text) => this.searchRestaurants(text)}
		  			onClear={this.resetSearch.bind(this)}
		  			value={this.state.search}
		  		/>
        );
        if(platos.length == 0){
            return(
                <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                    {searchBar}
                    <RestaurantEmpty text="No hay menús disponibles"></RestaurantEmpty>
                    <PlatoAddButton addRestaurant={this.addRestaurant.bind(this)}></PlatoAddButton>
                </BackgroundImage>
            )
        }
        return(
            <BackgroundImage source={require('../../../assets/images/fondo.jpg')}>
                {searchBar}
                <FlatList   data={platos}
                            renderItem={(data)=>{
                                                    return this.renderRestaurant(data.item)
                                                }
                                        }
                            keyExtractor={(data)=>{return data.id}}>
                    
                </FlatList>
                <PlatoAddButton addRestaurant={this.addRestaurant.bind(this)}></PlatoAddButton>
                
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