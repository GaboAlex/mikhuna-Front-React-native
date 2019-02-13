import React from 'react'
import t from 'tcomb-form-native';
const Form = t.form.Form;
import sliderTemplate from './templates/slider';


export const Menu = t.struct({
    name:t.String,
    capacity:t.Number,
    precio:t.Number
});

export const options = {
    fields:{
        name:{
            label: 'Nombre del Plato (*)',
            placeholder: 'Nombre',
        },
        capacity:{
            label:'Cantidad',
            // help:'Cantidad de platos',
            config:{
                step:1,
                min:1,
                max:20
            },
            template: sliderTemplate,
        },
        precio:{
            label:'Precio',
            // help:'Precio por personas',
            config:{
                step:1,
                min:1,
                max:20
            },
            template: sliderTemplate,
        }
    }
}