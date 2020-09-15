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
                <Image source={logo} />
            </TouchableOpacity>
            <Text style={styles.fontDestackH2}># APP Tarefas #</Text>
            <Text style={styles.fontDestackH2}>{todoListName}</Text>

            <View>
                {listItems.length === 0
                    ? (<Text>Inserir novos itens</Text>)
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
                    placeholder='Novo item'
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
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginHorizontal: 30,
        backgroundColor: '#f5f5f5',
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 5,
        fontSize: 18,
    },
    fontDestackH1: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    fontDestackH2: {
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