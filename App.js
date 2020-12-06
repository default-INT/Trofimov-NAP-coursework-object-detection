import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {StatusBar} from "expo-status-bar";
import {AppHeader} from "./src/components/AppHeader";
import {CameraScreen} from "./src/components/CameraScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GalleryScreen from "./src/components/GalleryScreen";
import Constants from "./src/Constants";
import {StorageState} from "./src/context/storage/StorageState";
import SettingsScreen from "./src/components/SettingsScreen";


const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <StorageState>
            <NavigationContainer>
                <StatusBar style="auto" />
                <AppHeader title="Object Detection"/>
                <Tab.Navigator
                    backBehavior='initialRoute'
                    activeColor={Constants.Colors.MAIN_COLOR_BLUE}
                    style={{ backgroundColor: 'tomato' }}
                    inactiveColor={Constants.Colors.HINT_TEXT_COLOR_GRAY}
                    barStyle={{ backgroundColor: Constants.Colors.BACKGROUND_COLOR_WHITE }}
                >
                    <Tab.Screen
                        name="Camera"
                        component={CameraScreen}
                        options={{
                            tabBarLabel: 'Camera',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="camera" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Image detection"
                        component={GalleryScreen}
                        options={{
                            tabBarLabel: 'Image detection',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="menu" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            tabBarLabel: 'Settings',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="settings" color={color} size={26} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </StorageState>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke'
    }
});
