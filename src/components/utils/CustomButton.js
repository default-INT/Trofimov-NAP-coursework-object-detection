import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Constants from "../../Constants";


export default ({onPress, style, content}) => (
    <TouchableOpacity >
        <Text style={{...styles.controlBtn, ...style}} onPress={onPress}>
            {content}
        </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    controlBtn: {
        backgroundColor: Constants.Colors.MAIN_COLOR_BLUE,
        color: Constants.Colors.WHITE,
        fontWeight: 'bold',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        width: 120
    }
})