import React from 'react'
import {Text, View, StyleSheet} from "react-native";
import AppStyles from "../AppStyles";
import Constants from "../Constants";

export const AppHeader = ({title}) => (
    <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        flex: .19,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        // height: 90,
        ...AppStyles.Shadows.LIGHT_SHADOW
    },
    text: {
        fontSize: 25,
        backgroundColor: Constants.Colors.MAIN_COLOR_BLUE,
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        margin: 10
    }
})

