import React, {Component} from 'react';
import {Rating, Text} from "react-native-elements";
import * as firebase from 'firebase';
import {View} from 'react-native';

export default class RatingRestaurant extends Component{
    constructor(props){
        super(props);
        this.state = {
            rating:0
        }
        const {restaurantId} = props;
        this.commentsRef = firebase.database().ref('comments').child(restaurantId);
    }
    componentDidMount(){
        //child_added es un listener que se ejeuta cada vez que un valor nuevo 
        //se inserte en el nodo al cual se hace referencia
        this.commentsRef.on("child_added",snapshot=>{
            this.commentsRef.on("value",snap=>{
                let comments = [];
                snap.forEach(row=>{
                    comments.push(parseInt(row.val().rating));
                });

                var suma=0;
                for(let i=0;i<comments.length;i++){
                    suma += comments[i];
                }
                let promedio = parseInt(suma/comments.length);

                this.setState({
                    rating: promedio
                });

                this.refs.rating.setCurrentRating(promedio)

            })
        });
    }

    render(){
        const {rating} = this.state;
        if(rating){
            return(
                <View>
                    <Rating
                            ref="rating"
                            imageSize={20}
                            readonly
                            startingValue={rating}/>
                </View>
            )
        }else{
            return(
                <View>
                    <Text>No hay puntuaciones</Text>
                </View>
            )
        }
    }

}