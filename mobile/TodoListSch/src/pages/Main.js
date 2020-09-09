import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    TextInput,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import TodoListSwipe from './TodoListSwipe.js';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';

export default function Main({ navigation }) {
    const id = navigation.getParam('user');
    const [todoLists, setTodoLists] = useState([]);
    const [todoListName, setTodoListName] = useState();

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/todoList', {
                headers: {
                    userid: id,
                }
            })
            setTodoLists(response.data);
        }
        loadUsers();
    }, [id]);

    async function handleLogout() {
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    async function createTodoList() {
        const response = await api.post('/todoList', { name: todoListName }, {
            headers: {
                userid: id,
            },
        });
        if (response.status === 200) {
            setTodoListName(todoListName);
        } else {
            console.log(response);
        }
    }

    async function deleteTodoList(name) {
        console.log('Delete' + name);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.logo} onPress={handleLogout}>
                <Image source={logo} />
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder='Insira um nome para a sua lista de tarefas'
                placeholderTextColor='#999'
                value={todoListName}
                onChangeText={setTodoListName}
            />

            <TouchableOpacity onPress={createTodoList} style={styles.button}>
                <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>

            <View>
                {todoLists.length === 0
                    ? <View>
                        <Text style={styles.bemvindo}>Bem-vindo!</Text>
                        <Text style={styles.textNovaLista}>Crie a sua primeira lista de tarefas! </Text>
                    </View> :
                    (<View>
                        <TodoListSwipe style={styles.todoListsContainer} list={todoLists} />
                    </View>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'stretch',
        justifyContent: 'center',

        padding: 30
    },
    bemvindo: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    textNovaLista: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        alignSelf: 'center', marginTop: 20

    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#FFF',
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
    todoListsContainer: {
        alignSelf: 'stretch',
    },
});