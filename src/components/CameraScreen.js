import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from "react-native";
import CustomCamera from "./CustomCamera";


export const CameraScreen = ({navigation}) => {
    const [cameraLoad, setCameraLoad] = useState(true)

    // TODO: Need optimize
    useEffect(() => {
        navigation.addListener('tabPress', e => {
            setCameraLoad(true)

        });
        navigation.addListener('blur', e => {
            setCameraLoad(false)
        });
    }, [navigation])

    return (
        <View style={{flex: 1}}>
            {cameraLoad &&
                <CustomCamera/> }
        </View>
    )
}