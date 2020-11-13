import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, TextInput, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
    const [marketList, setMarketList] = useState([]);
    const [marketListName, setMarketListName] = useState();

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/marketList', {
                headers: {
                    userid: id,
                }
            })
            setMarketList(response.data);
        }
        loadUsers();
    }, [id]);

    async function handleLogout() {
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    async function createShoppingList() {
        const response = await api.post('/marketList', { name: marketListName }, {
            headers: {
                userid: id,
            },
        });
        if (response.status === 200) {
            marketList.push(response.data);

            setMarketList(marketList);
            setMarketListName(marketListName);

        } else {
            console.log(response);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={logo} />
            </View>
            <View style={styles.title}>
                <TouchableOpacity onPress={handleLogout}>
                    <Icon style={styles.icons} name="arrow-back-ios" size={30} color="#31B2BF" />
                </TouchableOpacity>
                <Text style={styles.header}># Lista de Compras #</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Icon style={styles.icons} name="logout" size={30} color="#31B2BF" />
                </TouchableOpacity>
            </View>
            <View>
                {marketList.length === 0
                    ? <View style={styles.empty}>
                        <Text style={styles.fontDestackH1}>Bem-vindo!</Text>
                        <Text style={styles.fontDestackH2}>Crie a sua primeira lista de compras!</Text>
                    </View> :
                    (<View>
                    </View>
                    )
                }
            </View>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='+ Adicionar uma nova lista de compras'
                    placeholderTextColor='#999'
                    value={marketListName}
                    onChangeText={setMarketListName}
                />
                <TouchableOpacity onPress={createShoppingList} style={styles.button}>
                    <Text style={styles.buttonText}>Criar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    title: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    icons: {
        margin: 10,
    },
    empty: {
        marginTop: 200,
        textAlignVertical: 'center',
        justifyContent: 'center'
    },
    header: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    fontDestackH1: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15
    },
    fontDestackH2: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        alignSelf: 'center',
    },
    input: {
        height: 46,
        fontSize: 16,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
        marginHorizontal: 20
    },
    button: {
        height: 46,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#31B2BF',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
});