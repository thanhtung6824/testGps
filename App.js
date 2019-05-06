/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';
import Geolocation from "react-native-geolocation-service";
import Permissions from 'react-native-permissions';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        const alertForLocationError = (message) => {
            Alert.alert(
                'Lỗi định vị',
                message,
                [
                    {text: 'Mở cài đặt', onPress: Permissions.openSettings},
                ],
            )
        }
        this.state = {
            lat: '',
            long: '',
            error: 'Ko co loi'
        }

        Geolocation.getCurrentPosition(
            position => {
                console.log(position)
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            },
            error => {
                console.log('error', error)
                if (Platform.OS === "ios") {
                    switch (error.code) {
                        case 1:
                            alertForLocationError("Bạn cần cấp quyền sử dụng vị trí để sử dụng các chức năng của ứng dụng");
                            break;
                        case 2:
                            alertForLocationError("Bạn cần bật vị trí của thiết bị xác định vị trí của bạn");
                            break;
                        case 3:
                            Alert.alert(
                                'Lỗi định vị',
                                'Timeout, không lấy được vị trí'
                            )
                            break;
                        default:
                            Alert.alert(
                                'Lỗi định vị',
                                'Thiết bị không lấy được vị trí của bạn'
                            )
                            break;
                    }
                } else {
                }
            },
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 3000}
        );

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.welcome}>Error: {this.state.error}</Text>
                <Text style={styles.instructions}>Lat: {this.state.lat}</Text>
                <Text style={styles.instructions}>Long: {this.state.long}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
