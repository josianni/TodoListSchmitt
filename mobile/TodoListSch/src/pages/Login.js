import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { KeyboardAvoidingView, Text, StyleSheet, Image, TextInput, TouchableOpacity, Platform } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');

    //verifica se o usuário já logou alguma vez no app 
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', { user })
            }
        })
    }, []);

    async function handleLogin() {
        const response = await api.post('/user', { name: user, email })

        const { _id } = response.data;

        AsyncStorage.setItem('user', _id);

        navigation.navigate('Main', { _id });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
        >
            <Image source={logo} />
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect='false'
                placeholder='Digite seu Nome'
                placeholderTextColor='#999'
                value={user}
                onChangeText={setUser}
            />
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                autoCorrect='false'
                placeholder='Digite seu e-mail'
                placeholderTextColor='#999'
                value={email}
                onChangeText={setEmail}
            />

            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },

    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15
    },

    button: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#F78145',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});