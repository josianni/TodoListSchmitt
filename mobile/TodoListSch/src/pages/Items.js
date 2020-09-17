import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { View, TextInput, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import api from '../services/api';

export default function Items({ navigation }) {
    const id = navigation.getParam('id');
    const todoListName = navigation.getParam('todoListText');
    const user = navigation.getParam('user');
    const [itemName, setItemName] = useState();
    const [listItems, setListItems] = useState([]);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    console.log("Cheguei na tela de Items Todo List id: " + id);

    useEffect(() => {
        async function loadItems() {
            const response = await api.get('/items', {
                headers: {
                    todolistid: id,
                }
            })
            setListItems(response.data);
        }
        loadItems();
    }, [id]);

    async function handleGoBack() {
        navigation.navigate('Main', { user })
    }

    async function markAsDone(itemid) {
        const response = await api.post('/setItemDone', { itemid })
        if (response.status === 200) {
            setToggleCheckBox(false);
        }
    }

    async function createItem() {
        const response = await api.post('/item', { name: itemName }, {
            headers: {
                todolistid: id,
            }
        })

        if (response.status === 200) {
            listItems.push(response.data);
            setListItems(listItems);
            setItemName('');
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.logo} onPress={handleGoBack}>
                <Text style={styles.fontDestackH2}>Voltar</Text>
            </TouchableOpacity>
            <View style={styles.todoListTitle}>
                <Text style={styles.fontDestackH1}>{todoListName}</Text>
            </View>
            <View>
                {listItems.length === 0
                    ? (<View style={styles.empty}>
                        <Text style={styles.fontDestackH1}>Inserir novos itens</Text>
                    </View>)
                    : (listItems.map((item, index) => (
                        <View key={item._id} style={styles.checkboxContainer}>
                            <CheckBox
                                disabled={false}
                                value={item.done}
                                onValueChange={() => markAsDone(item._id)}
                            />
                            <Text style={styles.label}>{item.name}</Text>
                        </View>
                    ))
                    )}
            </View>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='+ Novo item'
                    placeholderTextColor='#999'
                    value={itemName}
                    onChangeText={setItemName}
                />
                <TouchableOpacity onPress={createItem} style={styles.button}>
                    <Text style={styles.buttonText}>Criar Item</Text>
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
    empty: {
        marginTop: 250,
        textAlignVertical: 'center',
        justifyContent: 'center'
    },
    todoListTitle: {
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 30,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginHorizontal: 30,
        backgroundColor: '#f5f5f5',

    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        marginLeft: 15,
        fontSize: 18,
        alignSelf: 'center',
    },
    fontDestackH1: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },
    fontDestackH2: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        alignSelf: 'flex-start',
        marginTop: 10

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
})