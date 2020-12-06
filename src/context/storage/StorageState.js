import React, {useReducer} from "react";
import {StorageContext} from "./storageContext";
import storageReducer from "./storageReducer";
import Types from "../Types";
import {Vibration, Alert} from "react-native";

const apiUrl = 'http://192.168.43.220:8080'

export const StorageState = ({children}) => {
    const initialState = {
        images: [],
        serverAddress: '192.168.43.220',
        serverPort: '8080'
    }
    const [state, dispatch] = useReducer(storageReducer, initialState)

    const addRawImage = image => {
        dispatch({type: Types.ADD.RAW_IMAGE_URI, payload: image})
    }

    const showRawImage = async image => {
        dispatch({type: Types.SHOW_RAW_IMAGE, payload: image})
    }

    const detectedImage = async image => {
        try {
            if (image.detectedImage) {
                dispatch({type: Types.SHOW_DETECTED_IMAGE, payload: image})
                return;
            }
            console.log('send image to server')
            dispatch({type: Types.SHOW_PROCESSING_STATUS, payload: image})
            const formData = new FormData()
            formData.append('file', {
                type: 'image/jpg',
                uri: image.rawImage.uri,
                name: 'raw_img.jpg'
            })
            const res = await fetch(`http://${state.serverAddress}:${state.serverPort}`, {
                method: 'POST',
                body: formData
            }).catch(reason => {
                Alert.alert('Error', 'Incorrect address or port')
                showRawImage(image)
            })
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            const base64str = await res.text()
            Vibration.vibrate(100)
            dispatch({type: Types.ADD.DETECTED_IMAGE_BASE64, payload: {originId: image.uriId, uri: base64str}})
        } catch (e) {
            Alert.alert('Error', e.message())
        }


    }

    const setServerAddressAndPort = (serverAddress, serverPort) => {
        console.log(serverAddress + ':' + serverPort)
        dispatch({type: Types.SET.ADDRESS_PORT, payload: {serverAddress, serverPort}})
    }

    return (
        <StorageContext.Provider value={{
            addRawImage, detectedImage, showRawImage, setServerAddressAndPort,
            images: state.images,
            serverAddress: state.serverAddress,
            serverPort: state.serverPort
        }}>
            {children}
        </StorageContext.Provider>
    )
}