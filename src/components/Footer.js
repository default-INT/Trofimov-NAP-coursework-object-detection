import React from 'react'
import {View, Button, StyleSheet} from "react-native";


// https://snack.expo.io/?platform=android&name=createMaterialBottomTabNavigator%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40*%2C%40react-navigation%2Fbottom-tabs%40%5E5.8.0%2C%40react-navigation%2Fdrawer%40%5E5.9.0%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.16%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.16%2C%40react-navigation%2Fnative%40%5E5.7.3%2C%40react-navigation%2Fstack%40%5E5.9.0%2Creact-native-paper%40%5E4.0.1%2Creact-native-reanimated%40*%2Creact-native-safe-area-context%40*%2Creact-native-screens%40*%2Creact-native-tab-view%40%5E2.15.1&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fmaterial-tab-based-navigation-minimal.js


export const Footer = () => (
    <View style={styles.footer}>
        <Button color='#4a76a8' title="Take photo"/>
        <Button color='#4a76a8'  title="Processed images"/>
        <Button color='#4a76a8'  title="Setting"/>
    </View>
)

const styles = StyleSheet.create({
    footer: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6
    },
    button: {
        width: '50%',
        backgroundColor: '#f00'
    }
})