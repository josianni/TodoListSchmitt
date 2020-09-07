import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/user', {
                headers: {
                    user: id,
                }
            })
            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});