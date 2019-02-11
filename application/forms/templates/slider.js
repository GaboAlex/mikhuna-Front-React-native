import React from 'react';
import {View, Slider, Text} from 'react-native';
export default sliderTemplate = (locals)=>{
    return (
        <View>
            <Text style={{fontWeight: 'bold', fontSize:16}}>
                {locals.label} {parseInt(locals.value)};
            </Text>
            <Slider ref="input"
                    step={locals.config.step}
                    minimumValue={locals.config.min}
                    maximumValue={locals.config.max}
                    value={parseInt(locals.value)}
                    onValueChange={value => locals.onChange(value)}/>
            <Text style={{marginBottom:0}}>
                {locals.help}
            </Text>
        </View>
    )
}