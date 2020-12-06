import React, {useContext, useState} from 'react'
import {Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert} from 'react-native';
import Constants from "../Constants";
import AppStyles from "../AppStyles";
import {StorageContext} from "../context/storage/storageContext";
import CustomButton from "./utils/CustomButton";


export default () => {
    const {serverAddress, serverPort, setServerAddressAndPort} = useContext(StorageContext)
    const [editable, setEditable] = useState(false)
    const [serverAddressValue, setServerAddressValue] = useState(serverAddress)
    const [serverPortValue, setServerPortValue] = useState(serverPort + '')
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SETTINGS</Text>
            <View>
                <TextInput
                    style={{...AppStyles.Inputs.INPUT_BORDER_BOTTOM}}
                    value={serverAddressValue}
                    editable={editable}
                    onChangeText={setServerAddressValue}
                />
                <TextInput
                    style={{...AppStyles.Inputs.INPUT_BORDER_BOTTOM}}
                    value={serverPortValue}
                    keyboardType='numeric'
                    editable={editable}
                    onChangeText={setServerPortValue}
                />
                <View style={styles.controlBar}>
                    <CustomButton
                        style={{backgroundColor: editable ? Constants.Colors.MAIN_COLOR_BLUE : Constants.Colors.ORANGE}}
                        content={editable ? 'Save' : 'Edit'}
                        onPress={() => {
                            if (!editable) {
                                setEditable(true)
                                return ;
                            }
                            setServerAddressAndPort(serverAddressValue, serverPortValue)
                            Alert.alert('Saved' ,'Data successfully saved!')
                            setEditable(false)
                        }} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: Constants.Colors.WHITE,
        padding: 10,
        margin: 8,
        ...AppStyles.Shadows.LIGHT_SHADOW
    },
    controlBar: {
        paddingTop: 15,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 8
    }
})