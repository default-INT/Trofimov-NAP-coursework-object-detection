import React, {useContext, useEffect, useState} from 'react'
import {Alert, StyleSheet, Text, TouchableOpacity, View, Vibration} from "react-native";
import {Camera} from 'expo-camera';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from "../Constants";
import {StorageContext} from "../context/storage/storageContext";

const CameraUtilIconBtn = ({name = 'refresh', onPress, style, iconSize = 56, color = 'white'}) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.cameraUtilIconBtn,
                ...style
            }}
            onPress={onPress}>
            <Icon name={name} size={iconSize} color={color} />
        </TouchableOpacity>
    )
}

const SnapshotBtn = ({onPress, radius}) => (
    <TouchableOpacity style={{alignSelf: 'center'}} onPress={onPress}>
        <View style={{
            borderWidth: 2,
            borderRadius: 50,
            borderColor: Constants.Colors.WHITE,
            height: radius,
            width: radius,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}
        >
            <View style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: Constants.Colors.WHITE,
                height: radius - 10,
                width: radius - 10,
                backgroundColor: Constants.Colors.WHITE}} >
            </View>
        </View>
    </TouchableOpacity>
)

export default () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const {addRawImage} = useContext(StorageContext)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Camera style={{flex: 1}} type={type} flashMode={flashMode} onMountError={() => null} ref={ref => {
            setCameraRef(ref) ;
        }}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                }}>
                <View style={{paddingBottom: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                    <CameraUtilIconBtn name='refresh' onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }} />
                    <SnapshotBtn
                        onPress={async() => {
                            if(cameraRef){
                                let photo = await cameraRef.takePictureAsync();
                                Vibration.vibrate(100)
                                addRawImage(photo)
                                // console.log('photo', photo);
                            }
                        }}
                        radius={80}
                    />
                    <CameraUtilIconBtn
                        name='flash'
                        onPress={() => setFlashMode(
                            flashMode === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.torch
                                    : Camera.Constants.FlashMode.off
                        )}
                    />
                </View>
            </View>
        </Camera>
    )
}

const styles = StyleSheet.create({
    cameraUtilIconBtn: {
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    snapshotBtn: {
        backgroundColor: Constants.Colors.BLACK,
        padding: 0.1,
        borderRadius: 80,
        borderColor: Constants.Colors.BACKGROUND_COLOR_WHITE,
        borderWidth: 2
    }
})