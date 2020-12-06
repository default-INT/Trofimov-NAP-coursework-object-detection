import React, {useContext} from 'react'
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import {StorageContext} from "../context/storage/storageContext";
import Constants from "../Constants";
import AppStyles from "../AppStyles";
import CustomButton from "./utils/CustomButton";
import Types from "../context/Types";

const statusDict = {
    [Types.STATUS.PROCESSING]: 'Processing..',
    [Types.STATUS.RAW_IMAGE]: 'Raw image',
    [Types.STATUS.DETECTED_IMAGE]: 'Detected image',
}

const colorStatusDict = {
    [Types.STATUS.PROCESSING]: Constants.Colors.ORANGE,
    [Types.STATUS.RAW_IMAGE]: Constants.Colors.RED,
    [Types.STATUS.DETECTED_IMAGE]: Constants.Colors.MAIN_COLOR_BLUE,
}

const ImageContainer = ({image}) => {
    const {detectedImage, showRawImage} = useContext(StorageContext)

    return (
        <View style={styles.imgContainer}>
            <Text style={{...styles.statusText, backgroundColor: colorStatusDict[image.status]}}>
                {statusDict[image.status]}
            </Text>
            <Image style={styles.logo} source={{
                uri: image.status === Types.STATUS.DETECTED_IMAGE ? `data:image/gif;base64,${image.detectedImage.uri}` : image.rawImage.uri
            }} />
            <View style={styles.controlBtnBox}>
                <CustomButton content='Raw image' onPress={() => showRawImage(image)} />
                <CustomButton content='Detect image' onPress={() => detectedImage(image)} />
            </View>
        </View>
    )
}

export default () => {
    const {images} = useContext(StorageContext)
    return (
        <ScrollView style={styles.container}>
            {images.map(image => <ImageContainer key={image.uriId} image={image}/>)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusText: {
        color: Constants.Colors.WHITE,
        padding: 6,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    imgContainer: {
        flex: 1,
        backgroundColor: Constants.Colors.WHITE,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
        marginBottom: 10,
        ...AppStyles.Shadows.LIGHT_SHADOW
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 300,
        height: 300,
        backgroundColor: Constants.Colors.HINT_TEXT_COLOR_GRAY,
        borderRadius: 6
    },
    controlBtn: {
        backgroundColor: Constants.Colors.MAIN_COLOR_BLUE,
        color: Constants.Colors.WHITE,
        fontWeight: 'bold',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        width: 120
    },
    controlBtnBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        padding: 18
    }
});
