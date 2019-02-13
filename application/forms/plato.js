import React from 'react'
import t from 'tcomb-form-native';
const Form = t.form.Form;
import sliderTemplate from './templates/slider';

export const Plato = t.struct({
    name:t.String,

});

export const options = {
    fields:{
        name:{
            label: 'Nombre del Plato (*)',
            placeholder: 'Nombre',
        },

    }
}